import { db } from '../firebase';
import { doc, updateDoc, onSnapshot, arrayUnion } from 'firebase/firestore';
import { renderTriviaGame, renderWordPuzzleGame, renderNumberChallengeGame } from './games';

export function renderHostScreen(root, room, onEnd) {
  root.innerHTML = `<div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
    <h2 class="text-2xl font-bold mb-4 text-green-700">Host Game: ${room.name}</h2>
    <div class="mb-2">Room Code: <span class="font-mono">${room.code}</span></div>
    <button id="startGameBtn" class="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">Start Game</button>
    <button id="endGameBtn" class="mt-2 px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">End</button>
    <div id="participants" class="mt-6"></div>
  </div>`;
  document.getElementById('startGameBtn').onclick = async () => {
    await updateDoc(doc(db, 'rooms', room.id), { status: 'started' });
  };
  document.getElementById('endGameBtn').onclick = onEnd;
  // Live participant list
  onSnapshot(doc(db, 'rooms', room.id), (snap) => {
    const data = snap.data();
    if (!data) {
      document.getElementById('participants').innerHTML = `<div class='text-red-500'>Room not found or deleted.</div>`;
      return;
    }
    document.getElementById('participants').innerHTML = `<div class='font-bold mb-2'>Participants:</div>${(data.participants||[]).map(p => `<div>${p}</div>`).join('')}`;
    if (data.status === 'started') {
      if (room.type === 'trivia') renderTriviaGame(root, room, onEnd);
      else if (room.type === 'word') renderWordPuzzleGame(root, room, onEnd);
      else if (room.type === 'number') renderNumberChallengeGame(root, room, onEnd);
    }
  });
}

export function renderParticipantScreen(root, room, onEnd) {
  // Join room as participant
  updateDoc(doc(db, 'rooms', room.id), { participants: arrayUnion(localStorage.getItem('userId')) });
  onSnapshot(doc(db, 'rooms', room.id), (snap) => {
    const data = snap.data();
    if (!data) {
      root.innerHTML = `<div class='flex flex-col items-center justify-center min-h-screen'><h2 class='text-xl font-bold mb-4 text-red-500'>Room not found or deleted.</h2><button id='leaveBtn' class='mt-6 px-4 py-2 bg-gray-400 text-white rounded'>Back</button></div>`;
      document.getElementById('leaveBtn').onclick = onEnd;
      return;
    }
    if (data.status === 'started') {
      if (room.type === 'trivia') renderTriviaGame(root, room, onEnd);
      else if (room.type === 'word') renderWordPuzzleGame(root, room, onEnd);
      else if (room.type === 'number') renderNumberChallengeGame(root, room, onEnd);
    } else {
      root.innerHTML = `<div class='flex flex-col items-center justify-center min-h-screen'><h2 class='text-xl font-bold mb-4'>Waiting for host to start...</h2><div>Room: <span class='font-mono'>${room.code}</span></div><button id='leaveBtn' class='mt-6 px-4 py-2 bg-gray-400 text-white rounded'>Leave</button></div>`;
      document.getElementById('leaveBtn').onclick = onEnd;
    }
  });
}

export function renderLeaderboard(root, scores, onBack) {
  root.innerHTML = `<div class='flex flex-col items-center justify-center min-h-screen'><h2 class='text-2xl font-bold mb-4'>Leaderboard</h2><div class='w-full max-w-md'>${scores.map((s, i) => `<div class='flex justify-between p-2 border-b'><span>${i+1}. ${s.name}</span><span>${s.score}</span></div>`).join('')}</div><button id='backBtn' class='mt-6 px-4 py-2 bg-indigo-600 text-white rounded'>Back</button></div>`;
  document.getElementById('backBtn').onclick = onBack;
}
