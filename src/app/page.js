import Image from "next/image";
import Banner from "./pages/home/Banner";
import StatsSection from "./pages/home/StatsSection";
import { FeaturedSection } from "./pages/home/FeaturedSection";
import { PopularSection } from "./pages/home/PopularSection";
import { WhyChooseUsSection } from "./pages/home/WhyChooseUsSection";
import { NewsletterSection } from "./pages/home/NewsletterSection";



export default function Home() {
  return (
    <div>
     <Banner />
     <StatsSection />
     <FeaturedSection />
     <PopularSection />
     <WhyChooseUsSection />
     <NewsletterSection />
    </div>
  );
}
