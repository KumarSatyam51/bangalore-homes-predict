import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PredictionForm from "@/components/PredictionForm";
import Features from "@/components/Features";
import SuggestedFeatures from "@/components/SuggestedFeatures";
import MarketInsights from "@/components/MarketInsights";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <PredictionForm />
      <Features />
      <SuggestedFeatures />
      <MarketInsights />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
