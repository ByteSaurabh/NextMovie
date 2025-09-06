import React, { useState, useRef, useEffect } from "react";
import { Search, Bot, User, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const handleLogout = async () => {
    console.log("Logout clicked");
    setLoggingOut(true);
    try {
  // Show logging out popup with more visible color
  const popup = document.createElement('div');
  popup.innerText = 'Logging out...';
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.background = 'linear-gradient(90deg, #06b6d4 0%, #ec4899 100%)'; // cyan to pink gradient
  popup.style.color = '#fff';
  popup.style.padding = '2rem 3rem';
  popup.style.borderRadius = '1rem';
  popup.style.boxShadow = '0 2px 16px rgba(0,0,0,0.25)';
  popup.style.fontSize = '1.5rem';
  popup.style.fontWeight = 'bold';
  popup.style.letterSpacing = '0.05em';
  popup.style.zIndex = '9999';
  document.body.appendChild(popup);
      await signOut(auth);
      console.log("Sign out success");
      setTimeout(() => {
        document.body.removeChild(popup);
        setLoggingOut(false);
        navigate("/");
      }, 1200);
    } catch (e) {
      setLoggingOut(false);
      console.log("Sign out error", e);
      alert("Logout failed. Please try again.");
    }
  };
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-lg flex items-center justify-center">
            <span className="text-deep-space font-bold text-lg">NM</span>
          </div>
          <h1 className="text-2xl font-bold gradient-text">NextMovie</h1>
        </a>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search movies or ask AI..." 
            className="pl-10 glass border-primary/30 focus:border-primary transition-all duration-300"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4 relative">
          <a href="/trending">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </Button>
          </a>
          <a href="/favourites">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Favourites</span>
            </Button>
          </a>
          <a href="/watched-movies">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Watched Movies</span>
            </Button>
          </a>
          {/* Standard Logout Button (visible for logged in users) - rightmost */}
          {!loading && user && (
            <Button className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:from-red-600 hover:to-pink-600 transition ml-4" onClick={handleLogout} disabled={loggingOut}>
              {loggingOut ? 'Logging out...' : 'Logout'}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;