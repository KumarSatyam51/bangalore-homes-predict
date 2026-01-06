import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const topLocations = [
  { name: "Koramangala", avgPrice: "₹15,000/sqft", trend: "up", change: "+8.2%" },
  { name: "Indiranagar", avgPrice: "₹14,000/sqft", trend: "up", change: "+6.5%" },
  { name: "Malleshwaram", avgPrice: "₹12,000/sqft", trend: "stable", change: "+1.2%" },
  { name: "Jayanagar", avgPrice: "₹11,000/sqft", trend: "up", change: "+4.8%" },
  { name: "HSR Layout", avgPrice: "₹9,500/sqft", trend: "up", change: "+7.1%" },
  { name: "BTM Layout", avgPrice: "₹8,000/sqft", trend: "stable", change: "+2.3%" },
];

const priceRanges = [
  { range: "Under ₹50L", percentage: 15 },
  { range: "₹50L - ₹1Cr", percentage: 35 },
  { range: "₹1Cr - ₹2Cr", percentage: 30 },
  { range: "₹2Cr - ₹5Cr", percentage: 15 },
  { range: "Above ₹5Cr", percentage: 5 },
];

const MarketInsights = () => {
  return (
    <section id="insights" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
            Market Data
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Bangalore Real Estate Insights
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Current market trends and pricing data from our analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Locations */}
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">
              Top Locations by Price
            </h3>
            <div className="space-y-4">
              {topLocations.map((location, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{location.name}</p>
                      <p className="text-sm text-muted-foreground">{location.avgPrice}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {location.trend === "up" && (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    )}
                    {location.trend === "down" && (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    {location.trend === "stable" && (
                      <Minus className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className={`text-sm font-medium ${
                      location.trend === "up" ? "text-green-500" : 
                      location.trend === "down" ? "text-red-500" : 
                      "text-muted-foreground"
                    }`}>
                      {location.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Distribution */}
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">
              Price Distribution
            </h3>
            <div className="space-y-6">
              {priceRanges.map((range, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">{range.range}</span>
                    <span className="text-muted-foreground text-sm">{range.percentage}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${range.percentage}%`,
                        background: `linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-accent/10 rounded-xl border border-accent/20">
              <p className="text-sm text-foreground">
                <span className="font-semibold">💡 Insight:</span> The ₹50L-₹1Cr segment dominates the Bangalore market, making up 35% of all transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;
