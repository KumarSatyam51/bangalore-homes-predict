import { TrendingUp, Building, FileText, Bell } from "lucide-react";
import { Card } from "./ui/card";

const suggestedFeatures = [
  {
    icon: TrendingUp,
    title: "Investment Analysis",
    description: "Get ROI projections and rental yield estimates for properties across Bangalore neighborhoods.",
    badge: "Coming Soon"
  },
  {
    icon: Building,
    title: "Property Comparison",
    description: "Compare multiple properties side-by-side with detailed price breakdowns and value metrics.",
    badge: "New"
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Download comprehensive PDF reports with market analysis, price history, and future projections.",
    badge: "Popular"
  },
  {
    icon: Bell,
    title: "Price Alerts",
    description: "Set custom alerts for specific areas and get notified when prices match your budget.",
    badge: "Coming Soon"
  }
];

const SuggestedFeatures = () => {
  return (
    <section id="suggested-features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
            More Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore More Tools
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover additional features to help you make smarter real estate decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {suggestedFeatures.map((feature, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden p-6 bg-card hover:bg-card/80 border border-border hover:border-accent/40 transition-all duration-300 cursor-pointer hover:shadow-elevated"
            >
              {/* Badge */}
              <span className={`absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full ${
                feature.badge === "New" 
                  ? "bg-green-500/10 text-green-600" 
                  : feature.badge === "Popular"
                  ? "bg-accent/10 text-accent"
                  : "bg-muted text-muted-foreground"
              }`}>
                {feature.badge}
              </span>

              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuggestedFeatures;
