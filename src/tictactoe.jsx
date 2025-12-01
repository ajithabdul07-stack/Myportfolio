import { useState } from 'react';
import { Info } from 'lucide-react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isBoardFull = board.every(square => square !== null);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (isBoardFull) {
      return "It's a Draw!";
    }
    return `Current Player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="relative">
       
        <button
          onClick={() => setShowAbout(!showAbout)}
          className="absolute top-4 right-4 bg-white text-blue-600 p-2 rounded-full hover:bg-gray-100 transition shadow-lg"
        >
          <Info size={24} />
        </button>

      
        {showAbout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Project</h2>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Project Description</h3>
                  <p className="text-sm">A classic Tic Tac Toe game built with modern web technologies. Play against a friend and enjoy a smooth, responsive gaming experience.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Technologies Used</h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li><strong>React:</strong> UI library for building components</li>
                    <li><strong>Hooks (useState):</strong> State management</li>
                    <li><strong>Tailwind CSS:</strong> Utility-first styling</li>
                    <li><strong>Lucide React:</strong> Icons (Info icon)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Features</h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Two-player gameplay (X and O)</li>
                    <li>Winner detection</li>
                    <li>Draw detection</li>
                    <li>Reset game button</li>
                    <li>Real-time status updates</li>
                    <li>Responsive design</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">How to Play</h3>
                  <p className="text-sm">Click on any empty square to make your move. Players alternate between X and O. First player to get three in a row (horizontal, vertical, or diagonal) wins!</p>
                </div>
              </div>

              <button
                onClick={() => setShowAbout(false)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}

      
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Tic Tac Toe</h1>

   
          <div className="mb-6 text-center">
            <p className="text-xl font-semibold text-gray-700">
              {getStatus()}
            </p>
          </div>

      
          <div className="grid grid-cols-3 gap-2 mb-8 bg-gray-200 p-2 rounded-lg">
            {board.map((value, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className="w-24 h-24 bg-white text-4xl font-bold rounded-lg hover:bg-gray-100 transition shadow-md hover:shadow-lg active:scale-95"
              >
                <span className={value === 'X' ? 'text-blue-600' : 'text-red-600'}>
                  {value}
                </span>
              </button>
            ))}
          </div>

        
          <button
            onClick={resetGame}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}