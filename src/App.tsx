import React, { useState, useEffect } from 'react';
import { Home, User, ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import './App.css';

type QuestionType = 'mcq' | 'matching' | 'fillblanks' | 'keyboard';

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  pairs?: { left: string; right: string }[];
  blanks?: string[];
  correctAnswer: string | string[] | { [key: string]: string };
  explanation?: string;
}

interface UserAnswer {
  questionId: number;
  answer: string | string[] | { [key: string]: string };
  isCorrect: boolean;
}

const questionsData: Question[] = [
  {
    id: 1,
    type: 'mcq',
    question: 'Which key is used to delete text to the left of the cursor?',
    options: ['Delete', 'Backspace', 'Enter', 'Space'],
    correctAnswer: 'Backspace',
    explanation: 'Backspace key deletes characters to the left of the cursor.'
  },
  {
    id: 2,
    type: 'mcq',
    question: 'What does Ctrl+C do?',
    options: ['Cut text', 'Copy text', 'Paste text', 'Delete text'],
    correctAnswer: 'Copy text',
    explanation: 'Ctrl+C is the keyboard shortcut for copying text.'
  },
  {
    id: 3,
    type: 'mcq',
    question: 'Which key is used to move to the next line?',
    options: ['Space', 'Tab', 'Enter', 'Shift'],
    correctAnswer: 'Enter',
    explanation: 'Enter key is used to move to the next line.'
  },
  {
    id: 4,
    type: 'mcq',
    question: 'What does Ctrl+Z do?',
    options: ['Copy', 'Paste', 'Undo', 'Cut'],
    correctAnswer: 'Undo',
    explanation: 'Ctrl+Z undoes the last action you performed.'
  },
  {
    id: 5,
    type: 'mcq',
    question: 'Which key makes capital letters?',
    options: ['Ctrl', 'Alt', 'Shift', 'Tab'],
    correctAnswer: 'Shift',
    explanation: 'Shift key is used to make capital letters.'
  },
  {
    id: 6,
    type: 'fillblanks',
    question: 'To copy text, we use _____ + C keys together.',
    blanks: ['Ctrl'],
    correctAnswer: ['Ctrl'],
    explanation: 'Ctrl+C is the keyboard shortcut for copying.'
  },
  {
    id: 7,
    type: 'fillblanks',
    question: 'The _____ key is used to delete characters to the right of the cursor.',
    blanks: ['Delete'],
    correctAnswer: ['Delete'],
    explanation: 'Delete key removes characters to the right of the cursor.'
  },
  {
    id: 8,
    type: 'fillblanks',
    question: 'To paste copied text, we use Ctrl + _____ keys.',
    blanks: ['V'],
    correctAnswer: ['V'],
    explanation: 'Ctrl+V is the keyboard shortcut for pasting.'
  },
  {
    id: 9,
    type: 'fillblanks',
    question: 'The _____ key creates spaces between words.',
    blanks: ['Space'],
    correctAnswer: ['Space'],
    explanation: 'Space bar creates spaces between words.'
  },
  {
    id: 10,
    type: 'fillblanks',
    question: 'To select all text, we use _____ + A keys together.',
    blanks: ['Ctrl'],
    correctAnswer: ['Ctrl'],
    explanation: 'Ctrl+A selects all text in a document.'
  },
  {
    id: 11,
    type: 'matching',
    question: 'Match the keyboard shortcuts with their functions:',
    pairs: [
      { left: 'Ctrl+C', right: 'Copy' },
      { left: 'Ctrl+V', right: 'Paste' },
      { left: 'Ctrl+Z', right: 'Undo' },
      { left: 'Ctrl+X', right: 'Cut' }
    ],
    correctAnswer: {
      'Ctrl+C': 'Copy',
      'Ctrl+V': 'Paste',
      'Ctrl+Z': 'Undo',
      'Ctrl+X': 'Cut'
    },
    explanation: 'These are basic keyboard shortcuts for text editing.'
  },
  {
    id: 12,
    type: 'matching',
    question: 'Match the keys with their functions:',
    pairs: [
      { left: 'Enter', right: 'New line' },
      { left: 'Backspace', right: 'Delete left' },
      { left: 'Delete', right: 'Delete right' },
      { left: 'Space', right: 'Add space' }
    ],
    correctAnswer: {
      'Enter': 'New line',
      'Backspace': 'Delete left',
      'Delete': 'Delete right',
      'Space': 'Add space'
    },
    explanation: 'These keys have specific functions for text editing.'
  },
  {
    id: 13,
    type: 'keyboard',
    question: 'Click on the key that is used to make capital letters:',
    options: ['Shift', 'Ctrl', 'Alt', 'Tab'],
    correctAnswer: 'Shift',
    explanation: 'Shift key is used to type capital letters.'
  },
  {
    id: 14,
    type: 'keyboard',
    question: 'Click on the key that deletes text to the left:',
    options: ['Backspace', 'Delete', 'Enter', 'Space'],
    correctAnswer: 'Backspace',
    explanation: 'Backspace key deletes characters to the left of cursor.'
  },
  {
    id: 15,
    type: 'keyboard',
    question: 'Click on the key that creates spaces:',
    options: ['Space', 'Tab', 'Enter', 'Shift'],
    correctAnswer: 'Space',
    explanation: 'Space bar creates spaces between words.'
  },
  {
    id: 16,
    type: 'keyboard',
    question: 'Click on the key that moves to next line:',
    options: ['Enter', 'Tab', 'Shift', 'Ctrl'],
    correctAnswer: 'Enter',
    explanation: 'Enter key moves the cursor to the next line.'
  },
  {
    id: 17,
    type: 'keyboard',
    question: 'Click on the key used with other keys for shortcuts:',
    options: ['Ctrl', 'Space', 'Enter', 'Backspace'],
    correctAnswer: 'Ctrl',
    explanation: 'Ctrl key is used with other keys to make shortcuts.'
  },
  {
    id: 18,
    type: 'mcq',
    question: 'What happens when you press Ctrl+A?',
    options: ['Copy all', 'Select all', 'Delete all', 'Paste all'],
    correctAnswer: 'Select all',
    explanation: 'Ctrl+A selects all text in the current document.'
  },
  {
    id: 19,
    type: 'mcq',
    question: 'Which key combination cuts text?',
    options: ['Ctrl+C', 'Ctrl+V', 'Ctrl+X', 'Ctrl+Z'],
    correctAnswer: 'Ctrl+X',
    explanation: 'Ctrl+X cuts the selected text.'
  },
  {
    id: 20,
    type: 'mcq',
    question: 'What is the function of the Tab key?',
    options: ['Delete text', 'Move cursor', 'Add spaces', 'Copy text'],
    correctAnswer: 'Add spaces',
    explanation: 'Tab key adds multiple spaces to indent text.'
  }
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'subjects' | 'questionTypes' | 'quiz' | 'results'>('splash');
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType | 'all'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedLeftItem, setSelectedLeftItem] = useState<string | null>(null);
  const [matchingAnswers, setMatchingAnswers] = useState<{ [key: string]: string }>({});

  const filteredQuestions = selectedQuestionType === 'all' 
    ? questionsData 
    : questionsData.filter(q => q.type === selectedQuestionType);

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('subjects');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleAnswer = (answer: string | string[] | { [key: string]: string }) => {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const isCorrect = checkAnswer(currentQuestion, answer);
    
    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      isCorrect
    };

    const existingAnswerIndex = userAnswers.findIndex(ua => ua.questionId === currentQuestion.id);
    if (existingAnswerIndex >= 0) {
      const newAnswers = [...userAnswers];
      newAnswers[existingAnswerIndex] = userAnswer;
      setUserAnswers(newAnswers);
    } else {
      setUserAnswers([...userAnswers, userAnswer]);
    }
  };

  const checkAnswer = (question: Question, answer: string | string[] | { [key: string]: string }): boolean => {
    if (question.type === 'matching') {
      const correctAnswer = question.correctAnswer as { [key: string]: string };
      const userAnswer = answer as { [key: string]: string };
      return JSON.stringify(correctAnswer) === JSON.stringify(userAnswer);
    } else if (question.type === 'fillblanks') {
      const correctAnswer = question.correctAnswer as string[];
      const userAnswer = answer as string[];
      return JSON.stringify(correctAnswer.map(a => a.toLowerCase())) === 
             JSON.stringify(userAnswer.map(a => a.toLowerCase()));
    } else {
      return question.correctAnswer === answer;
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetMatchingState();
    } else {
      setCurrentScreen('results');
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      resetMatchingState();
    }
  };

  const resetMatchingState = () => {
    setSelectedLeftItem(null);
    setMatchingAnswers({});
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    resetMatchingState();
    setCurrentScreen('subjects');
  };

  const SplashScreen = () => (
    <div className="splash-screen flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600 text-white">
      <div className="splash-content text-center">
        <h1 className="splash-title text-3xl md:text-4xl font-bold mb-8 animate-fadeInUp">Grade 2 Revisit</h1>
        <div className="loading-dots flex justify-center gap-2">
          <div className="dot w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="dot w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="dot w-3 h-3 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );

  const SubjectScreen = () => (
    <div className="screen-container min-h-screen p-4 md:p-8 bg-gradient-to-br from-indigo-400 to-purple-600">
      <div className="header flex items-center justify-between mb-8">
        <button className="home-btn bg-white/20 rounded-xl p-3 text-white hover:bg-white/30 transition" onClick={() => setCurrentScreen('splash')}>
          <Home size={24} />
        </button>
        <h1 className="screen-title text-2xl md:text-3xl text-white text-center flex-1">Select Subject</h1>
        <button className="user-btn bg-white/20 rounded-xl p-3 text-white hover:bg-white/30 transition ml-2" onClick={() => setShowUserModal(true)}>
          <User size={24} />
        </button>
      </div>
      <div className="subjects-grid grid gap-6 max-w-xs mx-auto">
        <button 
          className="subject-card ict-card bg-gradient-to-br from-blue-300 to-blue-700 text-white rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition"
          onClick={() => setCurrentScreen('questionTypes')}
        >
          <div className="subject-icon text-4xl mb-2">💻</div>
          <h2 className="text-xl font-bold mb-1">ICT</h2>
          <p className="text-sm opacity-80">Information & Communication Technology</p>
        </button>
      </div>
    </div>
  );

  const QuestionTypesScreen = () => (
    <div className="screen-container min-h-screen p-4 md:p-8 bg-gradient-to-br from-indigo-400 to-purple-600">
      <div className="header flex items-center justify-between mb-8">
        <button className="home-btn bg-white/20 rounded-xl p-3 text-white hover:bg-white/30 transition" onClick={() => setCurrentScreen('subjects')}>
          <Home size={24} />
        </button>
        <h1 className="screen-title text-2xl md:text-3xl text-white text-center flex-1">Select Question Type</h1>
      </div>
  <div className="question-types-grid grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto items-center justify-center">
        <button 
          className="type-card all-card flex flex-col items-center justify-center border-4 border-fuchsia-600 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 rounded-full shadow-2xl hover:scale-110 transition transform duration-200" style={{ height: '180px', width: '180px' }}
          onClick={() => {
            setSelectedQuestionType('all');
            setCurrentScreen('quiz');
          }}
        >
          <div className="type-icon text-3xl mb-2">📚</div>
          <div className="type-icon text-5xl mb-3 drop-shadow-lg">📚</div>
          <h3 className="text-xl font-extrabold mb-1 text-white drop-shadow">All Questions</h3>
          {/* removed description for cleaner look */}
        </button>
        <button 
          className="type-card mcq-card border-t-4 border-green-500 bg-white rounded-xl p-6 text-center shadow hover:scale-105 transition" style={{ height: '170px', width: '150px' }}
          onClick={() => {
            setSelectedQuestionType('mcq');
            setCurrentScreen('quiz');
          }}
        >
          <div className="type-icon text-3xl mb-2">✅</div>
          <h3 className="text-lg font-bold mb-1">Multiple Choice</h3>
          {/* removed description for cleaner look */}
        </button>
        <button 
          className="type-card matching-card border-t-4 border-orange-500 bg-white rounded-xl p-6 text-center shadow hover:scale-105 transition" style={{ height: '170px', width: '150px' }}
          onClick={() => {
            setSelectedQuestionType('matching');
            setCurrentScreen('quiz');
          }}
        >
          <div className="type-icon text-3xl mb-2">🔗</div>
          <h3 className="text-lg font-bold mb-1">Matching</h3>
          {/* removed description for cleaner look */}
        </button>
        <button 
          className="type-card fillblanks-card border-t-4 border-yellow-400 bg-white rounded-xl p-6 text-center shadow hover:scale-105 transition" style={{ height: '170px', width: '150px' }}
          onClick={() => {
            setSelectedQuestionType('fillblanks');
            setCurrentScreen('quiz');
          }}
        >
          <div className="type-icon text-3xl mb-2">✏️</div>
          <h3 className="text-lg font-bold mb-1">Fill Blanks</h3>
          {/* removed description for cleaner look */}
        </button>
        <button 
          className="type-card keyboard-card border-t-4 border-indigo-400 bg-white rounded-xl p-6 text-center shadow hover:scale-105 transition" style={{ height: '170px', width: '150px' }}
          onClick={() => {
            setSelectedQuestionType('keyboard');
            setCurrentScreen('quiz');
          }}
        >
          <div className="type-icon text-3xl mb-2">⌨️</div>
          <h3 className="text-lg font-bold mb-1">Keyboard Keys</h3>
          {/* removed description for cleaner look */}
        </button>
      </div>
    </div>
  );

  const QuizScreen = () => {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const currentAnswer = userAnswers.find(ua => ua.questionId === currentQuestion.id);

    const renderQuestion = () => {
      switch (currentQuestion.type) {
        case 'mcq':
          return (
            <div className="mcq-container">
              <div className="options-grid grid gap-4">
                {currentQuestion.options?.map((option, index) => {
                  const isSelected = currentAnswer?.answer === option;
                  const isCorrect = currentAnswer ? checkAnswer(currentQuestion, currentAnswer.answer) : false;
                  return (
                    <button
                      key={index}
                      className={`option-button p-4 rounded-lg shadow-md transition-all flex items-center justify-between gap-2 ${isSelected ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} ${currentAnswer ? (isCorrect ? 'border-2 border-green-500' : 'border-2 border-red-500') : 'border'}`}
                      onClick={() => {
                        if (!currentAnswer) {
                          handleAnswer(option);
                        }
                      }}
                      disabled={!!currentAnswer}
                    >
                      <span className="option-text flex-1 text-left">{option}</span>
                      {currentAnswer && isCorrect && <CheckCircle className="option-icon w-5 h-5 text-green-500" />}
                      {currentAnswer && !isCorrect && <XCircle className="option-icon w-5 h-5 text-red-500" />}
                    </button>
                  );
                })}
              </div>
              {currentAnswer && (
                <div className={`answer-feedback ${currentAnswer.isCorrect ? 'correct' : 'wrong'}`}>
                  {currentAnswer.isCorrect ? '✅ Correct!' : `❌ Correct answer: ${currentQuestion.correctAnswer}`}
                </div>
              )}
            </div>
          );

        case 'fillblanks':
          const [blankAnswers, setBlankAnswers] = useState<string[]>(Array(currentQuestion.blanks?.length || 0).fill(''));
          const handleBlankChange = (value: string, idx: number) => {
            const updated = [...blankAnswers];
            updated[idx] = value;
            setBlankAnswers(updated);
          };
          const submitBlanks = () => {
            if (!currentAnswer) {
              handleAnswer(blankAnswers);
            }
          };
          return (
            <div className="fillblanks-container">
              <div className="blank-inputs flex gap-2 flex-wrap">
                {currentQuestion.blanks?.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    className="blank-input border rounded px-3 py-2 text-lg"
                    placeholder={`Blank ${index + 1}`}
                    value={blankAnswers[index]}
                    onChange={e => handleBlankChange(e.target.value, index)}
                    disabled={!!currentAnswer}
                  />
                ))}
              </div>
              {!currentAnswer && (
                <button className="submit-blanks-btn bg-gradient-to-br from-yellow-400 to-orange-400 text-white rounded-lg px-3 py-1 text-sm font-semibold mt-4 hover:scale-105 transition" onClick={submitBlanks}>
                  Submit
                </button>
              )}
              {currentAnswer && (
                <div className={`answer-feedback ${currentAnswer.isCorrect ? 'correct' : 'wrong'} mt-4`}>
                  {currentAnswer.isCorrect ? '✅ Correct!' : `❌ Correct answer: ${Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer.join(', ') : currentQuestion.correctAnswer}`}
                </div>
              )}
            </div>
          );

        case 'matching':
          // ...existing code...
          return (
            <div className="matching-container">
              {/* ...existing code... */}
            </div>
          );

        case 'keyboard':
          return (
            <div className="keyboard-container">
              <div className="keyboard-options grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
                {currentQuestion.options?.map((option, index) => {
                  const isSelected = currentAnswer?.answer === option;
                  const isCorrect = currentAnswer ? checkAnswer(currentQuestion, currentAnswer.answer) : false;
                  return (
                    <button
                      key={index}
                      className={`keyboard-key p-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 text-lg font-semibold ${isSelected ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'} ${currentAnswer ? (isCorrect ? 'border-2 border-green-500' : 'border-2 border-red-500') : 'border'}`}
                      onClick={() => {
                        if (!currentAnswer) {
                          handleAnswer(option);
                        }
                      }}
                      disabled={!!currentAnswer}
                    >
                      {option}
                      {currentAnswer && isCorrect && <CheckCircle className="option-icon w-5 h-5 text-green-500" />}
                      {currentAnswer && !isCorrect && <XCircle className="option-icon w-5 h-5 text-red-500" />}
                    </button>
                  );
                })}
              </div>
              {currentAnswer && (
                <div className={`answer-feedback ${currentAnswer.isCorrect ? 'correct' : 'wrong'}`}>
                  {currentAnswer.isCorrect ? '✅ Correct!' : `❌ Correct answer: ${currentQuestion.correctAnswer}`}
                </div>
              )}
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className="screen-container min-h-screen p-4 md:p-8 bg-gradient-to-br from-indigo-400 to-purple-600">
        <div className="header flex items-center justify-between mb-6">
          <button className="home-btn bg-white/20 rounded-xl p-3 text-white hover:bg-white/30 transition" onClick={resetQuiz}>
            <Home size={24} />
          </button>
          <button className="user-btn bg-white/20 rounded-xl p-3 text-white hover:bg-white/30 transition ml-2" onClick={() => setShowUserModal(true)}>
            <User size={24} />
          </button>
          <div className="progress-info bg-white/20 px-4 py-2 rounded-full text-white font-semibold">
            <span className="question-counter">
              Question {currentQuestionIndex + 1} of {filteredQuestions.length}
            </span>
          </div>
        </div>

        <div className="progress-bar w-full h-2 bg-white/20 rounded mb-6 overflow-hidden">
          <div 
            className="progress-fill h-full bg-gradient-to-r from-green-400 to-teal-400 rounded transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
          ></div>
        </div>

        <div className="question-container bg-white rounded-2xl p-6 md:p-8 mb-6 shadow min-h-[300px] md:min-h-[400px]">
          <h2 className="question-text text-lg md:text-xl mb-4 text-gray-800 leading-relaxed">{currentQuestion.question}</h2>
          {renderQuestion()}
        </div>

        <div className="navigation-buttons flex flex-col md:flex-row justify-between gap-4">
          <button 
            className="nav-btn prev-btn bg-gradient-to-br from-blue-400 to-blue-700 text-white rounded-xl px-6 py-3 font-semibold flex items-center gap-2 hover:scale-105 transition disabled:bg-gray-300 disabled:opacity-50"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft size={20} />
            Previous
          </button>
          <button 
            className="nav-btn next-btn bg-gradient-to-br from-green-400 to-teal-400 text-white rounded-xl px-6 py-3 font-semibold flex items-center gap-2 hover:scale-105 transition disabled:bg-gray-300 disabled:opacity-50"
            onClick={nextQuestion}
            disabled={!currentAnswer}
          >
            {currentQuestionIndex === filteredQuestions.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  const ResultsScreen = () => {
    const correctAnswers = userAnswers.filter(ua => ua.isCorrect).length;
    const totalQuestions = filteredQuestions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <div className="screen-container min-h-screen p-4 md:p-8 bg-gradient-to-br from-indigo-400 to-purple-600">
        <div className="header flex items-center justify-between mb-8">
          <button className="home-btn bg-white/20 rounded-xl p-3 text-white hover:bg-white/30 transition" onClick={resetQuiz}>
            <Home size={24} />
          </button>
          <h1 className="screen-title text-2xl md:text-3xl text-white text-center flex-1">Results</h1>
        </div>

        <div className="results-summary bg-white rounded-2xl p-8 text-center mb-8 shadow">
          <div className="score-circle w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center mx-auto mb-4 shadow">
            <span className="score-percentage text-2xl font-bold text-white">{percentage}%</span>
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">Great Job! 389</h2>
          <p className="text-base text-gray-600">You got {correctAnswers} out of {totalQuestions} questions correct!</p>
        </div>

        <div className="detailed-results flex flex-col gap-4 mb-8">
          {filteredQuestions.map((question, index) => {
            const userAnswer = userAnswers.find(ua => ua.questionId === question.id);
            return (
              <div key={question.id} className={`result-item bg-white rounded-xl p-4 shadow ${userAnswer?.isCorrect ? 'border-l-4 border-green-400' : 'border-l-4 border-red-400'}`}>
                <div className="result-header flex items-center justify-between mb-2">
                  <span className="question-number bg-blue-400 text-white px-2 py-1 rounded font-semibold text-sm">Q{index + 1}</span>
                  {userAnswer?.isCorrect ? 
                    <CheckCircle className="result-icon correct-icon text-green-400" /> : 
                    <XCircle className="result-icon wrong-icon text-red-400" />
                  }
                </div>
                <p className="result-question font-semibold mb-1 text-gray-800">{question.question}</p>
                <div className="result-answers">
                  <p className="user-answer text-gray-600 text-sm mb-1">
                    Your answer: {JSON.stringify(userAnswer?.answer)}
                  </p>
                  {!userAnswer?.isCorrect && (
                    <p className="correct-answer text-green-500 font-semibold text-sm">
                      Correct answer: {JSON.stringify(question.correctAnswer)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button className="retry-btn bg-gradient-to-br from-purple-400 to-violet-600 text-white rounded-xl px-8 py-4 font-semibold block mx-auto hover:scale-105 transition" onClick={resetQuiz}>
          Try Again
        </button>
      </div>
    );
  };

  const UserModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowUserModal(false)}>
      <div className="relative rounded-3xl shadow-2xl p-8 w-[90vw] max-w-md border-4 border-transparent animate-popIn" style={{background: 'rgba(255,255,255,0.15)', boxShadow: 'rgba(31,38,135,0.37) 0px 8px 32px 0px', border: '2px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)'}} onClick={e => e.stopPropagation()}>
        <div className="absolute inset-0 rounded-3xl pointer-events-none border-4 border-gradient-to-br from-cyan-400 via-blue-400 to-pink-400 animate-gradientMove" style={{zIndex: 0, opacity: 0.7}}></div>
        <button className="absolute top-4 right-4 text-white bg-cyan-700 hover:bg-cyan-900 rounded-full p-2 shadow" aria-label="Close modal" style={{zIndex: 2}} onClick={() => setShowUserModal(false)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-400 flex items-center justify-center text-5xl font-extrabold text-white shadow-lg border-4 border-white/50 animate-bounceIn" style={{boxShadow: 'rgba(34,211,238,0.533) 0px 0px 32px 8px'}}>HK</div>
        <div className="text-2xl font-extrabold text-white text-center mb-1 drop-shadow-lg tracking-wide">Hari Krishna Anem</div>
        <div className="text-base text-cyan-100 font-mono text-center mb-1">+91 9885699666</div>
        <div className="text-base text-cyan-100 font-mono text-center mb-4">anemharikrishna@gmail.com</div>
        <div className="flex flex-col gap-3 w-full mb-2">
          <a href="https://www.linkedin.com/in/anemharikrishna" target="_blank" rel="noopener noreferrer" className="bg-white/80 hover:bg-white text-cyan-900 text-lg font-bold rounded-full px-4 py-2 flex items-center gap-2 justify-center shadow transition-all duration-200 border-2 border-cyan-200 hover:scale-105"><span className="text-xl">🔗</span> LinkedIn</a>
          <a href="https://github.com/HariKrishna-9885699666/" target="_blank" rel="noopener noreferrer" className="bg-white/80 hover:bg-white text-cyan-900 text-lg font-bold rounded-full px-4 py-2 flex items-center gap-2 justify-center shadow transition-all duration-200 border-2 border-cyan-200 hover:scale-105"><span className="text-xl">🐙</span> Github</a>
          <a href="https://harikrishna.netlify.app/" target="_blank" rel="noopener noreferrer" className="bg-white/80 hover:bg-white text-cyan-900 text-lg font-bold rounded-full px-4 py-2 flex items-center gap-2 justify-center shadow transition-all duration-200 border-2 border-cyan-200 hover:scale-105"><span className="text-xl">🌐</span> Portfolio</a>
        </div>
        <div className="text-center mt-4"><span className="text-xs text-white/70 font-mono">Made with <span className="animate-pulse">❤️</span> by Hari Krishna</span></div>
      </div>
    </div>
  );

  return (
    <div className="app">
      {currentScreen === 'splash' && <SplashScreen />}
      {currentScreen === 'subjects' && <SubjectScreen />}
      {currentScreen === 'questionTypes' && <QuestionTypesScreen />}
      {currentScreen === 'quiz' && <QuizScreen />}
      {currentScreen === 'results' && <ResultsScreen />}

      {/* User Modal */}
      {showUserModal && <UserModal />}
    </div>
  );
};

export default App;