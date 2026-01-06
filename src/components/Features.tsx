import { Brain, Shield, Zap, BarChart3, MapPin, Clock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Predictions",
    description: "Advanced machine learning models trained on 13,000+ real Bangalore property transactions from Kaggle dataset."
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get accurate price estimates in seconds, not days. No waiting for manual appraisals."
  },
  {
    icon: MapPin,
    title: "Location Intelligence",
    description: "Covers 200+ Bangalore localities with hyperlocal pricing insights and neighborhood analysis."
  },
  {
    icon: BarChart3,
    title: "Market Trends",
    description: "Understand price trends and make data-driven decisions with historical analysis."
  },
  {
    icon: Shield,
    title: "Accurate & Reliable",
    description: "94% accuracy rate validated against real market transactions and expert appraisals."
  },
  {
    icon: Clock,
    title: "Real-Time Data",
    description: "Regularly updated models reflecting the latest Bangalore real estate market conditions."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Our Predictor?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built with cutting-edge technology to give you the most accurate property valuations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border hover:border-accent/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
