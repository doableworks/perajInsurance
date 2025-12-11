import ParallaxScroll from "@/animations/ParallaxWrapper";
import TransitionHorizontal from "@/animations/TransitionHorizontal";
import TransitionVertical from "@/animations/TransitionVertical";
import CustomButton from "@/components/CustomButton";
import Navbar from "@/components/Navbar";
import LegacyCarousel from "@/components/pagespecific/homepage/LegacyCarousel";
import StatsSection from "@/components/pagespecific/homepage/StatsSection";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import React from "react";

function page() {
  return (
    <main>
      <Navbar />
      <ParallaxScroll>
        <section className="relative flex flex-col-reverse items-start justify-bottom relative min-h-[92vh]">
          <Image
            src="/Hero.png"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            fill
          />
          <div className="bg-gradient-to-t from-[#001D2D] to-transparent h-[60vh] w-full z-50 absolute bottom-0" />

          <div className="text-text-secondary z-50 relative text-center py-24 w-full max-w-7xl mx-auto">
            <TransitionVertical>
              <h1 className="text-5xl leading-tight md:leading-snug text-left">
                <TextGenerateEffect
                  words="Insurance solutions that understand"
                  duration={1}
                  className="text-5xl font-normal"
                />
                <TextGenerateEffect
                  words="businesses and the people behind them."
                  duration={1}
                  className="text-5xl font-normal"
                />
              </h1>
              <div className="w-full h-[1px] my-10 bg-white/70"></div>
              <div className="w-full flex items-center justify-between">
                <p className="text-left text-lg md:text-xl w-1/2">
                  A trusted partner for companies seeking well-structured,
                  <br />
                  carefully negotiated insurance programs.
                </p>
                <CustomButton
                  text="Explore Our Expertise"
                  variant="secondary"
                />
              </div>
            </TransitionVertical>
          </div>
        </section>
      </ParallaxScroll>
      <section className="w-full mx-auto my-20 py-24 relative z-50 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="px-6 py-2 bg-primary-foreground text-text-primary text-sm font-medium rounded-sm transition-colors duration-300 flex items-center w-fit">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            Why Peraj
          </div>
          <div className="w-full flex items-center justify-between mt-4 flex-1">
            <h2 className="text-5xl leading-tight md:leading-snug text-left flex-[0.4]">
              <TransitionHorizontal>In the numbers</TransitionHorizontal>
            </h2>
            <div className="text-left text-lg flex-[0.5] pr-20">
              <TransitionVertical>
                Our growth is built on trust, relationships, and reach. For over
                four decades, Peraj has served clients across India and abroad
                with dedicated teams, strategic presence, and enduring
                partnerships rooted in integrity.
              </TransitionVertical>
            </div>
          </div>
          <StatsSection />
        </div>
      </section>
      <section className="w-full mx-auto mb-20 relative z-50 bg-background">
        <div className="flex flex-col items-start">
          <div className="w-fit ml-24 px-6 py-2 bg-primary-foreground text-text-primary text-sm font-medium rounded-sm transition-colors duration-300 flex items-center w-fit mb-8">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            Legacy
          </div>
          <div className=" max-w-7xl  mx-auto w-full flex items-center justify-between mb-12">
            <h2 className="text-5xl leading-tight md:leading-snug text-left flex-1">
              <TransitionHorizontal>
                A Legacy Since 1951, Shaping a Global <br/> Insurance Advisory Today
              </TransitionHorizontal>
            </h2>
            <div className="text-left text-lg">
              <TransitionVertical>
                <CustomButton
                  text="Learn More"
                  variant="primary"
                />
              </TransitionVertical>
            </div>
          </div>
          <LegacyCarousel />
        </div>
      </section>
    </main>
  );
}

export default page;
