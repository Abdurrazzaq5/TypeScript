import HeroSection from "@/components/home/hero-section";
import DemoSection from "@/components/home/demo-section";
import HowItWorksSection from "@/components/common/how-it-works-section";
export default function Home() {
  return (
    <div className="relative w-full">
      <div className="flex flex-col">
        <HeroSection/>
        <DemoSection/>
        <HowItWorksSection/>
      </div>
      {/* <PricingSection/> */}
      {/* <CTASection/> */}
    </div> 
  );
}
