import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Create user document in MongoDB if not exists
      const userId = auth.currentUser?.uid;
      if (userId) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, { method: "POST" });
      }
      navigate("/home", { replace: true }); // Redirect to Index.tsx
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form onSubmit={handleLogin} className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-md border border-blue-200">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">Sign In to Your Account</h2>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-blue-600">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="text-black w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-blue-600">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="text-black w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        {error && <div className="text-red-500 mb-4 text-center font-medium">{error}</div>}
        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition">Login</button>
        <div className="mt-6 text-center text-sm text-blue-500">
          Don't have an account? <span className="underline cursor-pointer" onClick={() => navigate('/register')}>Register</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
