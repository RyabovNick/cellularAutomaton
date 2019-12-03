import { Directions, DwellersCount, Grid } from './forest.types'

enum Dwellers {
  tree = 'tree',
  bear = 'bear',
  lumberjack = 'lumberjack',
}

class Forest {
  size: number
  month: number
  grid: Grid[]
  dwellersCount!: DwellersCount
  lumber: number
  maws: number
  timer: any
  DIRECTIONS: Directions[]
  callbacks: any[]

  constructor(n: number) {
    this.size = n
    this.month = 1
    this.grid = []
    this.dwellersCount.bear = 0
    this.dwellersCount.lumberjack = 0
    this.dwellersCount.tree = 0
    for (let i = 0; i < n * n; i++) {
      this.grid.push({
        tree: 0,
        bear: 0,
        lumberjack: 0,
      })
    }
    this.lumber = 0
    this.maws = 0
    for (let i = 0; i < n * n * 0.1; i++) {
      this.add(Dwellers.lumberjack, -1)
    }
    for (let i = 0; i < n * n * 0.5; i++) {
      this.add(Dwellers.tree, 12)
    }
    for (let i = 0; i < n * n * 0.02; i++) {
      this.add(Dwellers.bear, -1)
    }
    this.timer = null
    this.DIRECTIONS = [
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
    ]
    // this.ctx = $('#map').getContext('2d');
    // this.dateDOM = $('#date');
    this.callbacks = []
  }

  random() {
    const i = Math.floor(Math.random() * this.DIRECTIONS.length)
    return this.DIRECTIONS[i]
  }

  get(x: number, y: number) {
    const n = this.size
    return this.grid[((y + n) % n) * n + ((x + n) % n)]
  }

  maw(x: number, y: number) {
    this.maws++
    this.get(x, y).lumberjack = 0
    this.dwellersCount.lumberjack--
    while (this.dwellersCount.lumberjack < 1) {
      this.add(Dwellers.lumberjack)
    }
    return this
  }

  stepBear(x: number, y: number) {
    let cell = this.get(x, y)
    for (var i = 0; i < 5; i++) {
      const dir = this.random()
      x = x + dir.x
      y = y + dir.y
      const dest = this.get(x, y)
      if (!dest.bear) {
        cell.bear = 0
        dest.bear = this.month
        cell = dest
        if (cell.lumberjack) {
          this.maw(x, y)
        }
      }
    }
    return this
  }

  stepLumberjack(x: number, y: number) {
    let cell = this.get(x, y)
    for (let i = 0; i < 3; i++) {
      const dir = this.random()
      x = x + dir.x
      y = y + dir.y
      const dest = this.get(x, y)
      if (!dest.lumberjack) {
        cell.lumberjack = 0
        dest.lumberjack = this.month
        cell = dest
        if (cell.bear) {
          this.maw(x, y)
          return this
        } else if (cell.tree >= 12) {
          this.lumber += 1
          if (cell.tree >= 120) this.lumber += 1
          cell.tree = 0
          this.dwellersCount.tree--
        }
      }
    }
    return this
  }

  stepTree(x: number, y: number) {
    const cell = this.get(x, y)
    const chance = cell.tree < 12 ? 0 : cell.tree >= 120 ? 0.2 : 0.1
    if (Math.random() < chance) {
      const avail = this.DIRECTIONS.filter(d => {
        return this.get(x + d.x, y + d.y).tree == 0
      })
      if (avail.length > 0) {
        this.dwellersCount.tree++
        const d = avail[Math.floor(Math.random() * avail.length)]
        this.get(x + d.x, y + d.y).tree = 1
      }
    }
    cell.tree++
    return this
  }

  all(type: Dwellers) {
    var all = []
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.get(x, y)[type]) {
          all.push({ x: x, y: y })
        }
      }
    }
    return all
  }

  add(type: Dwellers, value: number = 1) {
    while (true) {
      const x = Math.floor(Math.random() * this.size),
        y = Math.floor(Math.random() * this.size),
        cell = this.get(x, y)
      if (!cell[type]) {
        cell[type] = value
        this.dwellersCount[type]++
        return this
      }
    }
    return this
  }

  remove(type: Dwellers) {
    const all = this.all(type)
    if (all.length > 0) {
      const p = all[Math.floor(Math.random() * all.length)]
      this.get(p.x, p.y)[type] = 0
      this.dwellersCount[type]--
    }
    return this
  }

  stepYear() {
    if (this.maws > 0) {
      this.remove(Dwellers.bear)
    } else {
      this.add(Dwellers.bear)
    }
    this.maws = 0
    const diff = this.lumber - this.dwellersCount.lumberjack
    if (diff < 0 && this.dwellersCount.lumberjack > 1) {
      this.remove(Dwellers.lumberjack)
    } else {
      let count = Math.ceil(diff / 10)
      while (count-- > 0) this.add(Dwellers.lumberjack)
    }
    this.lumber = 0
    return this
  }

  step() {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        let cell = this.get(x, y)
        if (cell.tree > 0) {
          cell.tree++
        }
        if (cell.bear && cell.bear < this.month) {
          this.stepBear(x, y)
        }
        if (cell.lumberjack && cell.bear < this.month) {
          this.stepLumberjack(x, y)
        }
        if (cell.tree) {
          this.stepTree(x, y)
        }
      }
    }
    if (this.month % 12 == 0) {
      this.callbacks.forEach(c => {
        c()
      })
      this.stepYear()
    }
    this.month++
    return this
  }

  date() {
    const year = Math.floor((this.month - 1) / 12)
    const month = ((this.month - 1) % 12) + 1
    return 'Year ' + year + ', Month ' + month
  }

  // draw() {
  //   var ctx = this.ctx,
  //     s = ctx.canvas.width / this.size
  //   for (var y = 0; y < this.size; y++) {
  //     for (var x = 0; x < this.size; x++) {
  //       var style = '#bb7',
  //         cell = this.get(x, y)
  //       if (cell.lumberjack) {
  //         style = '#f00'
  //       } else if (cell.bear) {
  //         style = '#872'
  //       } else if (cell.tree >= 120) {
  //         style = '#0a0'
  //       } else if (cell.tree >= 12) {
  //         style = '#0d0'
  //       } else if (cell.tree > 0) {
  //         style = '#7f0'
  //       }
  //       ctx.fillStyle = style
  //       ctx.fillRect(x * s, y * s, s, s)
  //     }
  //   }
  //   this.dateDOM.innerHTML = this.date()
  //   return this
  // }

  start(speed: number = 100) {
    if (this.timer == null) {
      this.timer = setInterval(() => {
        // this.step().draw()
      }, speed)
    }
    return this
  }

  stop() {
    clearInterval(this.timer)
    this.timer = null
    return this
  }

  toggle() {
    if (this.timer == null) {
      this.start()
    } else {
      this.stop()
    }
    return this
  }
}
