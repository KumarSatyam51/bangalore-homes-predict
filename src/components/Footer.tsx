import { Home, Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Home className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                BangaloreHomes
              </span>
            </div>
            <p className="text-background/60 max-w-sm mb-6">
              AI-powered house price prediction for Bangalore real estate. Make informed decisions with data-driven insights.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#predict" className="text-background/60 hover:text-accent transition-colors">Price Predictor</a></li>
              <li><a href="#features" className="text-background/60 hover:text-accent transition-colors">Features</a></li>
              <li><a href="#insights" className="text-background/60 hover:text-accent transition-colors">Market Insights</a></li>
              <li><a href="#how-it-works" className="text-background/60 hover:text-accent transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/60 hover:text-accent transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-background/60 hover:text-accent transition-colors">Dataset (Kaggle)</a></li>
              <li><a href="#" className="text-background/60 hover:text-accent transition-colors">Model Accuracy</a></li>
              <li><a href="#" className="text-background/60 hover:text-accent transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/40 text-sm">
              © 2024 BangaloreHomes. All rights reserved.
            </p>
            <p className="text-background/40 text-sm">
              Data sourced from Kaggle Bangalore House Price Dataset
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
