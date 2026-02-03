
import { Card, Difficulty, DIFFICULTY_CONFIGS } from '../types';

export const generateCards = (difficulty: Difficulty): Card[] => {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const cards: Card[] = [];

  // Using specific seeds to get high-quality colorful images from picsum
  const imageIds = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 
    110, 120, 130, 140, 150, 160, 170, 180, 190, 200
  ].sort(() => Math.random() - 0.5);

  for (let i = 0; i < config.pairs; i++) {
    const imgId = imageIds[i];
    const imageUrl = `https://picsum.photos/seed/${imgId}/300/300`;
    
    // Create pair
    const card1: Card = {
      id: `${i}-a`,
      pairId: i,
      image: imageUrl,
      isFlipped: false,
      isMatched: false,
    };
    const card2: Card = {
      id: `${i}-b`,
      pairId: i,
      image: imageUrl,
      isFlipped: false,
      isMatched: false,
    };
    
    cards.push(card1, card2);
  }

  return cards.sort(() => Math.random() - 0.5);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const playSound = (type: 'flip' | 'match' | 'error' | 'win') => {
  const context = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const frequencies: Record<typeof type, number[]> = {
    flip: [400],
    match: [523.25, 659.25, 783.99],
    error: [200, 150],
    win: [523.25, 659.25, 783.99, 1046.50]
  };

  const freqs = frequencies[type];
  freqs.forEach((freq, index) => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, context.currentTime + index * 0.1);

    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(context.currentTime + index * 0.1);
    oscillator.stop(context.currentTime + index * 0.1 + 0.3);
  });
};
