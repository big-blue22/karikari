import React, { useState, useCallback, useEffect, useRef } from 'react';
import { MiningArea, MiningState, MiningEffect, OreType, ExperienceState, LevelUpPopup, QuizState, QuizQuestion } from './types';
import { MINING_CONFIG, ORE_TYPES, EXPERIENCE_CONFIG, QUIZ_QUESTIONS } from './constants';
import ExperienceBar from './ExperienceBar';
import LevelUpPopupComponent from './LevelUpPopup';
import QuizPopup from './QuizPopup';

interface MiningSystemProps {
  className?: string;
}

const MiningSystem: React.FC<MiningSystemProps> = ({ className }) => {
  const [miningState, setMiningState] = useState<MiningState>({
    isMinning: false,
    progress: 0,
    targetArea: null,
    startTime: null
  });
  
  const [miningAreas, setMiningAreas] = useState<MiningArea[]>([]);
  const [effects, setEffects] = useState<MiningEffect[]>([]);
  const [minedOres, setMinedOres] = useState<(OreType & { id: string })[]>([]);
  
  // 経験値システムの状態
  const [experience, setExperience] = useState<ExperienceState>({
    currentXP: 0,
    level: 1,
    maxXP: EXPERIENCE_CONFIG.BASE_XP_PER_LEVEL
  });
  const [recentXPGain, setRecentXPGain] = useState<number>(0);
  const [levelUpPopup, setLevelUpPopup] = useState<LevelUpPopup>({
    isVisible: false,
    newLevel: 1,
    timestamp: 0
  });
  
  // クイズシステムの状態
  const [quizState, setQuizState] = useState<QuizState>({
    isVisible: false,
    question: null,
    selectedAnswer: null,
    showResult: false,
    isCorrect: false,
    onComplete: () => {}
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const longPressRef = useRef<NodeJS.Timeout>();

  // レベルに必要なXPを計算
  const calculateMaxXP = useCallback((level: number): number => {
    return Math.floor(EXPERIENCE_CONFIG.BASE_XP_PER_LEVEL * Math.pow(EXPERIENCE_CONFIG.XP_GROWTH_RATE, level - 1));
  }, []);

  // 経験値を追加してレベルアップをチェック
  const addExperience = useCallback((xpGain: number) => {
    setExperience(prev => {
      let newCurrentXP = prev.currentXP + xpGain;
      let newLevel = prev.level;
      let newMaxXP = prev.maxXP;
      
      // レベルアップチェック
      while (newCurrentXP >= newMaxXP && newLevel < EXPERIENCE_CONFIG.MAX_LEVEL) {
        newCurrentXP -= newMaxXP;
        newLevel += 1;
        newMaxXP = calculateMaxXP(newLevel);
        
        // レベルアップポップアップを表示
        setLevelUpPopup({
          isVisible: true,
          newLevel: newLevel,
          timestamp: Date.now()
        });
      }
      
      // 最大レベルの場合、余剰XPは切り捨て
      if (newLevel >= EXPERIENCE_CONFIG.MAX_LEVEL) {
        newCurrentXP = Math.min(newCurrentXP, newMaxXP);
      }
      
      return {
        currentXP: newCurrentXP,
        level: newLevel,
        maxXP: newMaxXP
      };
    });
    
    // XP獲得通知を表示
    setRecentXPGain(xpGain);
    setTimeout(() => setRecentXPGain(0), EXPERIENCE_CONFIG.XP_NOTIFICATION_DURATION);
  }, [calculateMaxXP]);

  // ランダムなクイズ問題を取得
  const getRandomQuizQuestion = useCallback((): QuizQuestion => {
    const randomIndex = Math.floor(Math.random() * QUIZ_QUESTIONS.length);
    return QUIZ_QUESTIONS[randomIndex];
  }, []);

  // クイズを開始
  const startQuiz = useCallback((onComplete: (correct: boolean) => void) => {
    const question = getRandomQuizQuestion();
    setQuizState({
      isVisible: true,
      question,
      selectedAnswer: null,
      showResult: false,
      isCorrect: false,
      onComplete
    });
  }, [getRandomQuizQuestion]);

  // 鉱石抽選
  const rollForOre = useCallback((): OreType | null => {
    const roll = Math.random();
    
    for (const ore of ORE_TYPES) {
      if (roll < ore.rarity) {
        return ore;
      }
    }
    
    return null;
  }, []);

  // 採掘完了処理
  const completeMining = useCallback(() => {
    if (!miningState.targetArea) return;
    
    const area = miningState.targetArea;
    
    // 鉱石の抽選
    const foundOre = rollForOre();
    
    // エフェクトを追加
    const effect: MiningEffect = {
      id: Date.now().toString(),
      x: area.x + area.width / 2,
      y: area.y + area.height / 2,
      type: foundOre ? 'ore' : 'stone',
      ore: foundOre || undefined,
      timestamp: Date.now()
    };
    
    setEffects(prev => [...prev, effect]);
    
    // 鉱石が見つかった場合の処理
    if (foundOre) {
      // インベントリに追加
      setMinedOres(prev => [...prev, { ...foundOre, id: Date.now().toString() }]);
      
      // 宝箱の場合はクイズを表示
      if (foundOre.name === '宝箱') {
        startQuiz((correct: boolean) => {
          if (correct) {
            addExperience(100); // 正解時は100XP
          }
          // 不正解時は0XP（何もしない）
        });
      } else {
        // 通常の鉱石の場合は経験値を獲得
        addExperience(foundOre.value);
      }
    }
    
    // エリアを掘られた状態に
    setMiningAreas(prev => prev.map(a => 
      a.id === area.id 
        ? { ...a, isRegenerated: false, lastMined: Date.now() }
        : a
    ));
    
    // 採掘状態をリセット
    setMiningState({
      isMinning: false,
      progress: 0,
      targetArea: null,
      startTime: null
    });
    
    // 石の再生タイマー
    setTimeout(() => {
      setMiningAreas(prev => prev.map(a => 
        a.id === area.id 
          ? { ...a, isRegenerated: true }
          : a
      ));
    }, MINING_CONFIG.REGENERATION_TIME);
  }, [miningState.targetArea, rollForOre, addExperience, startQuiz]);

  // ポップアップを手動で閉じる
  const closeLevelUpPopup = useCallback(() => {
    setLevelUpPopup(prev => ({ ...prev, isVisible: false }));
  }, []);

  // クイズを閉じる
  const closeQuiz = useCallback(() => {
    setQuizState(prev => ({ ...prev, isVisible: false }));
  }, []);

  // 採掘エリアの初期化
  useEffect(() => {
    const areas: MiningArea[] = [];
    const cols = Math.floor(window.innerWidth / MINING_CONFIG.BLOCK_SIZE);
    const rows = 6; // 石エリアの行数
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        areas.push({
          id: `${row}-${col}`,
          x: col * MINING_CONFIG.BLOCK_SIZE,
          y: row * MINING_CONFIG.BLOCK_SIZE,
          width: MINING_CONFIG.BLOCK_SIZE,
          height: MINING_CONFIG.BLOCK_SIZE,
          isRegenerated: true,
          lastMined: null
        });
      }
    }
    
    setMiningAreas(areas);
  }, []);

  // 採掘アニメーション
  const updateMiningProgress = useCallback(() => {
    if (!miningState.isMinning || !miningState.startTime) return;
    
    const elapsed = Date.now() - miningState.startTime;
    const progress = Math.min(elapsed / MINING_CONFIG.MINING_TIME, 1);
    
    setMiningState(prev => ({ ...prev, progress }));
    
    if (progress >= 1) {
      completeMining();
    } else {
      animationRef.current = requestAnimationFrame(updateMiningProgress);
    }
  }, [miningState.isMinning, miningState.startTime, completeMining]);

  // 右クリック開始
  const handleMouseDown = useCallback((e: React.MouseEvent, area: MiningArea) => {
    if (e.button !== 2) return; // 右クリックのみ
    if (!area.isRegenerated || miningState.isMinning) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // 長押し判定開始
    longPressRef.current = setTimeout(() => {
      setMiningState({
        isMinning: true,
        progress: 0,
        targetArea: area,
        startTime: Date.now()
      });
    }, 100); // 100ms後に採掘開始
  }, [miningState.isMinning]);

  // 右クリック終了
  const handleMouseUp = useCallback(() => {
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
    }
    
    if (miningState.isMinning) {
      // 採掘中断
      setMiningState({
        isMinning: false,
        progress: 0,
        targetArea: null,
        startTime: null
      });
    }
  }, [miningState.isMinning]);

  // レベルアップポップアップの自動クローズ
  useEffect(() => {
    if (levelUpPopup.isVisible) {
      const timer = setTimeout(() => {
        setLevelUpPopup(prev => ({ ...prev, isVisible: false }));
      }, EXPERIENCE_CONFIG.LEVEL_UP_POPUP_DURATION);
      
      return () => clearTimeout(timer);
    }
  }, [levelUpPopup.isVisible]);

  // 採掘アニメーション更新
  useEffect(() => {
    if (miningState.isMinning) {
      animationRef.current = requestAnimationFrame(updateMiningProgress);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [miningState.isMinning, updateMiningProgress]);

  // エフェクトの自動削除
  useEffect(() => {
    const interval = setInterval(() => {
      setEffects(prev => prev.filter(effect => 
        Date.now() - effect.timestamp < 2000
      ));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  // コンテキストメニューを無効化
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className={className}>
      {/* 採掘エリア */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: `${MINING_CONFIG.STONE_AREA_TOP}vh`,
          left: 0,
          right: 0,
          height: `${MINING_CONFIG.STONE_AREA_HEIGHT}vh`,
          zIndex: 10,
          cursor: 'crosshair'
        }}
        onContextMenu={handleContextMenu}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {miningAreas.map(area => (
          <div
            key={area.id}
            style={{
              position: 'absolute',
              left: area.x,
              top: area.y,
              width: area.width,
              height: area.height,
              backgroundColor: area.isRegenerated ? 'rgba(105, 105, 105, 0.2)' : 'rgba(47, 47, 47, 0.8)',
              border: area.isRegenerated ? '1px solid rgba(105, 105, 105, 0.5)' : '1px solid rgba(47, 47, 47, 0.3)',
              transition: 'all 0.3s ease',
              cursor: area.isRegenerated ? 'crosshair' : 'not-allowed',
              borderRadius: '2px',
              boxShadow: area.isRegenerated ? 'inset 0 0 4px rgba(255,255,255,0.1)' : 'inset 0 0 8px rgba(0,0,0,0.8)'
            }}
            className={area.isRegenerated ? 'hover:bg-gray-400/30 hover:shadow-lg' : ''}
            onMouseDown={(e) => handleMouseDown(e, area)}
          >
            {/* 採掘プログレス */}
            {miningState.isMinning && miningState.targetArea?.id === area.id && (
              <>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${miningState.progress * 100}%`,
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    transition: 'height 0.1s ease',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)'
                  }}
                />
                {/* 採掘パーティクル効果 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '16px',
                    animation: 'mining 0.5s infinite'
                  }}
                >
                  ⛏️
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* エフェクト表示 */}
      {effects.map(effect => (
        <div
          key={effect.id}
          style={{
            position: 'fixed',
            left: effect.x,
            top: `calc(${MINING_CONFIG.STONE_AREA_TOP}vh + ${effect.y}px)`,
            transform: 'translate(-50%, -50%)',
            fontSize: '24px',
            fontWeight: 'bold',
            color: effect.ore?.color || '#666',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            animation: 'fadeInOut 2s ease-out forwards',
            zIndex: 100,
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          {effect.ore ? `${effect.ore.effect} ${effect.ore.name}!` : '💨 石'}
        </div>
      ))}

      {/* インベントリ表示 */}
      {minedOres.length > 0 && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: 'rgba(47, 47, 47, 0.95)',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            border: '3px solid #8B4513',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)',
            zIndex: 1000,
            maxWidth: '280px',
            backdropFilter: 'blur(4px)'
          }}
        >
          <h4 style={{ 
            margin: '0 0 12px 0', 
            fontSize: '18px', 
            textAlign: 'center',
            color: '#FFD700',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            borderBottom: '2px solid #8B4513',
            paddingBottom: '8px'
          }}>
            ⛏️ 発掘した鉱石 ⛏️
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))', gap: '8px' }}>
            {Object.entries(
              minedOres.reduce((acc, ore) => {
                acc[ore.name] = (acc[ore.name] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([name, count]) => {
              const ore = ORE_TYPES.find(o => o.name === name)!;
              return (
                <div 
                  key={name} 
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    border: '2px solid #444',
                    borderRadius: '4px',
                    padding: '8px',
                    textAlign: 'center',
                    fontSize: '12px',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>{ore.effect}</div>
                  <div style={{ color: ore.color, fontWeight: 'bold' }}>{name}</div>
                  <div style={{ color: '#ccc', fontSize: '10px' }}>×{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 経験値バー */}
      <ExperienceBar 
        experience={experience}
        recentXPGain={recentXPGain}
      />

      {/* レベルアップポップアップ */}
      <LevelUpPopupComponent 
        popup={levelUpPopup}
        onClose={closeLevelUpPopup}
      />

      {/* クイズポップアップ */}
      <QuizPopup 
        quizState={quizState}
        onClose={closeQuiz}
      />

      {/* CSS アニメーション */}
      <style>
        {`
          @keyframes fadeInOut {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.5) translateY(0);
            }
            50% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1.2) translateY(-20px);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(1) translateY(-40px);
            }
          }
          
          @keyframes mining {
            0%, 100% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
            25% { transform: translate(-50%, -50%) rotate(-15deg) scale(1.1); }
            75% { transform: translate(-50%, -50%) rotate(15deg) scale(1.1); }
          }
          
          .mining-area-regenerating {
            animation: regenerate 1s ease-in-out;
          }
          
          @keyframes regenerate {
            0% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 0.7; transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }
          
          .hover\\:bg-gray-400\\/30:hover {
            background-color: rgba(156, 163, 175, 0.3) !important;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
          }
        `}
      </style>
    </div>
  );
};

export default MiningSystem;
