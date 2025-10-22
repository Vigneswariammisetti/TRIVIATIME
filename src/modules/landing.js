export function renderLanding(root) {
  root.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-200">
      <h1 class="text-5xl font-bold mb-4 text-indigo-800">TriviaTime</h1>
      <p class="mb-8 text-lg text-gray-700 max-w-xl text-center">
        Multiplayer platform for trivia, word puzzles, and number challenges. Create or join game rooms, compete in real-time, and climb the leaderboards!
      </p>
      <div class="flex gap-4">
        <button id="loginBtn" class="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Login</button>
        <button id="signupBtn" class="px-6 py-2 bg-white border border-indigo-600 text-indigo-700 rounded hover:bg-indigo-50">Sign Up</button>
      </div>
    </div>
  `;
  import('../modules/auth').then(({ renderAuth }) => {
    document.getElementById('loginBtn').onclick = () => {
      renderAuth(root, 'login');
    };
    document.getElementById('signupBtn').onclick = () => {
      renderAuth(root, 'register');
    };
  });
}
