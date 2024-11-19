"use client";
import HeroSection from "@/components/landing-page/HomePage/HeroSection";
import WorkSamples from "@/components/landing-page/HomePage/WorkSamples";
import Services from "@/components/landing-page/HomePage/Services";
import OnlinePayment from "@/components/landing-page/HomePage/OnlinePayment";
import PopularForums from "@/components/landing-page/HomePage/PopularForums";
import Package from "@/components/landing-page/HomePage/Package";
import WeddingPlaner from "@/components/landing-page/HomePage/WeddingPlaner";
import Scan from "@/components/landing-page/HomePage/Scan";
import Search from "@/components/landing-page/HomePage/Search";
import ManagerPanel from "@/components/landing-page/HomePage/ManagerPanel";

import { useLinkConfigs } from "@/hooks/use-link-configs";
import Environment from "@/components/landing-page/HomePage/environment";

function Home() {
  const useLinkConfig = useLinkConfigs();

  return (
    <div className="flex flex-col gap-7 bg-[#F4F1ED]">
      <HeroSection data={useLinkConfig.mainPageData} />
      <Search />
 
      <WorkSamples data={useLinkConfig.mainPageData} />
      <OnlinePayment data={useLinkConfig.mainPageData} />
      <Services data={useLinkConfig.mainPageData} />
      <ManagerPanel data={useLinkConfig.mainPageData} />
      <Environment
        className="max-lg:hidden"
        data={useLinkConfig.mainPageData}
      />
      <PopularForums />
      <Package data={useLinkConfig.mainPageData} />
      <WeddingPlaner data={useLinkConfig.mainPageData} />
      <Scan />
    </div>
  );
}

export default Home;
