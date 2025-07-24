import React, { useState, useEffect, useCallback } from 'react';
import { QuizState } from './types';
import Furigana from './Furigana';

interface QuizPopupProps {
  quizState: QuizState;
  onClose: () => void;
}

const QuizPopup: React.FC<QuizPopupProps> = ({ quizState, onClose }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (quizState.isVisible) {
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  }, [quizState.isVisible]);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  }, [showResult]);

  const handleSubmit = useCallback(() => {
    if (selectedAnswer === null || !quizState.question) return;
    
    const correct = selectedAnswer === quizState.question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    // 結果を2秒後に通知
    setTimeout(() => {
      quizState.onComplete(correct);
      onClose();
    }, 2000);
  }, [selectedAnswer, quizState, onClose]);

  if (!quizState.isVisible || !quizState.question) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(4px)'
      }}
    >
      <div
        style={{
          backgroundColor: '#2F4F4F',
          color: 'white',
          padding: '32px',
          borderRadius: '16px',
          border: '4px solid #DAA520',
          boxShadow: '0 16px 48px rgba(0,0,0,0.7), inset 0 4px 8px rgba(255,255,255,0.1)',
          maxWidth: '600px',
          width: '90%',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
        <h2 style={{ 
          fontSize: '24px', 
          color: '#FFD700', 
          marginBottom: '8px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
        }}>
          🎯 <Furigana>宝箱クイズ！</Furigana> 🎯
        </h2>
        <p style={{ 
          fontSize: '16px', 
          color: '#87CEEB', 
          marginBottom: '24px' 
        }}>
          <Furigana>正解すると100XPもらえるよ！</Furigana>
        </p>

        <div style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid #444',
          marginBottom: '24px'
        }}>
          <h3 style={{ 
            fontSize: '20px', 
            marginBottom: '20px',
            color: '#FFFFFF'
          }}>
            <Furigana>{quizState.question.question}</Furigana>
          </h3>

          <div style={{ display: 'grid', gap: '12px' }}>
            {quizState.question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '2px solid',
                  borderColor: showResult 
                    ? (index === quizState.question!.correctAnswer 
                        ? '#4CAF50' 
                        : (index === selectedAnswer && !isCorrect 
                            ? '#F44336' 
                            : '#666'))
                    : (selectedAnswer === index ? '#FFD700' : '#666'),
                  backgroundColor: showResult
                    ? (index === quizState.question!.correctAnswer 
                        ? 'rgba(76, 175, 80, 0.3)'
                        : (index === selectedAnswer && !isCorrect 
                            ? 'rgba(244, 67, 54, 0.3)'
                            : 'rgba(0,0,0,0.3)'))
                    : (selectedAnswer === index 
                        ? 'rgba(255, 215, 0, 0.3)' 
                        : 'rgba(0,0,0,0.3)'),
                  color: 'white',
                  cursor: showResult ? 'default' : 'pointer',
                  fontSize: '16px',
                  fontFamily: 'monospace',
                  transition: 'all 0.3s ease',
                  transform: selectedAnswer === index ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showResult ? (
          <div style={{
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: isCorrect ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)',
            border: `2px solid ${isCorrect ? '#4CAF50' : '#F44336'}`,
            marginBottom: '16px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>
              {isCorrect ? '🎉' : '😅'}
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
              {isCorrect ? <Furigana>正解！100XP獲得！</Furigana> : <Furigana>残念！不正解...</Furigana>}
            </div>
            {!isCorrect && (
              <div style={{ fontSize: '14px', color: '#ccc', marginTop: '8px' }}>
                <Furigana>正解</Furigana>: {quizState.question.options[quizState.question.correctAnswer]}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            style={{
              padding: '12px 24px',
              fontSize: '18px',
              backgroundColor: selectedAnswer !== null ? '#4CAF50' : '#666',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              fontWeight: 'bold'
            }}
          >
            {selectedAnswer !== null ? <Furigana>答える！</Furigana> : <Furigana>選択肢を選んでね</Furigana>}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPopup;