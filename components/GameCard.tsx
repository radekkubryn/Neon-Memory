
import React from 'react';
import { Card } from '../types';

interface GameCardProps {
  card: Card;
  onClick: () => void;
  disabled: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ card, onClick, disabled }) => {
  return (
    <div 
      className={`card-perspective w-full aspect-square cursor-pointer group ${card.isMatched ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100'} transition-all duration-700`}
      onClick={() => !disabled && !card.isFlipped && !card.isMatched && onClick()}
    >
      <div className={`card-inner ${card.isFlipped ? 'flipped' : ''}`}>
        {/* Front Side (Tył karty - widoczny na początku) */}
        <div className="card-front glass flex items-center justify-center border-2 border-slate-700/50 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-20 group-hover:opacity-40 transition-opacity flex items-center justify-center">
             <svg className="w-6 h-6 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 004.242 15M4.242 15a10.002 10.002 0 0110.828-10.828M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
        </div>

        {/* Back Side (Przód karty - z obrazkiem) */}
        <div className="card-back overflow-hidden border-2 border-indigo-500 bg-slate-900 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
          <img 
            src={card.image} 
            alt="Obrazek karty" 
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
