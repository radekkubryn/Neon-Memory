
import React from 'react';
import { Difficulty, DIFFICULTY_CONFIGS, Language } from '../types';
import { formatTime } from '../utils/gameUtils';
import { translations } from '../translations';

interface GameSummaryProps {
  difficulty: Difficulty;
  time: number;
  moves: number;
  onRestart: () => void;
  onGoHome: () => void;
  lang: Language;
}

export const GameSummary: React.FC<GameSummaryProps> = ({ difficulty, time, moves, onRestart, onGoHome, lang }) => {
  const t = translations[lang];
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onGoHome} />
      
      <div className="relative glass w-full max-w-lg rounded-[2.5rem] p-10 text-center shadow-[0_0_50px_rgba(99,102,241,0.3)] animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-40 animate-pulse" />
            <div className="relative bg-gradient-to-tr from-yellow-400 to-amber-600 p-6 rounded-full floating shadow-2xl">
              <svg className="w-16 h-16 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold mb-2 text-white">{t.victory}</h1>
        <p className="text-slate-400 mb-8">{t.congrats}</p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">{t.level}</div>
            <div className={`font-bold bg-clip-text text-transparent bg-gradient-to-r ${DIFFICULTY_CONFIGS[difficulty].color}`}>
              {t.difficulty[difficulty]}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">{t.time}</div>
            <div className="text-xl font-bold text-white">{formatTime(time)}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">{t.moves}</div>
            <div className="text-xl font-bold text-white">{moves}</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={onRestart}
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            {t.playAgain}
          </button>
          <button 
            onClick={onGoHome}
            className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold transition-all"
          >
            {t.backToMenu}
          </button>
        </div>
      </div>
    </div>
  );
};
