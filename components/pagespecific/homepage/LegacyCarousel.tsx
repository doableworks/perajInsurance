"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { motion, AnimatePresence } from "framer-motion";
import TransitionHorizontal from "@/animations/TransitionHorizontal";
import TransitionVertical from "@/animations/TransitionVertical";

interface LegacyMilestone {
  year: string;
  title: string;
  description: string;
  backgroundImage: string;
}

interface LegacyCarouselProps {
  milestones?: LegacyMilestone[];
}

const defaultMilestones: LegacyMilestone[] = [
  {
    year: "1951",
    title: "Foundation",
    description: "Peraj Insurance Advisory was established with a vision to revolutionize insurance consulting in India.",
    backgroundImage: "/legacy.jpg"
  },
  {
    year: "1975",
    title: "National Expansion",
    description: "Extended our services across major Indian cities, establishing regional offices and building local partnerships.",
    backgroundImage: "/legacy.jpg"
  },
  {
    year: "1990",
    title: "International Partnerships",
    description: "Formed strategic alliances with global insurance brokers, enabling worldwide service capabilities.",
    backgroundImage: "/legacy.jpg"
  },
  {
    year: "2000",
    title: "Digital Transformation",
    description: "Pioneered digital insurance advisory services, setting new industry standards for client engagement.",
    backgroundImage: "/legacy.jpg"
  },
  {
    year: "2024",
    title: "Global Leadership",
    description: "Today, Peraj stands as a trusted partner serving clients across 150+ countries with innovative solutions.",
    backgroundImage: "/legacy.jpg"
  }
];

function LegacyTimeline({ 
  milestones, 
  currentIndex, 
  totalItems, 
  onYearClick 
}: {
  milestones: LegacyMilestone[];
  currentIndex: number;
  totalItems: number;
  onYearClick?: (index: number) => void;
}) {
  let progressPercentage = 0;
  if (totalItems > 0) {
    if (currentIndex === totalItems - 1) {
      progressPercentage = 100;
    } else {
      progressPercentage = (currentIndex / totalItems) * 100;
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
        mass: 0.8
      }
    }
  };

  const activeItemVariants = {
    hidden: { scale: 1 },
    visible: { 
      scale: 1.1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
        mass: 0.6
      }
    }
  };

  return (
    <div className="w-full space-y-6 lg:space-y-0 z-[10] lg:max-w-7xl lg:mx-auto">
      {/* Years display - Desktop */}
      <div className="hidden lg:flex items-end w-full bg-white/70 rounded-t-lg py-2 border-t-[1px] border-black/20 border-l-[1px] border-r-[1px] border-l-black/20 border-r-black/20">
        <div className="flex justify-between items-center w-full">
          {milestones.map((milestone, idx) => {
            const isActive = idx === currentIndex;
            
            return (
              <motion.div
                key={`milestone-${milestone.year}-${idx}`}
                className={`z-10 cursor-pointer font-medium transition-colors duration-200 px-12 max-w-7xl mx-auto ${
                  isActive
                    ? 'text-text-primary text-xl'
                    : 'text-text-primary/60 text-lg hover:text-text-primary/80'
                }`}
                whileHover={!isActive ? { scale: 1.05, y: -2 } : {}}
                onClick={() => onYearClick?.(idx)}
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className={`inline-block px-6 py-1 rounded-md hover:bg-white/10 transition-colors duration-200 relative ${isActive ? 'text-text-primary font-bold' : ''}`}>
                  {milestone.year}
                  {isActive && <div className="w-full h-[6px] absolute -bottom-2 left-0 bg-black"/>}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Years display - Tablet */}
      <div className="hidden md:flex lg:hidden justify-center items-center relative px-4 flex-wrap gap-3">
        <div className="flex justify-center items-center flex-wrap gap-3">
          {milestones.map((milestone, idx) => {
            const isActive = idx === currentIndex;
            
            return (
              <motion.div
                key={`milestone-tablet-${milestone.year}-${idx}`}
                className={`z-10 flex-shrink-0 cursor-pointer transition-colors duration-200 ${
                  isActive
                    ? 'text-text-secondary text-lg font-bold'
                    : 'text-text-secondary/60 text-base font-medium hover:text-text-secondary/80'
                }`}
                whileHover={!isActive ? { scale: 1.05, y: -2 } : {}}
                onClick={() => onYearClick?.(idx)}
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="inline-block px-2 py-1 rounded-md transition-colors duration-200">
                  {milestone.year}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Years display - Mobile */}
      <div className="md:hidden flex items-center justify-center h-8 gap-8">
        <AnimatePresence mode="wait">
          {currentIndex > 0 && (
            <motion.div
              key={`prev-${currentIndex - 1}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-text-secondary/60 text-lg font-medium"
              onClick={() => onYearClick?.(currentIndex - 1)}
            >
              {milestones[currentIndex - 1]?.year}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          key={`current-${currentIndex}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25,
            mass: 0.6
          }}
          className="text-text-secondary text-xl font-bold"
        >
          {milestones[currentIndex]?.year}
        </motion.div>
        
        <AnimatePresence mode="wait">
          {currentIndex < milestones.length - 1 && (
            <motion.div
              key={`next-${currentIndex + 1}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-text-secondary/60 text-lg font-medium"
              onClick={() => onYearClick?.(currentIndex + 1)}
            >
              {milestones[currentIndex + 1]?.year}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LegacyMilestoneCard({ 
  milestone, 
  isVisible,
  milestones,
  currentIndex,
  totalItems,
  onYearClick,
  onPrevious,
  onNext,
  isInView
}: { 
  milestone: LegacyMilestone; 
  isVisible: boolean;
  milestones: LegacyMilestone[];
  currentIndex: number;
  totalItems: number;
  onYearClick?: (index: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  isInView: boolean;
}) {
  return (
    <div 
      className="relative w-full min-h-[92vh] flex flex-col overflow-hidden"
      style={{
        backgroundImage: `url(${milestone.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#001D2D]/40 to-transparent" /> */}
      
      {/* Content */}
      <div className="relative z-10 text-center text-text-secondary px-24 pt-12 flex flex-col items-start w-full flex-1 justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TransitionVertical>
            <h3 className="text-6xl font-medium mb-6 text-white font-forum">
              {milestone.year}
            </h3>
          </TransitionVertical>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <TransitionVertical>
            <p className="text-lg md:text-xl text-text-secondary/90 leading-relaxed w-full max-w-xl text-left mb-8">
              {/* {milestone.description} */}
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
            </p>
          </TransitionVertical>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
        //   initial={{ opacity: 0, y: 30 }}
        //   animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        //   transition={{ duration: 0.6, delay: 0.8 }}
          className="flex space-x-4"
        >
          <button
            onClick={onPrevious}
            className="w-12 h-12 rounded-full bg-transparent border-1 border-black flex items-center justify-center hover:bg-black hover:border-black group transition-all duration-300"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:stroke-white stroke-black transition-all duration-300"
              strokeWidth="2"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          
          <button
            onClick={onNext}
            className="w-12 h-12 rounded-full bg-black border-2 border-black flex items-center justify-center hover:bg-gray-800 transition-all duration-300"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-white"
              strokeWidth="2"
            >
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Timeline at bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.0, ease: [0.6, 0.01, 0.05, 0.95] }}
      >
        <LegacyTimeline
          milestones={milestones}
          currentIndex={currentIndex}
          totalItems={totalItems}
          onYearClick={onYearClick}
        />
      </motion.div>
    </div>
  );
}

function LegacyCarousel({ milestones = defaultMilestones }: LegacyCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);

  const autoplayPlugin = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    })
  );

  const fadePlugin = useRef(Fade());

  // Intersection Observer Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsInView(isVisible);

        if (api) {
          if (isVisible) {
            autoplayPlugin.current.play();
          } else {
            autoplayPlugin.current.stop();
          }
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleYearClick = (index: number) => {
    if (api) {
      autoplayPlugin.current.stop();
      api.scrollTo(index);
      
      if (isInView) {
        setTimeout(() => {
          autoplayPlugin.current.play();
        }, 100);
      }
    }
  };

    const handlePrevious = () => {
    if (api) {
      // Stop autoplay
      autoplayPlugin.current.stop();

      // Navigate to previous
      api.scrollPrev();

      // Restart autoplay after a short delay (only if in view)
      if (isInView) {
        setTimeout(() => {
          autoplayPlugin.current.play();
        }, 100);
      }
    }
  };

  const handleNext = () => {
    if (api) {
      // Stop autoplay
      autoplayPlugin.current.stop();

      // Navigate to next
      api.scrollNext();

      // Restart autoplay after a short delay (only if in view)
      if (isInView) {
        setTimeout(() => {
          autoplayPlugin.current.play();
        }, 100);
      }
    }
  };

  return (
    <div ref={sectionRef} className="w-full space-y-8">
      {/* Carousel Content */}
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[autoplayPlugin.current, fadePlugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        // onMouseEnter={() => {
        //   if (isInView) {
        //     autoplayPlugin.current.stop();
        //   }
        // }}
        // onMouseLeave={() => {
        //   if (isInView) {
        //     autoplayPlugin.current.play();
        //   }
        // }}
      >
        <CarouselContent>
          {milestones.map((milestone, index) => (
            <CarouselItem key={`legacy-${milestone.year}-${index}`}>
              <LegacyMilestoneCard
                milestone={milestone}
                isVisible={index === current}
                milestones={milestones}
                currentIndex={current}
                totalItems={count}
                onYearClick={handleYearClick}
                onPrevious={handlePrevious}
                onNext={handleNext}
                isInView={isInView}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

    </div>
  );
}

export default LegacyCarousel;
