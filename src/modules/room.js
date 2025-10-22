import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export async function createRoom({ name, type, difficulty, timeLimit, hostId }) {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const room = {
    name,
    type,
    difficulty,
    timeLimit,
    hostId,
    code,
    createdAt: Date.now(),
    status: 'waiting',
    participants: [hostId],
  };
  console.log('[Room] Creating room:', room);
  const docRef = await addDoc(collection(db, 'rooms'), room);
  console.log('[Room] Room created with ID:', docRef.id);
  return { ...room, id: docRef.id };
}

export async function getRoomByCode(code) {
  console.log('[Room] Searching for room with code:', code);
  const q = query(collection(db, 'rooms'), where('code', '==', code));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    console.log('[Room] No room found for code:', code);
    return null;
  }
  const doc = snapshot.docs[0];
  console.log('[Room] Room found:', doc.id, doc.data());
  return { id: doc.id, ...doc.data() };
}

export async function listRooms() {
  console.log('[Room] Listing all rooms');
  const snapshot = await getDocs(collection(db, 'rooms'));
  const rooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log('[Room] Rooms found:', rooms);
  return rooms;
}

export function renderRoomCreation(root, onRoomCreated) {
  root.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-200">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-green-700">Create Game Room</h2>
        <form id="roomForm" class="flex flex-col gap-4">
          <input type="text" id="roomName" placeholder="Room Name" class="border p-2 rounded" required />
          <select id="gameType" class="border p-2 rounded" required>
            <option value="trivia">Trivia</option>
            <option value="word">Word Puzzle</option>
            <option value="number">Number Challenge</option>
          </select>
          <select id="difficulty" class="border p-2 rounded" required>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <input type="number" id="timeLimit" placeholder="Time Limit (seconds)" class="border p-2 rounded" min="10" max="600" required />
          <button type="submit" class="bg-green-600 text-white py-2 rounded hover:bg-green-700">Create Room</button>
        </form>
        <div id="roomError" class="text-red-500 mt-2 text-center"></div>
      </div>
    </div>
  `;
  document.getElementById('roomForm').onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('roomName').value;
    const type = document.getElementById('gameType').value;
    const difficulty = document.getElementById('difficulty').value;
    const timeLimit = parseInt(document.getElementById('timeLimit').value, 10);
    const hostId = localStorage.getItem('userId'); // Replace with actual user id from auth
    const errorDiv = document.getElementById('roomError');
    errorDiv.textContent = '';
    console.log('[Room] Submitting room creation form:', { name, type, difficulty, timeLimit, hostId });
    try {
      const room = await createRoom({ name, type, difficulty, timeLimit, hostId });
      console.log('[Room] Room successfully created:', room);
      if (onRoomCreated) onRoomCreated(room);
    } catch (err) {
      console.error('[Room] Error creating room:', err);
      errorDiv.textContent = err.message;
    }
  };
}

export function renderRoomList(root, onJoinRoom) {
  root.innerHTML = `<div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-green-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-2xl">
      <h2 class="text-2xl font-bold mb-6 text-center text-yellow-700">Available Game Rooms</h2>
      <div id="roomsContainer" class="flex flex-col gap-4"></div>
      <button id="refreshRooms" class="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">Refresh</button>
    </div>
  </div>`;
  async function loadRooms() {
    const rooms = await listRooms();
    const container = document.getElementById('roomsContainer');
    container.innerHTML = rooms.length ? rooms.map(room => `
      <div class="flex justify-between items-center border p-4 rounded">
        <div>
          <div class="font-bold text-lg">${room.name}</div>
          <div class="text-sm text-gray-600">Type: ${room.type}, Difficulty: ${room.difficulty}, Code: <span class="font-mono">${room.code}</span></div>
        </div>
        <button class="joinRoomBtn px-4 py-1 bg-green-500 text-white rounded" data-code="${room.code}">Join</button>
      </div>
    `).join('') : '<div class="text-center text-gray-500">No rooms available.</div>';
    document.querySelectorAll('.joinRoomBtn').forEach(btn => {
      btn.onclick = () => onJoinRoom(btn.getAttribute('data-code'));
    });
  }
  loadRooms();
  document.getElementById('refreshRooms').onclick = loadRooms;
}

export function renderJoinRoom(root, onRoomJoined) {
  root.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-bold mb-6 text-center text-indigo-700">Join Game Room</h2>
        <form id="joinForm" class="flex flex-col gap-4">
          <input type="text" id="roomCode" placeholder="Enter Room Code" class="border p-2 rounded uppercase" maxlength="6" required />
          <button type="submit" class="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Join Room</button>
        </form>
        <div id="joinError" class="text-red-500 mt-2 text-center"></div>
      </div>
    </div>
  `;
  document.getElementById('joinForm').onsubmit = async (e) => {
    e.preventDefault();
    const code = document.getElementById('roomCode').value.trim().toUpperCase();
    const errorDiv = document.getElementById('joinError');
    errorDiv.textContent = '';
    try {
      const room = await getRoomByCode(code);
      if (!room) throw new Error('Room not found');
      if (onRoomJoined) onRoomJoined(room);
    } catch (err) {
      errorDiv.textContent = err.message;
    }
  };
}
