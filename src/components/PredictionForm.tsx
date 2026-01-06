import { useState } from "react";
import { Calculator, MapPin, Home, Bath, Ruler, IndianRupee, TrendingUp, TrendingDown, Minus, Lightbulb, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const locations = [
  "Whitefield", "Electronic City", "Koramangala", "HSR Layout", "Marathahalli",
  "Sarjapur Road", "Hebbal", "Yelahanka", "JP Nagar", "Bannerghatta Road",
  "Indiranagar", "Jayanagar", "BTM Layout", "Bellandur", "KR Puram"
];

interface PredictionResult {
  predictedPrice: number;
  priceRange: { min: number; max: number };
  confidence: number;
  insights: string[];
  recommendation: string;
  marketAnalysis: string;
}

interface LocationData {
  avgPricePerSqft: number;
  trend: string;
  demandLevel: string;
}

const PredictionForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    location: "",
    sqft: "",
    bhk: "",
    bathrooms: "",
  });
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPrediction(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('predict-price', {
        body: {
          location: formData.location,
          area: parseFloat(formData.sqft),
          bhk: parseInt(formData.bhk),
          bathrooms: parseInt(formData.bathrooms),
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setPrediction(data.prediction);
      setLocationData(data.locationData);
      
      toast({
        title: "Prediction Complete!",
        description: "AI has analyzed your property details",
      });
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Prediction Failed",
        description: error instanceof Error ? error.message : "Unable to get prediction",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'falling': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <section id="predict" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI-Powered Price Prediction
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get instant, accurate property valuations using our trained ML model backed by real Bangalore market data
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-3xl shadow-elevated p-8 md:p-12 border border-border">
            <form onSubmit={handlePredict} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div className="space-y-3">
                  <Label htmlFor="location" className="flex items-center gap-2 text-foreground font-medium">
                    <MapPin className="w-4 h-4 text-accent" />
                    Location
                  </Label>
                  <Select 
                    value={formData.location} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger className="h-12 bg-secondary/50 border-border">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(loc => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Area */}
                <div className="space-y-3">
                  <Label htmlFor="sqft" className="flex items-center gap-2 text-foreground font-medium">
                    <Ruler className="w-4 h-4 text-accent" />
                    Total Area (sq.ft)
                  </Label>
                  <Input
                    id="sqft"
                    type="number"
                    placeholder="e.g., 1200"
                    value={formData.sqft}
                    onChange={(e) => setFormData(prev => ({ ...prev, sqft: e.target.value }))}
                    className="h-12 bg-secondary/50 border-border"
                  />
                </div>

                {/* BHK */}
                <div className="space-y-3">
                  <Label htmlFor="bhk" className="flex items-center gap-2 text-foreground font-medium">
                    <Home className="w-4 h-4 text-accent" />
                    BHK (Bedrooms)
                  </Label>
                  <Select 
                    value={formData.bhk} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, bhk: value }))}
                  >
                    <SelectTrigger className="h-12 bg-secondary/50 border-border">
                      <SelectValue placeholder="Select BHK" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num} BHK</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Bathrooms */}
                <div className="space-y-3">
                  <Label htmlFor="bathrooms" className="flex items-center gap-2 text-foreground font-medium">
                    <Bath className="w-4 h-4 text-accent" />
                    Bathrooms
                  </Label>
                  <Select 
                    value={formData.bathrooms} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, bathrooms: value }))}
                  >
                    <SelectTrigger className="h-12 bg-secondary/50 border-border">
                      <SelectValue placeholder="Select bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="xl" 
                className="w-full"
                disabled={isLoading || !formData.location || !formData.sqft || !formData.bhk || !formData.bathrooms}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    AI is Analyzing...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5" />
                    Predict Price with AI
                  </>
                )}
              </Button>
            </form>

            {/* Prediction Result */}
            {prediction && (
              <div className="mt-8 space-y-6 animate-slide-up">
                {/* Main Price */}
                <div className="p-8 bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl border border-accent/20">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">AI Predicted Property Value</p>
                    <div className="flex items-center justify-center gap-2">
                      <IndianRupee className="w-8 h-8 text-accent" />
                      <span className="font-display text-4xl md:text-5xl font-bold text-foreground">
                        {formatPrice(prediction.predictedPrice)}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <span>Range: {formatPrice(prediction.priceRange.min)} - {formatPrice(prediction.priceRange.max)}</span>
                      <span className="px-2 py-1 bg-accent/20 rounded-full text-accent font-medium">
                        {prediction.confidence}% Confidence
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location Stats & Recommendation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locationData && (
                    <div className="p-6 bg-secondary/30 rounded-xl border border-border">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        {formData.location} Market Data
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Avg Price/sqft</span>
                          <span className="font-medium text-foreground">₹{locationData.avgPricePerSqft.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Market Trend</span>
                          <span className="flex items-center gap-1 font-medium capitalize">
                            {getTrendIcon(locationData.trend)}
                            {locationData.trend}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Demand Level</span>
                          <span className="font-medium capitalize text-foreground">{locationData.demandLevel}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-6 bg-secondary/30 rounded-xl border border-border">
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-accent" />
                      AI Recommendation
                    </h4>
                    <p className="text-foreground font-medium mb-3">{prediction.recommendation}</p>
                    <p className="text-sm text-muted-foreground">{prediction.marketAnalysis}</p>
                  </div>
                </div>

                {/* Insights */}
                <div className="p-6 bg-secondary/30 rounded-xl border border-border">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    Key Insights
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {prediction.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  *Prediction powered by AI trained on Bangalore real estate data from Kaggle
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionForm;
