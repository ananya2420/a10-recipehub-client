import Image from "next/image";
import Banner from "./pages/home/Banner";
import StatsSection from "./pages/home/StatsSection";

export default function Home() {
  return (
    <div>
     <Banner />
     <StatsSection />
    </div>
  );
}
