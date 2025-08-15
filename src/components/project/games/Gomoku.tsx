import { JSX, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { Select } from '@radix-ui/react-select'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'

// --- 可调参数 ---
const SIZE = 19 as const // 棋盘大小 15x15
const WIN_LEN = 5 as const // 连五即胜

// 玩家：1=黑子(玩家)，2=白子(AI)
export enum Player {
  Empty = 0,
  Black = 1,
  White = 2,
}

// Tailwind 里用到的玩家显示名
// const PlayerName: Record<Player.Black | Player.White, string> = {
//   [Player.Black]: '玩家(黑)',
//   [Player.White]: '代码(白)',
// }

// 分数权重（用于启发式评估）
const SCORE = {
  FIVE: 10_000_000,
  OPEN_FOUR: 1_000_000,
  FOUR: 50_000,
  OPEN_THREE: 10_000,
  THREE: 3_000,
  OPEN_TWO: 500,
  TWO: 100,
} as const

// 难度
export type DifficultyKey = 'easy' | 'medium' | 'hard';
const DIFFICULTIES: ReadonlyArray<{ key: DifficultyKey; label: string }> = [
  { key: 'easy', label: '简单' },
  { key: 'medium', label: '中等' },
  { key: 'hard', label: '困难' },
] as const

// 方向向量（水平、垂直、两条对角线）
const DIRS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
] as const

// --- 基础类型 ---
export type Coord = readonly [number, number];
export type LineInfo = { str: string; cells: Coord[]; dir: readonly [number, number] };
export type WinnerInfo = { winner: Player.Black | Player.White; line: Coord[] };
export type Move = readonly [number, number, Player];

// 棋盘类型
export type Cell = Player.Empty | Player.Black | Player.White;
export type Board = Cell[][]; // SIZE x SIZE

// --- 工具函数 ---
function inBounds(x: number, y: number): boolean {
  return x >= 0 && y >= 0 && x < SIZE && y < SIZE
}

function cloneBoard(board: Board): Board {
  return board.map((row) => row.slice()) as Board
}

function coordsToIndex(x: number, y: number): number {
  return x * SIZE + y
}

function indexToCoords(i: number): Coord {
  return [Math.floor(i / SIZE), i % SIZE] as const
}

function emptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array<Cell>(SIZE).fill(Player.Empty))
}

function getLinesThrough(board: Board, x: number, y: number): LineInfo[] {
  // 返回穿过(x,y)的四条线（以字符串形式）以及每条线的起点坐标&方向，便于定位
  const lines: LineInfo[] = []
  for (const [dx, dy] of DIRS) {
    // 找到该方向上整条线的起点
    let sx = x,
      sy = y
    while (inBounds(sx - dx, sy - dy)) {
      sx -= dx
      sy -= dy
    }
    // 收集整条线
    const cells: Cell[] = []
    const positions: Coord[] = []
    let cx = sx,
      cy = sy
    while (inBounds(cx, cy)) {
      cells.push(board[cx][cy])
      positions.push([cx, cy])
      cx += dx
      cy += dy
    }
    lines.push({ str: cells.join(''), cells: positions as Coord[], dir: [dx, dy] })
  }
  return lines
}

function findFiveInLine(lineStr: string): { player: Player.Black | Player.White; start: number; end: number } | null {
  // 返回任意一段连续的5个相同非0数字的起止下标
  let last: string = ''
  let count = 0
  let start = 0
  for (let i = 0; i < lineStr.length; i++) {
    const ch = lineStr[i]
    if (ch !== '0' && ch === last) {
      count++
    } else {
      last = ch
      count = ch === '0' ? 0 : 1
      start = i
    }
    if (count >= WIN_LEN) {
      const p = Number(ch) as Player.Black | Player.White
      return { player: p, start: start - count + 1, end: i }
    }
  }
  return null
}

function checkWinner(board: Board, lastMove?: Coord | null): WinnerInfo | null {
  // 若存在连五，返回 {winner, line:[ [x,y],... ]}
  const pointsToCheck: Coord[] = []
  if (lastMove) pointsToCheck.push(lastMove)
  if (!lastMove) {
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        if (board[x][y] !== Player.Empty) pointsToCheck.push([x, y])
      }
    }
  }
  for (const [x, y] of pointsToCheck) {
    const lines = getLinesThrough(board, x, y)
    for (const L of lines) {
      const hit = findFiveInLine(L.str)
      if (hit) {
        const path = L.cells.slice(hit.start, hit.end + 1)
        return { winner: hit.player, line: path }
      }
    }
  }
  return null
}

function countOpenEnded(line: string, who: Player.Black | Player.White, n: number): number {
  const me = String(who)
  const opp = who === Player.Black ? String(Player.White) : String(Player.Black)
  // 全局替换 me -> A
  const s = line.replace(new RegExp(me, 'g'), 'A').replace(new RegExp(opp, 'g'), 'B')
  const target = 'A'.repeat(n)
  const pattern = new RegExp(`0${target}0`, 'g')
  return (s.match(pattern) || []).length
}

function countClosed(line: string, who: Player.Black | Player.White, n: number): number {
  const me = String(who)
  const opp = who === Player.Black ? String(Player.White) : String(Player.Black)
  const A = 'A'.repeat(n)
  // 全局替换 me -> A
  const s = line.replace(new RegExp(me, 'g'), 'A').replace(new RegExp(opp, 'g'), 'B')
  const pattern = new RegExp(`(?:0${A}B|B${A}0)`, 'g')
  return (s.match(pattern) || []).length
}

function evaluateBoard(board: Board, who: Player.Black | Player.White): number {
  // who 的视角评估全盘分数
  let myScore = 0
  let oppScore = 0
  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      if (board[x][y] === Player.Empty) continue
      const lines = getLinesThrough(board, x, y)
      for (const L of lines) {
        const f = findFiveInLine(L.str)
        if (f && f.player === who) return SCORE.FIVE // 极大化：直接赢
        if (f && f.player !== who) return -SCORE.FIVE // 对面赢

        // 开放四 / 半开放四
        myScore += countOpenEnded(L.str, who, 4) * SCORE.OPEN_FOUR
        myScore += countClosed(L.str, who, 4) * SCORE.FOUR

        // 开放三 / 半开放三
        myScore += countOpenEnded(L.str, who, 3) * SCORE.OPEN_THREE
        myScore += countClosed(L.str, who, 3) * SCORE.THREE

        // 开放二 / 半开放二
        myScore += countOpenEnded(L.str, who, 2) * SCORE.OPEN_TWO
        myScore += countClosed(L.str, who, 2) * SCORE.TWO

        // 对手对称计算（近似）
        const opp = who === Player.Black ? Player.White : Player.Black
        oppScore += countOpenEnded(L.str, opp, 4) * SCORE.OPEN_FOUR
        oppScore += countClosed(L.str, opp, 4) * SCORE.FOUR
        oppScore += countOpenEnded(L.str, opp, 3) * SCORE.OPEN_THREE
        oppScore += countClosed(L.str, opp, 3) * SCORE.THREE
        oppScore += countOpenEnded(L.str, opp, 2) * SCORE.OPEN_TWO
        oppScore += countClosed(L.str, opp, 2) * SCORE.TWO
      }
    }
  }
  return myScore - oppScore
}

function getNeighbors(board: Board, radius = 2): Coord[] {
  // 返回所有靠近已落子的空位，减少搜索空间
  const has: Coord[] = []
  const occupied: Coord[] = []
  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      if (board[x][y] !== Player.Empty) occupied.push([x, y])
    }
  }
  if (occupied.length === 0) return [[Math.floor(SIZE / 2), Math.floor(SIZE / 2)]]

  const seen = new Set<number>()
  for (const [ox, oy] of occupied) {
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        const x = ox + dx,
          y = oy + dy
        if (!inBounds(x, y)) continue
        if (board[x][y] !== Player.Empty) continue
        const k = coordsToIndex(x, y)
        if (!seen.has(k)) {
          seen.add(k)
          has.push([x, y])
        }
      }
    }
  }
  return has
}

function immediateWinOrBlock(board: Board, who: Player.Black | Player.White): Coord | null {
  // 若有一手能赢，返回该手；否则若对方能一手赢，返回封堵点；否则 null
  const candidates = getNeighbors(board, 2)
  // 1) 我方直胜
  for (const [x, y] of candidates) {
    if (board[x][y] !== Player.Empty) continue
    board[x][y] = who
    const win = checkWinner(board, [x, y])
    board[x][y] = Player.Empty
    if (win) return [x, y]
  }
  // 2) 封堵对方直胜
  const opp = who === Player.Black ? Player.White : Player.Black
  for (const [x, y] of candidates) {
    if (board[x][y] !== Player.Empty) continue
    board[x][y] = opp
    const win = checkWinner(board, [x, y])
    board[x][y] = Player.Empty
    if (win) return [x, y]
  }
  return null
}

function bestHeuristicMove(board: Board, who: Player.Black | Player.White): Coord | null {
  const candidates = getNeighbors(board, 2)
  if (!candidates.length) return null
  let best: Coord | null = null
  let bestScore = -Infinity
  for (const [x, y] of candidates) {
    board[x][y] = who
    const s = evaluateBoard(board, who)
    board[x][y] = Player.Empty
    if (s > bestScore) {
      bestScore = s
      best = [x, y]
    }
  }
  return best ?? candidates[0]
}

function alphaBeta(
  board: Board,
  depth: number,
  who: Player.Black | Player.White, // root player
  alpha: number,
  beta: number,
): readonly [number, Coord | null] {
  const win = checkWinner(board)
  if (win) {
    const val = win.winner === who ? SCORE.FIVE : -SCORE.FIVE
    return [val, null] as const
  }
  if (depth === 0) {
    return [evaluateBoard(board, who), null] as const
  }
  const me = who
  const opp: Player.Black | Player.White = who === Player.Black ? Player.White : Player.Black

  // 候选按启发式从好到差排序，裁剪到前 N 个以控时
  const candidates = getNeighbors(board, 2)
  const scored: Array<{ move: Coord; s: number }> = []
  for (const [x, y] of candidates) {
    board[x][y] = me
    const s = evaluateBoard(board, me)
    board[x][y] = Player.Empty
    scored.push({ move: [x, y], s })
  }
  scored.sort((a, b) => b.s - a.s)
  const pruned = scored.slice(0, Math.min(10, scored.length))

  let bestMove: Coord | null = pruned.length ? pruned[0].move : null

  // 极大层
  let value = -Infinity
  for (const { move } of pruned) {
    const [x, y] = move
    board[x][y] = me
    const [score] = alphaBetaMin(board, depth - 1, me, opp, alpha, beta)
    board[x][y] = Player.Empty
    if (score > value) {
      value = score
      bestMove = move
    }
    alpha = Math.max(alpha, value)
    if (alpha >= beta) break // β剪枝
  }
  return [value, bestMove] as const
}

function alphaBetaMin(
  board: Board,
  depth: number,
  rootWho: Player.Black | Player.White,
  toMove: Player.Black | Player.White,
  alpha: number,
  beta: number,
): readonly [number, Coord | null] {
  const win = checkWinner(board)
  if (win) {
    const val = win.winner === rootWho ? SCORE.FIVE : -SCORE.FIVE
    return [val, null] as const
  }
  if (depth === 0) {
    return [evaluateBoard(board, rootWho), null] as const
  }
  const me = toMove // 当前层玩家（对手）
  const opp: Player.Black | Player.White = me === Player.Black ? Player.White : Player.Black

  const candidates = getNeighbors(board, 2)
  const scored: Array<{ move: Coord; s: number }> = []
  for (const [x, y] of candidates) {
    board[x][y] = me
    const s = -evaluateBoard(board, opp) // 从rootWho视角，估计对手走后局势
    board[x][y] = Player.Empty
    scored.push({ move: [x, y], s })
  }
  scored.sort((a, b) => a.s - b.s) // 对手趋向让我更差
  const pruned = scored.slice(0, Math.min(10, scored.length))

  // 极小层
  let value = Infinity
  let bestMove: Coord | null = pruned.length ? pruned[0].move : null
  for (const { move } of pruned) {
    const [x, y] = move
    board[x][y] = me
    const [score] = alphaBeta(board, depth - 1, rootWho, alpha, beta)
    board[x][y] = Player.Empty
    if (score < value) {
      value = score
      bestMove = move
    }
    beta = Math.min(beta, value)
    if (alpha >= beta) break // α剪枝
  }
  return [value, bestMove] as const
}

function aiMove(board: Board, difficulty: DifficultyKey): Coord | null {
  // 返回 [x,y]
  const who = Player.White // AI执白
  const instant = immediateWinOrBlock(board, who)
  if (instant) return instant

  if (difficulty === 'easy') {
    const candidates = getNeighbors(board, 2)
    if (!candidates.length) return null
    return candidates[Math.floor(Math.random() * candidates.length)]
  }

  if (difficulty === 'medium') {
    return bestHeuristicMove(board, who)
  }

  // hard：小深度极大极小 + 启发式裁剪
  const depth = 2 // 可调：3更强但更慢
  const [, mv] = alphaBeta(board, depth, who, -Infinity, Infinity)
  return mv || bestHeuristicMove(board, who)
}

export default function Gomoku(): JSX.Element {
  const [board, setBoard] = useState<Board>(() => emptyBoard())
  const [turn, setTurn] = useState<Player.Black | Player.White>(Player.Black) // 黑先
  const [winnerInfo, setWinnerInfo] = useState<WinnerInfo | null>(null)
  const [difficulty, setDifficulty] = useState<DifficultyKey>('medium')
  const [history, setHistory] = useState<Move[]>([]) // 保存走子历史 [[x,y,player],...]
  const [aiEnabled, setAiEnabled] = useState<boolean>(true) // 是否对战“代码”

  const lastMove = history.length ? (history[history.length - 1] as Move) : null

  useEffect(() => {
    // 每步后检查胜负
    if (lastMove) {
      const res = checkWinner(board, [lastMove[0], lastMove[1]])
      if (res) setWinnerInfo(res)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board])

  useEffect(() => {
    // 若轮到AI且未分胜负，则AI落子
    if (!aiEnabled) return
    if (winnerInfo) return
    if (turn === Player.White) {
      const next = aiMove(cloneBoard(board), difficulty)
      if (!next) return
      const [x, y] = next
      setBoard((b) => {
        if (b[x][y] !== Player.Empty) return b // 罕见并发保护
        const nb = cloneBoard(b)
        nb[x][y] = Player.White
        return nb
      })
      setHistory((h) => [...h, [x, y, Player.White]])
      setTurn(Player.Black)
    }
  }, [turn, aiEnabled, difficulty, winnerInfo, board])

  const onCellClick = (x: number, y: number) => {
    if (winnerInfo) return
    if (board[x][y] !== Player.Empty) return
    if (turn !== Player.Black) return // 玩家执黑
    setBoard((b) => {
      const nb = cloneBoard(b)
      nb[x][y] = Player.Black
      return nb
    })
    setHistory((h) => [...h, [x, y, Player.Black]])
    setTurn(aiEnabled ? Player.White : Player.White) // 若双人可改这里
  }

  const onReset = () => {
    setBoard(emptyBoard())
    setTurn(Player.Black)
    setWinnerInfo(null)
    setHistory([])
  }

  const onUndo = () => {
    if (history.length === 0 || winnerInfo) {
      setWinnerInfo(null)
    }
    // 撤销1步（玩家），若AI开启则撤销2步（玩家+AI）
    const steps = aiEnabled ? 2 : 1
    const newHist = history.slice(0, Math.max(0, history.length - steps))
    const nb = emptyBoard()
    for (const [x, y, p] of newHist) nb[x][y] = p
    setHistory(newHist)
    setBoard(nb)
    setTurn(newHist.length ? (newHist[newHist.length - 1][2] === Player.Black ? Player.White : Player.Black) : Player.Black)
    setWinnerInfo(null)
  }

  const winningSet = useMemo(() => {
    const s = new Set<number>()
    if (winnerInfo && winnerInfo.line) {
      for (const [x, y] of winnerInfo.line) s.add(coordsToIndex(x, y))
    }
    return s
  }, [winnerInfo])

  const cellSize = 32 // px，用于 inline style 以形成等比例格子

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-end gap-3">
        <div className="flex-1">
          <p
            className="text-sm text-gray-500 mt-1">小贴士：困难模式使用小深度极大极小搜索并配合启发式裁剪；中等模式基于模式评分；简单模式随机在棋团附近落子。</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={difficulty} defaultValue="medium"
                  onValueChange={(value: DifficultyKey) => setDifficulty(value)}>
            <SelectTrigger className="w-[120px] bg-background text-foreground">
              <SelectValue placeholder="对手难度" />
            </SelectTrigger>
            <SelectContent className="z-[10] bg-popover text-popover-foreground">
              <SelectGroup>
                <SelectLabel>难度选择</SelectLabel>
                {
                  DIFFICULTIES.map((item) => {
                    return <SelectItem key={item.key} value={item.key}>{item.label}</SelectItem>
                  })
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            onClick={() => setAiEnabled((v) => !v)}
          >
            {aiEnabled ? '对战：代码' : '对战：关闭'}
          </Button>
          <Button onClick={onUndo}>
            撤销
          </Button>
          <Button onClick={onReset}>
            重新开始
          </Button>
        </div>
      </div>

      {/* 信息栏 */}
      {/*<div className="mb-3 flex items-center justify-between">*/}
      {/*  <div className="text-sm">*/}
      {/*    {winnerInfo ? (*/}
      {/*      <span className="font-medium">{winnerInfo.winner === Player.Black ? "黑子胜！🎉" : "白子胜（代码）！🤖"}</span>*/}
      {/*    ) : (*/}
      {/*      <span>*/}
      {/*        当前轮到：*/}
      {/*        <span className={`ml-1 font-semibold ${turn === Player.Black ? "text-black" : "text-gray-600"}`}>*/}
      {/*          {PlayerName[turn]}*/}
      {/*        </span>*/}
      {/*      </span>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  <div className="text-xs text-gray-500">{`棋盘 ${SIZE}×${SIZE}`}</div>*/}
      {/*</div>*/}

      {/* 棋盘 */}
      <div className={'w-full flex justify-center mt-[40px]'}>

        <div className="relative inline-block bg-yellow-100 rounded-2xl p-3 shadow-inner border">
          <div
            className="grid border border-yellow-300"
            style={{
              gridTemplateColumns: `repeat(${SIZE}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${SIZE}, ${cellSize}px)`,
              gap: 0,
            }}
          >
            {
              winnerInfo ? <div
                className={'absolute inset-0 bg-[rgba(255,255,255,.5)] dark:bg-[rgba(0,0,0,.5)] z-1 rounded-2xl flex items-center justify-center'}>
                {winnerInfo.winner === Player.Black ? '黑子胜！🎉' : '白子胜（代码）！🤖'}
              </div> : null
            }
            {Array.from({ length: SIZE * SIZE }, (_, i) => {
              const [x, y] = indexToCoords(i)
              const v = board[x][y]
              const isWin = winningSet.has(i)

              const isLastCol = y === SIZE - 1
              const isLastRow = x === SIZE - 1

              return (
                <button
                  key={i}
                  className={`relative flex items-center justify-center 
        hover:bg-yellow-200/60 focus:outline-none
        ${!isLastCol ? 'border-r border-yellow-300' : ''} 
        ${!isLastRow ? 'border-b border-yellow-300' : ''}`}
                  onClick={() => onCellClick(x, y)}
                  style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                >
                  {v !== Player.Empty && (
                    <div
                      className={`rounded-full w-6 h-6 sm:w-7 sm:h-7 shadow 
            ${v === Player.Black ? 'bg-black' : 'bg-white border'} 
            ${isWin ? 'ring-2 ring-emerald-500' : ''}`}
                    />
                  )}
                </button>
              )
            })}

          </div>
        </div>
      </div>

      {/* 历史着法 */}
      {/*<div className="mt-4 max-h-40 overflow-auto bg-white/60 rounded-xl border p-2 text-xs text-gray-700">*/}
      {/*  <div className="mb-1 font-semibold">着法记录（最近在前）</div>*/}
      {/*  <ol className="space-y-0.5">*/}
      {/*    {[...history].reverse().map(([x, y, p], idx) => (*/}
      {/*      <li key={idx} className="flex justify-between">*/}
      {/*        <span>{p === Player.Black ? "黑" : "白"}：({x + 1},{y + 1})</span>*/}
      {/*        <span className="text-gray-400">#{history.length - idx}</span>*/}
      {/*      </li>*/}
      {/*    ))}*/}
      {/*  </ol>*/}
      {/*</div>*/}
    </div>
  )
}
