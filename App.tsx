
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Difficulty, Card, GameScore, DIFFICULTY_CONFIGS, Language } from './types';
import { generateCards, formatTime, playSound } from './utils/gameUtils';
import { GameCard } from './components/GameCard';
import { RankingBoard } from './components/RankingBoard';
import { GameSummary } from './components/GameSummary';
import { translations } from './translations';

const STORAGE_KEY = 'neon_memory_scores_v1';
const LANG_STORAGE_KEY = 'neon_memory_lang_v1';

const App: React.FC = () => {
  const [view, setView] = useState<'menu' | 'playing' | 'ranking'>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.NORMAL);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [scores, setScores] = useState<GameScore[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return (saved as Language) || 'en';
  });

  const t = translations[language];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setScores(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, language);
  }, [language]);

  const saveScore = useCallback((newScore: GameScore) => {
    const updated = [...scores, newScore];
    setScores(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [scores]);

  const startGame = (diff: Difficulty) => {
    setDifficulty(diff);
    const newCards = generateCards(diff);
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsWon(false);
    setView('playing');
    setIsProcessing(false);
    
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const handleCardClick = (index: number) => {
    if (isProcessing || cards[index].isFlipped || cards[index].isMatched || flippedCards.length >= 2) return;

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);
    playSound('flip');

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      setIsProcessing(true);
      
      const [idx1, idx2] = newFlipped;
      
      if (newCards[idx1].pairId === newCards[idx2].pairId) {
        setTimeout(() => {
          setCards(prevCards => {
            const updated = [...prevCards];
            updated[idx1] = { ...updated[idx1], isMatched: true };
            updated[idx2] = { ...updated[idx2], isMatched: true };
            
            if (updated.every(c => c.isMatched)) {
              handleWin();
            }
            return updated;
          });
          setFlippedCards([]);
          setIsProcessing(false);
          playSound('match');
        }, 600);
      } else {
        setTimeout(() => {
          setCards(prevCards => {
            const updated = [...prevCards];
            updated[idx1] = { ...updated[idx1], isFlipped: false };
            updated[idx2] = { ...updated[idx2], isFlipped: false };
            return updated;
          });
          setFlippedCards([]);
          setIsProcessing(false);
          playSound('error');
        }, 1200);
      }
    }
  };

  const handleWin = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsWon(true);
    playSound('win');
    
    const finalTime = time;
    const finalMoves = moves;

    const newScore: GameScore = {
      id: Math.random().toString(36).substr(2, 9),
      difficulty,
      timeInSeconds: finalTime,
      moves: finalMoves,
      date: new Date().toISOString(),
    };
    saveScore(newScore);
  };

  const stopGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsWon(false); // Reset isWon state
    setView('menu');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'pl' : 'en');
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 max-w-7xl mx-auto overflow-y-auto">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => stopGame()}
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white uppercase">{t.title}</h1>
            <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">{t.edition}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {view === 'playing' && (
            <div className="flex gap-4">
              <div className="glass px-6 py-2 rounded-2xl flex flex-col items-center min-w-[100px]">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{t.time}</span>
                <span className="text-xl font-mono font-bold text-indigo-400">{formatTime(time)}</span>
              </div>
              <div className="glass px-6 py-2 rounded-2xl flex flex-col items-center min-w-[100px]">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{t.moves}</span>
                <span className="text-xl font-mono font-bold text-purple-400">{moves}</span>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button 
              onClick={toggleLanguage}
              className="glass px-4 py-2 rounded-xl font-black text-xs hover:bg-white/10 transition-all uppercase text-slate-400 hover:text-white"
            >
              {language === 'en' ? 'PL' : 'EN'}
            </button>
            
            {view === 'menu' ? (
              <button 
                onClick={() => setView('ranking')}
                className="glass px-6 py-3 rounded-2xl font-bold text-sm hover:bg-white/10 transition-colors"
              >
                {t.ranking}
              </button>
            ) : (
              <button 
                onClick={stopGame}
                className="glass px-6 py-3 rounded-2xl font-bold text-sm hover:bg-red-500/20 text-red-400 transition-colors"
              >
                {t.exit}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        {view === 'menu' && (
          <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center py-12">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-black leading-tight">
                {t.heroTitle} <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">
                  {t.heroMind}
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-md">
                {t.heroDesc}
              </p>
            </div>
            
            <div className="space-y-4">
              {(Object.keys(DIFFICULTY_CONFIGS) as Difficulty[]).map((level) => (
                <button
                  key={level}
                  onClick={() => startGame(level)}
                  className="w-full group relative overflow-hidden glass p-6 rounded-3xl text-left transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${DIFFICULTY_CONFIGS[level].color} opacity-10 group-hover:opacity-20 transition-opacity rounded-bl-full`} />
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">
                        {t.difficulty[level]}
                      </h3>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">
                        {DIFFICULTY_CONFIGS[level].pairs * 2} {t.cardsLabel} • {t.gridLabel} {level === Difficulty.HARD ? '6x6' : '4x4'}
                      </p>
                    </div>
                    <svg className="w-8 h-8 text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'playing' && (
          <div className={`grid ${DIFFICULTY_CONFIGS[difficulty].gridCols} gap-4 w-full max-w-5xl mx-auto p-4`}>
            {cards.map((card, idx) => (
              <GameCard 
                key={card.id}
                card={card}
                onClick={() => handleCardClick(idx)}
                disabled={isProcessing || isWon}
              />
            ))}
          </div>
        )}

        {view === 'ranking' && (
          <div className="w-full">
            <RankingBoard scores={scores} lang={language} />
            <div className="mt-8 text-center">
              <button 
                onClick={() => setView('menu')}
                className="text-slate-500 hover:text-white font-bold text-sm underline transition-colors"
              >
                {t.backToMenu}
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 py-6 border-t border-white/5 text-center text-slate-600 text-sm font-medium">
        {t.footer}
      </footer>

      {isWon && (
        <GameSummary 
          difficulty={difficulty}
          time={time}
          moves={moves}
          onRestart={() => startGame(difficulty)}
          onGoHome={() => stopGame()}
          lang={language}
        />
      )}
    </div>
  );
};

export default App;
