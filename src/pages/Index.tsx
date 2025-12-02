import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ConceptSection } from "@/components/ConceptSection";
import { TechSection } from "@/components/TechSection";
import { DesignSection } from "@/components/DesignSection";
import { HowToPlaySection } from "@/components/HowToPlaySection";
import { AboutSection } from "@/components/AboutSection";
import { PreOrderSection } from "@/components/PreOrderSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProductShowcase />
      <ConceptSection />
      <TechSection />
      <DesignSection />
      <HowToPlaySection />
      <AboutSection />
      <PreOrderSection />
      <Footer />
    </div>
  );
};

export default Index;
