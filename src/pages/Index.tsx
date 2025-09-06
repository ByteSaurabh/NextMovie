import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MovieGrid from "@/components/MovieGrid";
import AIAssistant from "@/components/AIAssistant";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <MovieGrid />
      <AIAssistant />
    </div>
  );
};

export default Index;