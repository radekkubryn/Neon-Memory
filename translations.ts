
import { Language, Difficulty } from './types';

export const translations = {
  en: {
    title: 'Neon Memory',
    edition: 'Professional Edition',
    play: 'Play',
    ranking: 'Ranking',
    backToMenu: 'Back to Menu',
    exit: 'Exit',
    time: 'Time',
    moves: 'Moves',
    level: 'Level',
    victory: 'Victory!',
    congrats: 'Amazing observation skills, congratulations!',
    playAgain: 'Play Again',
    date: 'Date',
    bestRanking: 'Best Ranking',
    noScores: 'No scores yet. Play to appear in the ranking!',
    difficulty: {
      [Difficulty.EASY]: 'Easy',
      [Difficulty.NORMAL]: 'Normal',
      [Difficulty.HARD]: 'Hard'
    },
    heroTitle: 'Train your',
    heroMind: 'Mind in Style.',
    heroDesc: 'Choose your difficulty and race against time. Find all pairs as fast as possible to climb the leaderboard.',
    cardsLabel: 'Cards',
    gridLabel: 'Grid',
    footer: '© 2024 Neon Memory Pro. Modern Gaming Experience.'
  },
  pl: {
    title: 'Neon Memory',
    edition: 'Wersja Profesjonalna',
    play: 'Graj',
    ranking: 'Ranking',
    backToMenu: 'Powrót do Menu',
    exit: 'Wyjdź',
    time: 'Czas',
    moves: 'Ruchy',
    level: 'Poziom',
    victory: 'Zwycięstwo!',
    congrats: 'Niesamowita spostrzegawczość, gratulacje!',
    playAgain: 'Zagraj Ponownie',
    date: 'Data',
    bestRanking: 'Ranking Najlepszych',
    noScores: 'Brak wyników. Zagraj, aby pojawić się w rankingu!',
    difficulty: {
      [Difficulty.EASY]: 'Łatwy',
      [Difficulty.NORMAL]: 'Normalny',
      [Difficulty.HARD]: 'Trudny'
    },
    heroTitle: 'Trenuj swój',
    heroMind: 'Umysł w Stylu.',
    heroDesc: 'Wybierz poziom trudności i zmierz się z czasem. Odkryj wszystkie pary jak najszybciej, by trafić na szczyt rankingu.',
    cardsLabel: 'Kart',
    gridLabel: 'Siatka',
    footer: '© 2024 Neon Memory Pro. Nowoczesne doznania gamingowe.'
  }
};
