import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.tsx'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { Select } from '@radix-ui/react-select'

// 玩家：1=红方(玩家)，2=黑方(AI)
export enum Player {
  Empty = 0,
  Red = 1,
  Black = 2,
}

// 棋子类型
export enum PieceType {
  Empty = 0,
  RedKing = 1, // 帅
  RedAdvisor = 2, // 仕
  RedElephant = 3, // 相
  RedHorse = 4, // 马
  RedChariot = 5, // 车
  RedCannon = 6, // 炮
  RedPawn = 7, // 兵
  BlackKing = 8, // 将
  BlackAdvisor = 9, // 士
  BlackElephant = 10, // 象
  BlackHorse = 11, // 马
  BlackChariot = 12, // 车
  BlackCannon = 13, // 炮
  BlackPawn = 14, // 卒
}

// 棋子文字表示
const PieceSymbol: Record<PieceType, string> = {
  [PieceType.Empty]: '',
  [PieceType.RedKing]: '帅',
  [PieceType.RedAdvisor]: '仕',
  [PieceType.RedElephant]: '相',
  [PieceType.RedHorse]: '马',
  [PieceType.RedChariot]: '车',
  [PieceType.RedCannon]: '炮',
  [PieceType.RedPawn]: '兵',
  [PieceType.BlackKing]: '将',
  [PieceType.BlackAdvisor]: '士',
  [PieceType.BlackElephant]: '象',
  [PieceType.BlackHorse]: '马',
  [PieceType.BlackChariot]: '车',
  [PieceType.BlackCannon]: '炮',
  [PieceType.BlackPawn]: '卒',
};

// 棋子所属玩家
const PieceOwner: Record<PieceType, Player> = {
  [PieceType.Empty]: Player.Empty,
  [PieceType.RedKing]: Player.Red,
  [PieceType.RedAdvisor]: Player.Red,
  [PieceType.RedElephant]: Player.Red,
  [PieceType.RedHorse]: Player.Red,
  [PieceType.RedChariot]: Player.Red,
  [PieceType.RedCannon]: Player.Red,
  [PieceType.RedPawn]: Player.Red,
  [PieceType.BlackKing]: Player.Black,
  [PieceType.BlackAdvisor]: Player.Black,
  [PieceType.BlackElephant]: Player.Black,
  [PieceType.BlackHorse]: Player.Black,
  [PieceType.BlackChariot]: Player.Black,
  [PieceType.BlackCannon]: Player.Black,
  [PieceType.BlackPawn]: Player.Black,
};

// 棋子价值（用于AI评估）
const PieceValue: Record<PieceType, number> = {
  [PieceType.Empty]: 0,
  [PieceType.RedKing]: 10000,
  [PieceType.RedAdvisor]: 200,
  [PieceType.RedElephant]: 200,
  [PieceType.RedHorse]: 400,
  [PieceType.RedChariot]: 900,
  [PieceType.RedCannon]: 450,
  [PieceType.RedPawn]: 100,
  [PieceType.BlackKing]: 10000,
  [PieceType.BlackAdvisor]: 200,
  [PieceType.BlackElephant]: 200,
  [PieceType.BlackHorse]: 400,
  [PieceType.BlackChariot]: 900,
  [PieceType.BlackCannon]: 450,
  [PieceType.BlackPawn]: 100,
};

// 难度
export type DifficultyKey = 'easy' | 'medium' | 'hard' | 'expert';
const DIFFICULTIES: ReadonlyArray<{ key: DifficultyKey; label: string }> = [
  { key: 'easy', label: '新手' },
  { key: 'medium', label: '入门' },
  { key: 'hard', label: '进阶' },
  { key: 'expert', label: '大师' },
] as const;

// --- 基础类型 ---
export type Coord = readonly [number, number];
export type Move = {
  from: Coord;
  to: Coord;
  piece: PieceType;
  captured?: PieceType;
};

// 棋盘类型
export type Cell = PieceType;
export type Board = Cell[][];

// 棋盘尺寸
const BOARD_WIDTH = 9;
const BOARD_HEIGHT = 10;

// --- 工具函数 ---
function inBounds(x: number, y: number): boolean {
  return x >= 0 && y >= 0 && x < BOARD_HEIGHT && y < BOARD_WIDTH;
}

function cloneBoard(board: Board): Board {
  return board.map((row) => row.slice()) as Board;
}

function emptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () => Array<Cell>(BOARD_WIDTH).fill(PieceType.Empty));
}

function initialBoard(): Board {
  const board = emptyBoard();

  // 黑方（上方）
  board[0][0] = PieceType.BlackChariot;
  board[0][1] = PieceType.BlackHorse;
  board[0][2] = PieceType.BlackElephant;
  board[0][3] = PieceType.BlackAdvisor;
  board[0][4] = PieceType.BlackKing;
  board[0][5] = PieceType.BlackAdvisor;
  board[0][6] = PieceType.BlackElephant;
  board[0][7] = PieceType.BlackHorse;
  board[0][8] = PieceType.BlackChariot;
  board[2][1] = PieceType.BlackCannon;
  board[2][7] = PieceType.BlackCannon;
  board[3][0] = PieceType.BlackPawn;
  board[3][2] = PieceType.BlackPawn;
  board[3][4] = PieceType.BlackPawn;
  board[3][6] = PieceType.BlackPawn;
  board[3][8] = PieceType.BlackPawn;

  // 红方（下方）
  board[9][0] = PieceType.RedChariot;
  board[9][1] = PieceType.RedHorse;
  board[9][2] = PieceType.RedElephant;
  board[9][3] = PieceType.RedAdvisor;
  board[9][4] = PieceType.RedKing;
  board[9][5] = PieceType.RedAdvisor;
  board[9][6] = PieceType.RedElephant;
  board[9][7] = PieceType.RedHorse;
  board[9][8] = PieceType.RedChariot;
  board[7][1] = PieceType.RedCannon;
  board[7][7] = PieceType.RedCannon;
  board[6][0] = PieceType.RedPawn;
  board[6][2] = PieceType.RedPawn;
  board[6][4] = PieceType.RedPawn;
  board[6][6] = PieceType.RedPawn;
  board[6][8] = PieceType.RedPawn;

  return board;
}

// 获取特定位置棋子的所有可能移动（不考虑将军）
function getPossibleMoves(board: Board, [x, y]: Coord): Coord[] {
  const piece = board[x][y];
  if (piece === PieceType.Empty) return [];

  const moves: Coord[] = [];
  const player = PieceOwner[piece];

  // 根据不同棋子类型获取可能的移动
  switch (piece) {
    case PieceType.RedKing:
    case PieceType.BlackKing:
      // 帅/将只能在九宫格内移动
      const kingMinY = 3;
      const kingMaxY = 5;
      const kingMinX = player === Player.Red ? 7 : 0;
      const kingMaxX = player === Player.Red ? 9 : 2;

      // 上下左右移动一格
      const kingDirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      for (const [dx, dy] of kingDirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= kingMinX && nx <= kingMaxX && ny >= kingMinY && ny <= kingMaxY) {
          if (board[nx][ny] === PieceType.Empty || PieceOwner[board[nx][ny]] !== player) {
            moves.push([nx, ny]);
          }
        }
      }

      // 将帅对面特殊规则
      const otherKingType = player === Player.Red ? PieceType.BlackKing : PieceType.RedKing;
      let sameCol = true;
      let otherKingX = -1;

      // 检查是否在同一列
      for (let i = 0; i < BOARD_HEIGHT; i++) {
        if (i !== x && board[i][y] === otherKingType) {
          otherKingX = i;
          break;
        }
      }

      // 检查两个王之间是否有其他棋子
      if (otherKingX !== -1) {
        const minX = Math.min(x, otherKingX);
        const maxX = Math.max(x, otherKingX);

        for (let i = minX + 1; i < maxX; i++) {
          if (board[i][y] !== PieceType.Empty) {
            sameCol = false;
            break;
          }
        }

        if (sameCol) {
          moves.push([otherKingX, y]); // 可以直接吃掉对方的将/帅
        }
      }
      break;

    case PieceType.RedAdvisor:
    case PieceType.BlackAdvisor:
      // 仕/士只能在九宫格内斜线移动
      const advisorMinY = 3;
      const advisorMaxY = 5;
      const advisorMinX = player === Player.Red ? 7 : 0;
      const advisorMaxX = player === Player.Red ? 9 : 2;

      // 斜线移动
      const advisorDirs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
      for (const [dx, dy] of advisorDirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= advisorMinX && nx <= advisorMaxX && ny >= advisorMinY && ny <= advisorMaxY) {
          if (board[nx][ny] === PieceType.Empty || PieceOwner[board[nx][ny]] !== player) {
            moves.push([nx, ny]);
          }
        }
      }
      break;

    case PieceType.RedElephant:
    case PieceType.BlackElephant:
      // 相/象只能在己方区域内移动，且不能过河
      const elephantMaxX = player === Player.Red ? 9 : 4; // 不能过河
      const elephantMinX = player === Player.Red ? 5 : 0;

      // 象走田字
      const elephantDirs = [[2, 2], [2, -2], [-2, 2], [-2, -2]];
      for (const [dx, dy] of elephantDirs) {
        const nx = x + dx;
        const ny = y + dy;
        const mx = x + dx/2; // 象眼位置
        const my = y + dy/2;

        if (inBounds(nx, ny) && nx >= elephantMinX && nx <= elephantMaxX) {
          // 象眼不能被塞住
          if (board[mx][my] === PieceType.Empty) {
            if (board[nx][ny] === PieceType.Empty || PieceOwner[board[nx][ny]] !== player) {
              moves.push([nx, ny]);
            }
          }
        }
      }
      break;

    case PieceType.RedHorse:
    case PieceType.BlackHorse:
      // 马走日字
      const horseDirs = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      const horseBlockDirs = [
        [-1, 0], [-1, 0], [0, -1], [0, 1],
        [0, -1], [0, 1], [1, 0], [1, 0]
      ];

      for (let i = 0; i < horseDirs.length; i++) {
        const [dx, dy] = horseDirs[i];
        const [bx, by] = horseBlockDirs[i];
        const nx = x + dx;
        const ny = y + dy;
        const mx = x + bx; // 马腿位置
        const my = y + by;

        if (inBounds(nx, ny)) {
          // 马腿不能被塞住
          if (board[mx][my] === PieceType.Empty) {
            if (board[nx][ny] === PieceType.Empty || PieceOwner[board[nx][ny]] !== player) {
              moves.push([nx, ny]);
            }
          }
        }
      }
      break;

    case PieceType.RedChariot:
    case PieceType.BlackChariot:
      // 车可以横竖移动任意距离，直到遇到棋子
      const chariotDirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      for (const [dx, dy] of chariotDirs) {
        let nx = x + dx;
        let ny = y + dy;
        while (inBounds(nx, ny)) {
          if (board[nx][ny] === PieceType.Empty) {
            moves.push([nx, ny]);
          } else {
            if (PieceOwner[board[nx][ny]] !== player) {
              moves.push([nx, ny]); // 可以吃掉对方的棋子
            }
            break; // 遇到棋子就停止
          }
          nx += dx;
          ny += dy;
        }
      }
      break;

    case PieceType.RedCannon:
    case PieceType.BlackCannon:
      // 炮移动规则：移动时与车相同，但吃子时需要跳过一个棋子
      const cannonDirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      for (const [dx, dy] of cannonDirs) {
        let nx = x + dx;
        let ny = y + dy;
        // 移动部分（与车相同）
        while (inBounds(nx, ny) && board[nx][ny] === PieceType.Empty) {
          moves.push([nx, ny]);
          nx += dx;
          ny += dy;
        }

        // 吃子部分（需要跳过一个棋子）
        if (inBounds(nx, ny)) { // 找到第一个棋子
          nx += dx;
          ny += dy;
          while (inBounds(nx, ny)) {
            if (board[nx][ny] !== PieceType.Empty) {
              if (PieceOwner[board[nx][ny]] !== player) {
                moves.push([nx, ny]); // 可以吃掉对方的棋子
              }
              break; // 找到第二个棋子后停止
            }
            nx += dx;
            ny += dy;
          }
        }
      }
      break;

    case PieceType.RedPawn:
      // 兵只能向前移动，过河后可以左右移动
      if (x > 0) { // 向前移动
        if (board[x-1][y] === PieceType.Empty || PieceOwner[board[x-1][y]] !== player) {
          moves.push([x-1, y]);
        }
      }

      if (x <= 4) { // 已过河，可以左右移动
        if (y > 0 && (board[x][y-1] === PieceType.Empty || PieceOwner[board[x][y-1]] !== player)) {
          moves.push([x, y-1]);
        }
        if (y < BOARD_WIDTH-1 && (board[x][y+1] === PieceType.Empty || PieceOwner[board[x][y+1]] !== player)) {
          moves.push([x, y+1]);
        }
      }
      break;

    case PieceType.BlackPawn:
      // 卒只能向前移动，过河后可以左右移动
      if (x < BOARD_HEIGHT-1) { // 向前移动
        if (board[x+1][y] === PieceType.Empty || PieceOwner[board[x+1][y]] !== player) {
          moves.push([x+1, y]);
        }
      }

      if (x >= 5) { // 已过河，可以左右移动
        if (y > 0 && (board[x][y-1] === PieceType.Empty || PieceOwner[board[x][y-1]] !== player)) {
          moves.push([x, y-1]);
        }
        if (y < BOARD_WIDTH-1 && (board[x][y+1] === PieceType.Empty || PieceOwner[board[x][y+1]] !== player)) {
          moves.push([x, y+1]);
        }
      }
      break;
  }

  return moves;
}

// 检查是否将军
function isCheck(board: Board, player: Player): boolean {
  // 找到国王位置
  let kingPos: Coord | null = null;
  const kingType = player === Player.Red ? PieceType.RedKing : PieceType.BlackKing;

  for (let x = 0; x < BOARD_HEIGHT; x++) {
    for (let y = 0; y < BOARD_WIDTH; y++) {
      if (board[x][y] === kingType) {
        kingPos = [x, y];
        break;
      }
    }
    if (kingPos) break;
  }

  if (!kingPos) return false; // 应该不会发生

  // 检查对方所有棋子是否可以吃掉国王
  const opponent = player === Player.Red ? Player.Black : Player.Red;

  for (let x = 0; x < BOARD_HEIGHT; x++) {
    for (let y = 0; y < BOARD_WIDTH; y++) {
      const piece = board[x][y];
      if (piece !== PieceType.Empty && PieceOwner[piece] === opponent) {
        const moves = getPossibleMoves(board, [x, y]);
        for (const move of moves) {
          if (move[0] === kingPos[0] && move[1] === kingPos[1]) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

// 检查是否将死
function isCheckmate(board: Board, player: Player): boolean {
  if (!isCheck(board, player)) return false;

  // 尝试所有可能的移动，看是否能解除将军
  for (let x = 0; x < BOARD_HEIGHT; x++) {
    for (let y = 0; y < BOARD_WIDTH; y++) {
      const piece = board[x][y];
      if (piece !== PieceType.Empty && PieceOwner[piece] === player) {
        const moves = getValidMoves(board, [x, y]);
        for (const move of moves) {
          const newBoard = cloneBoard(board);
          newBoard[move[0]][move[1]] = newBoard[x][y];
          newBoard[x][y] = PieceType.Empty;

          if (!isCheck(newBoard, player)) {
            return false; // 找到一步可以解除将军的棋
          }
        }
      }
    }
  }

  return true; // 无法解除将军，将死
}

// 获取特定位置棋子的所有合法移动
function getValidMoves(board: Board, coord: Coord): Coord[] {
  const [x, y] = coord;
  const piece = board[x][y];
  if (piece === PieceType.Empty) return [];

  const player = PieceOwner[piece];
  const possibleMoves = getPossibleMoves(board, coord);

  // 过滤掉会导致自己被将军的移动
  return possibleMoves.filter(([nx, ny]) => {
    const newBoard = cloneBoard(board);
    newBoard[nx][ny] = newBoard[x][y];
    newBoard[x][y] = PieceType.Empty;
    return !isCheck(newBoard, player);
  });
}

// AI移动函数
function aiMove(board: Board, difficulty: DifficultyKey): Move | null {
  const who = Player.Black; // AI执黑

  // 收集所有可能的移动
  const allMoves: Move[] = [];
  for (let x = 0; x < BOARD_HEIGHT; x++) {
    for (let y = 0; y < BOARD_WIDTH; y++) {
      const piece = board[x][y];
      if (piece !== PieceType.Empty && PieceOwner[piece] === who) {
        const validMoves = getValidMoves(board, [x, y]);
        for (const [nx, ny] of validMoves) {
          allMoves.push({
            from: [x, y],
            to: [nx, ny],
            piece: piece,
            captured: board[nx][ny]
          });
        }
      }
    }
  }

  if (allMoves.length === 0) return null;

  // 根据难度选择不同的AI策略
  switch (difficulty) {
    case 'easy':
      // 随机移动
      return allMoves[Math.floor(Math.random() * allMoves.length)];

    case 'medium':
      // 贪心策略：选择能吃掉最有价值棋子的移动
      allMoves.sort((a, b) => {
        const aValue = a.captured ? PieceValue[a.captured] : 0;
        const bValue = b.captured ? PieceValue[b.captured] : 0;
        return bValue - aValue;
      });
      return allMoves[0];

    case 'hard':
    case 'expert':
      // 使用极小化极大算法
      const depth = difficulty === 'hard' ? 2 : 3;
      return minimaxRoot(board, depth, who);
  }
}

// 极小化极大算法根节点
function minimaxRoot(board: Board, depth: number, player: Player): Move | null {
  const allMoves: Move[] = [];
  for (let x = 0; x < BOARD_HEIGHT; x++) {
    for (let y = 0; y < BOARD_WIDTH; y++) {
      const piece = board[x][y];
      if (piece !== PieceType.Empty && PieceOwner[piece] === player) {
        const validMoves = getValidMoves(board, [x, y]);
        for (const [nx, ny] of validMoves) {
          allMoves.push({
            from: [x, y],
            to: [nx, ny],
            piece: piece,
            captured: board[nx][ny]
          });
        }
      }
    }
  }

  if (allMoves.length === 0) return null;

  let bestMove = allMoves[0];
  let bestValue = -Infinity;

  for (const move of allMoves) {
    const newBoard = cloneBoard(board);
    newBoard[move.to[0]][move.to[1]] = newBoard[move.from[0]][move.from[1]];
    newBoard[move.from[0]][move.from[1]] = PieceType.Empty;

    const value = minimax(newBoard, depth - 1, -Infinity, Infinity, false, player);
    if (value > bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }

  return bestMove;
}

// 极小化极大算法
function minimax(board: Board, depth: number, alpha: number, beta: number, isMaximizing: boolean, player: Player): number {
  if (depth === 0) {
    return 0; // 简化评估
  }

  const opponent = player === Player.Red ? Player.Black : Player.Red;
  const currentPlayer = isMaximizing ? player : opponent;

  // 检查是否将死
  if (isCheckmate(board, player)) return -10000;
  if (isCheckmate(board, opponent)) return 10000;

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (let x = 0; x < BOARD_HEIGHT; x++) {
      for (let y = 0; y < BOARD_WIDTH; y++) {
        const piece = board[x][y];
        if (piece !== PieceType.Empty && PieceOwner[piece] === currentPlayer) {
          const validMoves = getValidMoves(board, [x, y]);
          for (const [nx, ny] of validMoves) {
            const newBoard = cloneBoard(board);
            newBoard[nx][ny] = newBoard[x][y];
            newBoard[x][y] = PieceType.Empty;

            const moveScore = minimax(newBoard, depth - 1, alpha, beta, false, player);
            maxScore = Math.max(maxScore, moveScore);
            alpha = Math.max(alpha, moveScore);
            if (beta <= alpha) break;
          }
        }
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (let x = 0; x < BOARD_HEIGHT; x++) {
      for (let y = 0; y < BOARD_WIDTH; y++) {
        const piece = board[x][y];
        if (piece !== PieceType.Empty && PieceOwner[piece] === currentPlayer) {
          const validMoves = getValidMoves(board, [x, y]);
          for (const [nx, ny] of validMoves) {
            const newBoard = cloneBoard(board);
            newBoard[nx][ny] = newBoard[x][y];
            newBoard[x][y] = PieceType.Empty;

            const moveScore = minimax(newBoard, depth - 1, alpha, beta, true, player);
            minScore = Math.min(minScore, moveScore);
            beta = Math.min(beta, moveScore);
            if (beta <= alpha) break;
          }
        }
      }
    }
    return minScore;
  }
}

export default function Chess() {
  const [board, setBoard] = useState<Board>(() => initialBoard());
  const [turn, setTurn] = useState<Player.Red | Player.Black>(Player.Red); // 红先
  const [selectedCell, setSelectedCell] = useState<Coord | null>(null);
  const [validMoves, setValidMoves] = useState<Coord[]>([]);
  const [difficulty, setDifficulty] = useState<DifficultyKey>('medium');
  const [history, setHistory] = useState<Move[]>([]); // 保存走子历史
  const [aiEnabled, setAiEnabled] = useState<boolean>(true); // 是否对战AI
  const [gameOver, setGameOver] = useState<{winner: Player | null}>({winner: null});

  // 检查游戏是否结束
  useEffect(() => {
    if (isCheckmate(board, Player.Red)) {
      setGameOver({winner: Player.Black});
    } else if (isCheckmate(board, Player.Black)) {
      setGameOver({winner: Player.Red});
    }
  }, [board]);

  // AI移动
  useEffect(() => {
    if (!aiEnabled) return;
    if (gameOver.winner) return;
    if (turn === Player.Black) {
      // 添加延迟，让AI思考看起来更自然
      const timer = setTimeout(() => {
        const move = aiMove(cloneBoard(board), difficulty);
        if (move) {
          const [fromX, fromY] = move.from;
          const [toX, toY] = move.to;

          // 更新棋盘状态
          setBoard((prevBoard) => {
            const newBoard = cloneBoard(prevBoard);
            newBoard[toX][toY] = newBoard[fromX][fromY];
            newBoard[fromX][fromY] = PieceType.Empty;
            return newBoard;
          });

          setHistory((prev) => [...prev, move]);
          setTurn(Player.Red);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [turn, aiEnabled, difficulty, gameOver.winner, board]);

  // 处理棋子选择
  const handleCellClick = (x: number, y: number) => {
    if (gameOver.winner) return;
    if (turn === Player.Black && aiEnabled) return; // AI回合不能操作

    const piece = board[x][y];

    // 如果已经选中了一个棋子，并且点击的是有效移动位置
    if (selectedCell && validMoves.some(([mx, my]) => mx === x && my === y)) {
      const [fromX, fromY] = selectedCell;
      const fromPiece = board[fromX][fromY];
      const toPiece = board[x][y];

      // 执行移动
      setBoard((prevBoard) => {
        const newBoard = cloneBoard(prevBoard);
        newBoard[x][y] = newBoard[fromX][fromY];
        newBoard[fromX][fromY] = PieceType.Empty;
        return newBoard;
      });

      // 记录历史
      setHistory((prev) => [...prev, {
        from: [fromX, fromY],
        to: [x, y],
        piece: fromPiece,
        captured: toPiece !== PieceType.Empty ? toPiece : undefined
      }]);

      // 清除选择状态
      setSelectedCell(null);
      setValidMoves([]);

      // 切换回合
      setTurn(turn === Player.Red ? Player.Black : Player.Red);

      return;
    }

    // 如果点击的是自己的棋子，选中它
    if (piece !== PieceType.Empty && PieceOwner[piece] === turn) {
      setSelectedCell([x, y]);
      setValidMoves(getValidMoves(board, [x, y]));
    } else {
      // 点击空位或对方棋子，清除选择
      setSelectedCell(null);
      setValidMoves([]);
    }
  };

  // 重置游戏
  const resetGame = () => {
    setBoard(initialBoard());
    setTurn(Player.Red);
    setSelectedCell(null);
    setValidMoves([]);
    setHistory([]);
    setGameOver({winner: null});
  };

  // 悔棋
  const undoMove = () => {
    if (history.length === 0) return;

    // 如果对战AI，需要撤销两步（玩家+AI）
    const stepsToUndo = aiEnabled ? 2 : 1;
    const newHistory = [...history];
    const movesToUndo = newHistory.splice(-stepsToUndo);

    if (movesToUndo.length > 0) {
      // 重建棋盘
      const newBoard = initialBoard();
      for (let i = 0; i < newHistory.length; i++) {
        const move = newHistory[i];
        newBoard[move.to[0]][move.to[1]] = move.piece;
        newBoard[move.from[0]][move.from[1]] = PieceType.Empty;
      }

      setBoard(newBoard);
      setHistory(newHistory);
      setTurn(Player.Red); // 悔棋后总是红方回合
      setSelectedCell(null);
      setValidMoves([]);
      setGameOver({winner: null});
    }
  };

  // 单元格大小
  const cellSize = 40; // px

  return (
    <div className="w-full max-w-4xl mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">中国象棋</h1>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4 p-4 rounded-xl shadow-md">
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold">
            当前回合：
            <span className={`ml-2 ${turn === Player.Red ? "text-red-600" : "text-gray-800"}`}>
              {turn === Player.Red ? "红方" : "黑方"}
            </span>
          </div>

          <div className="flex items-center gap-2">
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
              className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                aiEnabled
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {aiEnabled ? '对战：电脑' : '对战：双人'}
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={undoMove}
          >
            悔棋
          </Button>
          <Button
            onClick={resetGame}
          >
            重新开始
          </Button>
        </div>
      </div>

      <div className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-200 text-sm text-amber-700">
        <p>小贴士：专家模式使用深度3的极小化极大搜索；进阶模式使用深度2的搜索；入门模式使用贪心策略；新手模式随机移动。</p>
      </div>

      {/* 棋盘 */}
      <div className="w-full flex justify-center">
        <div className="relative inline-block bg-amber-100 rounded-xl p-4 shadow-lg border-4 border-amber-800">
          {gameOver.winner && (
            <div className="absolute inset-0 bg-[rgba(255,255,255,0.8)] z-10 rounded-xl flex flex-col items-center justify-center text-2xl font-bold">
              <div className={`${gameOver.winner === Player.Red ? "text-red-600" : "text-gray-800"} mb-2`}>
                {gameOver.winner === Player.Red ? '红方胜利！🎉' : '黑方胜利！🎉'}
              </div>
              <button
                onClick={resetGame}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg text-lg font-medium hover:bg-green-700 transition-colors"
              >
                再来一局
              </button>
            </div>
          )}

          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${cellSize}px)`,
              gap: 0,
            }}
          >
            {Array.from({ length: BOARD_HEIGHT * BOARD_WIDTH }, (_, i) => {
              const x = Math.floor(i / BOARD_WIDTH);
              const y = i % BOARD_WIDTH;
              const piece = board[x][y];
              const isSelected = selectedCell && selectedCell[0] === x && selectedCell[1] === y;
              const isValidMove = validMoves.some(([mx, my]) => mx === x && my === y);

              // 棋盘样式
              let cellClass = "relative flex items-center justify-center hover:bg-amber-200/60 focus:outline-none";

              // 选中和可移动位置的样式
              if (isSelected) {
                cellClass += " bg-amber-300/70";
              } else if (isValidMove) {
                cellClass += " bg-green-200/70";
              }

              // 棋子样式
              let pieceClass = "flex items-center justify-center rounded-full w-8 h-8 font-bold text-lg z-10";
              if (piece !== PieceType.Empty) {
                pieceClass += PieceOwner[piece] === Player.Red
                  ? " bg-red-100 text-red-600 border-2 border-red-600 shadow-md"
                  : " bg-gray-800 text-white border-2 border-gray-800 shadow-md";
              }

              return (
                <motion.div
                  key={i}
                  className={cellClass}
                  onClick={() => handleCellClick(x, y)}
                  style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                >
                  {/* 绘制棋盘线 */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* 横线 */}
                    {x > 0 && x < BOARD_HEIGHT && (
                      <div className="absolute left-0 right-0 top-1/2 h-px bg-amber-800/60 transform -translate-y-1/2"></div>
                    )}

                    {/* 竖线 */}
                    {y > 0 && y < BOARD_WIDTH-1 && (
                      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-amber-800/60 transform -translate-x-1/2"></div>
                    )}

                    {/* 九宫格斜线 */}
                    {((x === 0 && y === 3) || (x === 9 && y === 3)) && (
                      <div className="absolute w-[56px] h-[56px] border-b border-amber-800/60 transform rotate-45"></div>
                    )}
                    {((x === 0 && y === 5) || (x === 9 && y === 5)) && (
                      <div className="absolute w-[56px] h-[56px] border-b border-amber-800/60 transform -rotate-45"></div>
                    )}

                    {/* 兵/卒位置标记 */}
                    {((x === 3 && (y === 0 || y === 2 || y === 4 || y === 6 || y === 8)) ||
                      (x === 6 && (y === 0 || y === 2 || y === 4 || y === 6 || y === 8))) && (
                      <div className="absolute w-2 h-2 border-t border-r border-amber-800/60 top-0 right-0"></div>
                    )}
                    {((x === 3 && (y === 0 || y === 2 || y === 4 || y === 6 || y === 8)) ||
                      (x === 6 && (y === 0 || y === 2 || y === 4 || y === 6 || y === 8))) && (
                      <div className="absolute w-2 h-2 border-t border-l border-amber-800/60 top-0 left-0"></div>
                    )}
                    {((x === 3 && (y === 0 || y === 2 || y === 4 || y === 6 || y === 8)) ||
                      (x === 6 && (y === 0 || y === 2 || y === 4 || y === 6 || y === 8))) && (
                      <div className="absolute w-2 h-2 border-b border-r border-amber-800/60 bottom-0 right-0"></div>
                    )}
                    {((x === 3 && (y === 0 || y === 2 || y === 4 || y === 6 || y === 8)) ||
                      (x === 6 && (y === 0 || y === 2 || y === 4 || y === 6 || y === 8))) && (
                      <div className="absolute w-2 h-2 border-b border-l border-amber-800/60 bottom-0 left-0"></div>
                    )}

                    {/* 炮位置标记 */}
                    {((x === 2 && (y === 1 || y === 7)) ||
                      (x === 7 && (y === 1 || y === 7))) && (
                      <div className="absolute w-2 h-2 border-t border-r border-amber-800/60 top-0 right-0"></div>
                    )}
                    {((x === 2 && (y === 1 || y === 7)) ||
                      (x === 7 && (y === 1 || y === 7))) && (
                      <div className="absolute w-2 h-2 border-t border-l border-amber-800/60 top-0 left-0"></div>
                    )}
                    {((x === 2 && (y === 1 || y === 7)) ||
                      (x === 7 && (y === 1 || y === 7))) && (
                      <div className="absolute w-2 h-2 border-b border-r border-amber-800/60 bottom-0 right-0"></div>
                    )}
                    {((x === 2 && (y === 1 || y === 7)) ||
                      (x === 7 && (y === 1 || y === 7))) && (
                      <div className="absolute w-2 h-2 border-b border-l border-amber-800/60 bottom-0 left-0"></div>
                    )}
                  </div>

                  {/* 棋子 - 使用motion.div添加动画 */}
                  {piece !== PieceType.Empty && (
                    <motion.div
                      layout
                      className={pieceClass}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      {PieceSymbol[piece]}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* 楚河汉界 */}
          <div className="absolute top-[50%] left-0 right-0 flex justify-center transform -translate-y-1/2 pointer-events-none">
            <div className="bg-amber-800 text-white px-16 py-1 rounded-full text-sm font-bold">
              楚河　　　　　　汉界
            </div>
          </div>
        </div>
      </div>

      {/* 历史记录 */}
      <div className="mt-8 max-h-48 overflow-auto rounded-xl border p-4 text-sm shadow-md">
        <div className="font-bold mb-2 text-gray-700">着法记录（最近在前）</div>
        <ol className="space-y-1">
          {[...history].reverse().map((move, idx) => {
            const [fromX, fromY] = move.from;
            const [toX, toY] = move.to;
            const player = PieceOwner[move.piece];
            return (
              <li key={idx} className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    player === Player.Red
                      ? "bg-red-100 text-red-600 border border-red-300"
                      : "bg-gray-800 text-white"
                  }`}>
                    {player === Player.Red ? "红" : "黑"}
                  </span>
                  {PieceSymbol[move.piece]} ({fromX},{fromY}) → ({toX},{toY})
                  {move.captured ? ` 吃${PieceSymbol[move.captured]}` : ""}
                </span>
                <span className="text-gray-400 text-xs">#{history.length - idx}</span>
              </li>
            );
          })}
          {history.length === 0 && (
            <li className="text-gray-400 text-center py-4">暂无记录</li>
          )}
        </ol>
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>中国象棋 - 传统策略游戏 | 使用 React 和 framer-motion 构建</p>
      </footer>
    </div>
  );
}