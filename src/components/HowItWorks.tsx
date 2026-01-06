import { FileText, Cpu, BarChart2, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Enter Property Details",
    description: "Provide basic information like location, area, BHK, and amenities about your property."
  },
  {
    icon: Cpu,
    number: "02",
    title: "AI Processing",
    description: "Our ML model analyzes your inputs against 13,000+ real Bangalore property records."
  },
  {
    icon: BarChart2,
    number: "03",
    title: "Price Calculation",
    description: "Advanced algorithms factor in location trends, market conditions, and property features."
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Get Your Estimate",
    description: "Receive an accurate price prediction with confidence score and market insights."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-accent/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-accent font-semibold text-sm mb-4">
            Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            How It Works
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Get your property valuation in just 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-accent/50 to-transparent" />
              )}
              
              <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10 hover:border-accent/30 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className="font-display text-3xl font-bold text-accent/40 group-hover:text-accent/60 transition-colors">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-primary-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-primary-foreground/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
