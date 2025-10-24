# TriviaTime

TriviaTime is a multiplayer gaming platform where users can create and host their own game rooms. The platform offers a variety of interactive games, including trivia, word puzzles, and number challenges. Users can compete in real-time with friends or other players, enjoying live game hosting, scoring, and leaderboards.

## Features
- User Authentication (Firebase)
- Game Room Creation & Management
- Trivia, Word Puzzle, and Number Challenge Games
- Real-time Gameplay & Scoring
- Live Leaderboards
- Responsive Design

## Tech Stack
- Frontend: HTML, CSS, JavaScript, TailwindCSS
- Backend: Firebase (Authentication, Firestore, Realtime Database)
- Hosting: Vercel/Netlify



## Recommended: Run with Docker
1. Build and run with Docker Compose:
	```
	docker compose up --build
	```
2. Open [http://localhost:5173](http://localhost:5173) in your browser.
3. All development and testing can be done inside Docker. Code changes are reflected live if you use the provided volume mount.

## (Optional) Local Development
If you prefer, you can still run locally:
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`

## Troubleshooting
- If you cannot access the app in Docker, make sure Vite runs with `--host` and port 5173 is exposed.
- For network issues during build, check your internet connection or proxy settings.
- For Firebase errors, ensure your Firebase config and Firestore rules are correct.

## Project Structure
- `src/` - Application source code
- `public/` - Static assets

## Deployment
- Deploy to Vercel, Netlify, or Firebase Hosting.
- For Docker, use a production build and serve with a static server (e.g., `serve` or Nginx) for best performance.

---

For more details, see the [project board](https://miro.com/app/board/uXjVLrhGiFk=/?share_link_id=849619079111).
