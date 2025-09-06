import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProtectedRoute from "@/components/ProtectedRoute";
import GuestRoute from "@/components/GuestRoute";
import NotFound from "./pages/NotFound";
import Trending from "./pages/Trending";
import MovieDetails from "./pages/MovieDetails";
import WatchedMovies from "./pages/WatchedMovies";
import Favourites from "./pages/Favourites";
import Navigation from "@/components/Navigation";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={
              <GuestRoute>
                <LandingPage />
              </GuestRoute>
            } />
            <Route path="/register" element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            } />
            <Route path="/login" element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            } />
            <Route path="/home" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/trending" element={
              <ProtectedRoute>
                <Trending />
              </ProtectedRoute>
            } />
            <Route path="/movie/:id" element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            } />
            <Route path="/watched-movies" element={
              <ProtectedRoute>
                <WatchedMovies />
              </ProtectedRoute>
            } />
            <Route path="/favourites" element={
              <ProtectedRoute>
                <Favourites />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
