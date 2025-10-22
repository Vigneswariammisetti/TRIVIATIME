import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export function renderAuth(root, mode = 'login') {
  root.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-200">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-bold mb-6 text-center text-indigo-700">${mode === 'login' ? 'Login' : mode === 'register' ? 'Sign Up' : 'Reset Password'}</h2>
        <form id="authForm" class="flex flex-col gap-4">
          <input type="email" id="email" placeholder="Email" class="border p-2 rounded" required />
          ${mode !== 'reset' ? '<input type="password" id="password" placeholder="Password" class="border p-2 rounded" required />' : ''}
          <button type="submit" class="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">${mode === 'login' ? 'Login' : mode === 'register' ? 'Sign Up' : 'Send Reset Link'}</button>
        </form>
        <div class="mt-4 text-center text-sm">
          ${mode === 'login' ? '<a href="#" id="toRegister" class="text-indigo-600 hover:underline">Create an account</a> | <a href="#" id="toReset" class="text-indigo-600 hover:underline">Forgot password?</a>' : ''}
          ${mode === 'register' ? '<a href="#" id="toLogin" class="text-indigo-600 hover:underline">Already have an account?</a>' : ''}
          ${mode === 'reset' ? '<a href="#" id="toLogin" class="text-indigo-600 hover:underline">Back to login</a>' : ''}
        </div>
        <div id="authError" class="text-red-500 mt-2 text-center"></div>
      </div>
    </div>
  `;

  document.getElementById('authForm').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = mode !== 'reset' ? document.getElementById('password').value : undefined;
    const errorDiv = document.getElementById('authError');
    errorDiv.textContent = '';
    try {
      if (mode === 'login') {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('userId', userCred.user.uid);
        window.location.reload();
      } else if (mode === 'register') {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem('userId', userCred.user.uid);
        window.location.reload();
      } else if (mode === 'reset') {
        await sendPasswordResetEmail(auth, email);
        errorDiv.textContent = 'Password reset email sent!';
      }
    } catch (err) {
      errorDiv.textContent = err.message;
    }
  };

  if (document.getElementById('toRegister')) {
    document.getElementById('toRegister').onclick = (e) => {
      e.preventDefault();
      renderAuth(root, 'register');
    };
  }
  if (document.getElementById('toLogin')) {
    document.getElementById('toLogin').onclick = (e) => {
      e.preventDefault();
      renderAuth(root, 'login');
    };
  }
  if (document.getElementById('toReset')) {
    document.getElementById('toReset').onclick = (e) => {
      e.preventDefault();
      renderAuth(root, 'reset');
    };
  }
}
