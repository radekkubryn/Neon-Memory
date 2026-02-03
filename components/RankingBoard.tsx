
import React from 'react';
import { GameScore, Difficulty, DIFFICULTY_CONFIGS, Language } from '../types';
import { formatTime } from '../utils/gameUtils';
import { translations } from '../translations';

interface RankingBoardProps {
  scores: GameScore[];
  lang: Language;
}

export const RankingBoard: React.FC<RankingBoardProps> = ({ scores, lang }) => {
  const t = translations[lang];
  const sortedScores = [...scores].sort((a, b) => {
    if (a.timeInSeconds !== b.timeInSeconds) {
      return a.timeInSeconds - b.timeInSeconds;
    }
    return a.moves - b.moves;
  });

  return (
    <div className="glass rounded-3xl p-6 md:p-8 w-full max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          {t.bestRanking}
        </h2>
        <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>

      {sortedScores.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          {t.noScores}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedScores.slice(0, 10).map((score, index) => (
            <div 
              key={score.id} 
              className="flex items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${
                index === 0 ? 'bg-yellow-500 text-slate-900' : 
                index === 1 ? 'bg-slate-300 text-slate-900' :
                index === 2 ? 'bg-amber-700 text-white' : 'text-slate-400'
              }`}>
                {index + 1}
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-gradient-to-r ${DIFFICULTY_CONFIGS[score.difficulty].color} text-slate-900`}>
                    {t.difficulty[score.difficulty]}
                  </span>
                  <span className="text-slate-500 text-[10px] font-bold uppercase">
                    {new Date(score.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-lg font-semibold text-white mt-1">
                  {formatTime(score.timeInSeconds)}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">{t.moves}</div>
                <div className="text-xl font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">
                  {score.moves}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
