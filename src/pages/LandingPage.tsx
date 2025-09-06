import { Play, Sparkles, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-cyan rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-neon-pink rounded-full animate-pulse opacity-80 animation-delay-1000" />
        <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-neon-purple rounded-full animate-pulse opacity-40 animation-delay-2000" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-electric-blue rounded-full animate-pulse opacity-70 animation-delay-1500" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* AI Badge */}
        <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6 ai-pulse">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Powered by Advanced AI</span>
          <Sparkles className="w-4 h-4 text-accent" />
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Next</span>
          <span className="text-glow">Movie</span>
        </h1>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Experience the future of cinema with AI-powered recommendations, 
          <span className="text-primary"> intelligent discovery</span>, and 
          <span className="text-accent"> immersive exploration</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4 min-w-[200px]">
            <Play className="w-5 h-5 mr-2" />
            Start Exploring
          </Button>
          <Button variant="neon" size="lg" className="text-lg px-8 py-4 min-w-[200px]">
            <Zap className="w-5 h-5 mr-2" />
            Ask AI Assistant
          </Button>
            {/* Sign In and Register Buttons */}
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 min-w-[200px]" onClick={() => window.location.href = '/login'}>
              Sign In
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 min-w-[200px]" onClick={() => window.location.href = '/register'}>
              Register
            </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="glass p-4 rounded-lg text-center">
            <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Smart AI</h3>
            <p className="text-sm text-muted-foreground">Gemini-powered recommendations</p>
          </div>
          <div className="glass p-4 rounded-lg text-center">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Personalized</h3>
            <p className="text-sm text-muted-foreground">Tailored to your taste</p>
          </div>
          <div className="glass p-4 rounded-lg text-center">
            <Zap className="w-8 h-8 text-secondary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Instant</h3>
            <p className="text-sm text-muted-foreground">Real-time discovery</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;