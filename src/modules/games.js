// Trivia, Word Puzzle, and Number Challenge modules

// --- Trivia Game ---
export function renderTriviaGame(root, room, onGameEnd) {
  // Placeholder questions
  const questions = [
    { q: 'What is the capital of France?', a: 'Paris', options: ['Paris', 'London', 'Berlin', 'Rome'] },
    { q: '2 + 2 = ?', a: '4', options: ['3', '4', '5', '6'] },
    { q: 'Who wrote Hamlet?', a: 'Shakespeare', options: ['Shakespeare', 'Dickens', 'Austen', 'Tolkien'] },
  ];
  let current = 0;
  let score = 0;
  function showQuestion() {
    if (current >= questions.length) {
      root.innerHTML = `<div class='flex flex-col items-center justify-center min-h-screen'><h2 class='text-2xl font-bold mb-4'>Game Over!</h2><div>Your score: <span class='font-bold'>${score}</span></div><button id='endBtn' class='mt-6 px-4 py-2 bg-indigo-600 text-white rounded'>Back</button></div>`;
      document.getElementById('endBtn').onclick = onGameEnd;
      return;
    }
    const q = questions[current];
    root.innerHTML = `<div class='flex flex-col items-center justify-center min-h-screen'><h2 class='text-xl font-bold mb-4'>Trivia</h2><div class='mb-4 font-semibold'>${q.q}</div><div class='flex flex-col gap-2 mb-4'>${q.options.map(opt => `<button class='optionBtn px-4 py-2 bg-indigo-100 rounded hover:bg-indigo-300' data-opt='${opt}'>${opt}</button>`).join('')}</div><div>Score: <span class='font-bold'>${score}</span></div></div>`;
    document.querySelectorAll('.optionBtn').forEach(btn => {
      btn.onclick = () => {
        if (btn.getAttribute('data-opt') === q.a) score++;
        current++;
        showQuestion();
      };
    });
  }
  showQuestion();
}

// --- Word Puzzle Game (Word Scramble) ---
export function renderWordPuzzleGame(root, room, onGameEnd) {
  const puzzles = [
    { word: 'banana', scrambled: 'aanban' },
    { word: 'orange', scrambled: 'eonrga' },
    { word: 'grape', scrambled: 'perga' },
  ];
  let current = 0;
  let score = 0;
  function showPuzzle() {
    if (current >= puzzles.length) {
      root.innerHTML = `<div class='flex flex-col items-center justify-center min-h-screen'><h2 class='text-2xl font-bold mb-4'>Game Over!</h2><div>Your score: <span class='font-bold'>${score}</span></div><button id='endBtn' class='mt-6 px-4 py-2 bg-indigo-600 text-white rounded'>Back</button></div>`;
      document.getElementById('endBtn').onclick = onGameEnd;
      return;
    }
    const p = puzzles[current];
    root.innerHTML = `<div class='flex flex-col items-center justify-center min-h-screen'><h2 class='text-xl font-bold mb-4'>Word Scramble</h2><div class='mb-4 font-semibold'>Unscramble: <span class='font-mono'>${p.scrambled}</span></div><form id='wordForm' class='flex gap-2 mb-4'><input id='guess' class='border p-2 rounded' placeholder='Your guess' autocomplete='off' /><button class='px-4 py-2 bg-indigo-600 text-white rounded' type='submit'>Submit</button></form><div>Score: <span class='font-bold'>${score}</span></div></div>`;
    document.getElementById('wordForm').onsubmit = (e) => {
      e.preventDefault();
      if (document.getElementById('guess').value.trim().toLowerCase() === p.word) score++;
      current++;
      showPuzzle();
    };
  }
  showPuzzle();
}

// --- Number Challenge Game (Simple Math) ---
export function renderNumberChallengeGame(root, room, onGameEnd) {
  const challenges = [
    { q: '5 x 3 = ?', a: '15' },
    { q: '12 / 4 = ?', a: '3' },
    { q: '9 + 8 = ?', a: '17' },
  ];
  let current = 0;
  let score = 0;
  function showChallenge() {
    if (current >= challenges.length) {
      root.innerHTML = `<div class='flex flex-col items-center justify-center min-h-screen'><h2 class='text-2xl font-bold mb-4'>Game Over!</h2><div>Your score: <span class='font-bold'>${score}</span></div><button id='endBtn' class='mt-6 px-4 py-2 bg-indigo-600 text-white rounded'>Back</button></div>`;
      document.getElementById('endBtn').onclick = onGameEnd;
      return;
    }
    const c = challenges[current];
    root.innerHTML = `<div class='flex flex-col items-center justify-center min-h-screen'><h2 class='text-xl font-bold mb-4'>Number Challenge</h2><div class='mb-4 font-semibold'>${c.q}</div><form id='numForm' class='flex gap-2 mb-4'><input id='numGuess' class='border p-2 rounded' placeholder='Answer' autocomplete='off' /><button class='px-4 py-2 bg-indigo-600 text-white rounded' type='submit'>Submit</button></form><div>Score: <span class='font-bold'>${score}</span></div></div>`;
    document.getElementById('numForm').onsubmit = (e) => {
      e.preventDefault();
      if (document.getElementById('numGuess').value.trim() === c.a) score++;
      current++;
      showChallenge();
    };
  }
  showChallenge();
}
