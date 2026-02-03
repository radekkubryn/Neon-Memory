
export enum Difficulty {
  EASY = 'EASY',
  NORMAL = 'NORMAL',
  HARD = 'HARD'
}

export type Language = 'en' | 'pl';

export interface Card {
  id: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  pairId: number;
}

export interface GameScore {
  id: string;
  difficulty: Difficulty;
  timeInSeconds: number;
  moves: number;
  date: string;
}

export interface DifficultyConfig {
  gridCols: string;
  pairs: number;
  color: string;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  [Difficulty.EASY]: {
    gridCols: 'grid-cols-3 md:grid-cols-4',
    pairs: 6, // 12 cards
    color: 'from-emerald-400 to-cyan-400'
  },
  [Difficulty.NORMAL]: {
    gridCols: 'grid-cols-4',
    pairs: 8, // 16 cards
    color: 'from-blue-400 to-indigo-400'
  },
  [Difficulty.HARD]: {
    gridCols: 'grid-cols-6',
    pairs: 18, // 36 cards
    color: 'from-purple-400 to-rose-400'
  }
};
