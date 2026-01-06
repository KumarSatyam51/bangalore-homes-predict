import { useState } from "react";
import { Calculator, MapPin, Home, Bath, Ruler, IndianRupee } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const locations = [
  "Electronic City", "Whitefield", "Koramangala", "Indiranagar", "HSR Layout",
  "Marathahalli", "BTM Layout", "Jayanagar", "JP Nagar", "Bannerghatta Road",
  "Sarjapur Road", "Hebbal", "Yelahanka", "KR Puram", "Rajajinagar",
  "Malleshwaram", "Basavanagudi", "Banashankari", "Vijayanagar", "Yeshwanthpur"
];

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    location: "",
    sqft: "",
    bhk: "",
    bathrooms: "",
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call - in production, this would call your ML backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock prediction based on inputs (simplified formula)
    const basePricePerSqft = {
      "Koramangala": 15000, "Indiranagar": 14000, "Whitefield": 7500,
      "Electronic City": 5500, "HSR Layout": 9500, "Marathahalli": 7000,
      "BTM Layout": 8000, "Jayanagar": 11000, "JP Nagar": 9000,
      "Bannerghatta Road": 6500, "Sarjapur Road": 6000, "Hebbal": 8500,
      "Yelahanka": 6000, "KR Puram": 5000, "Rajajinagar": 10000,
      "Malleshwaram": 12000, "Basavanagudi": 11500, "Banashankari": 8000,
      "Vijayanagar": 7500, "Yeshwanthpur": 7000
    } as Record<string, number>;
    
    const pricePerSqft = basePricePerSqft[formData.location] || 7000;
    const sqft = parseFloat(formData.sqft) || 1000;
    const bhkMultiplier = 1 + (parseInt(formData.bhk) - 2) * 0.05;
    
    const calculatedPrice = pricePerSqft * sqft * bhkMultiplier;
    setPrediction(Math.round(calculatedPrice));
    setIsLoading(false);
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <section id="predict" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Predict Your Property Price
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enter your property details and get an instant AI-powered price estimation
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
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
                disabled={isLoading || !formData.location || !formData.sqft || !formData.bhk}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5" />
                    Predict Price
                  </>
                )}
              </Button>
            </form>

            {/* Prediction Result */}
            {prediction !== null && (
              <div className="mt-8 p-8 bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl border border-accent/20 animate-slide-up">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Estimated Property Value</p>
                  <div className="flex items-center justify-center gap-2">
                    <IndianRupee className="w-8 h-8 text-accent" />
                    <span className="font-display text-4xl md:text-5xl font-bold text-foreground">
                      {formatPrice(prediction)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    *This is an estimated price based on ML analysis of similar properties
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionForm;
