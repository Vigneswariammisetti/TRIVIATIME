
import { renderLanding } from './landing';
import { renderAuth } from './auth';

import { renderRoomCreation, renderRoomList, renderJoinRoom } from './room';
import { renderTriviaGame, renderWordPuzzleGame, renderNumberChallengeGame } from './games';
import { renderHostScreen, renderParticipantScreen, renderLeaderboard } from './live';

export function renderApp(root) {
  // Simple router/menu for demonstration
  function showMenu() {
    root.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
        <h1 class="text-4xl font-bold mb-6 text-indigo-800">TriviaTime</h1>
        <div class="flex flex-col gap-4 w-full max-w-xs">
          <button id="createRoomBtn" class="bg-green-600 text-white py-2 rounded hover:bg-green-700">Create Room</button>
          <button id="listRoomsBtn" class="bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700">List Rooms</button>
          <button id="joinRoomBtn" class="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Join Room</button>
          <button id="logoutBtn" class="bg-gray-400 text-white py-2 rounded hover:bg-gray-500">Logout</button>
        </div>
      </div>
    `;
    document.getElementById('createRoomBtn').onclick = () => renderRoomCreation(root, () => showMenu());
    document.getElementById('listRoomsBtn').onclick = () => renderRoomList(root, (code) => renderJoinRoom(root, (room) => {
      const userId = localStorage.getItem('userId');
      if (room.hostId === userId) {
        renderHostScreen(root, room, showMenu);
      } else {
        renderParticipantScreen(root, room, showMenu);
      }
    }));
    document.getElementById('joinRoomBtn').onclick = () => renderJoinRoom(root, (room) => {
      const userId = localStorage.getItem('userId');
      if (room.hostId === userId) {
        renderHostScreen(root, room, showMenu);
      } else {
        renderParticipantScreen(root, room, showMenu);
      }
    });
    document.getElementById('logoutBtn').onclick = () => {
      localStorage.removeItem('userId');
      renderLanding(root);
    };
  }

  // Check for a logged-in user (placeholder, should use Firebase auth state)
  const userId = localStorage.getItem('userId');
  if (userId) {
    showMenu();
  } else {
    renderLanding(root);
  }
}
