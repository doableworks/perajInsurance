"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface SolutionsCaorouselItemsProps {
    title: string;
    description: string;
    imageSrc: string;
}

const solutionsCarouselItems: SolutionsCaorouselItemsProps[] = [
    {
        title: "Risk Management Practice",
        description:"We identify vulnerabilities to clarify your risk.",
        imageSrc:"/solutions/sol1.svg",
    },
    {
        title:"Global Programs",
        description:"Powered by 400+ global partners we simplify cross border coverage.",
        imageSrc:"/solutions/sol2.svg",
    },
    {
        title:"Industry Benchmark",
        description:"Decades of insurance expertise position us as a trusted benchmark.",
        imageSrc:"/solutions/sol3.svg",
    },
    {
        title:"Wellness Programs",
        description:"Coverage that takes care of you and your family.",
        imageSrc:"/solutions/sol4.svg",
    },
    {
        title:"Claims Consultancy",
        description:"Coverage that takes care of you and your family.",
        imageSrc:"/solutions/sol5.svg",
    },{
        title:"Affinity Programs",
        description:"Coverage that takes care of you and your family.",
        imageSrc:"/solutions/sol6.svg",
    }
]


function SolutionsCarousel() {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  const autoplayPlugin = useRef(
    AutoScroll({
      speed: 1.5,
    //   startDelay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    })
  );

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
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [api]);

  return (
    <div ref={sectionRef} className="relative w-full overflow-x-hidden">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true,
          loop: true,
        }}
        onMouseEnter={() => {
          if (isInView) {
            autoplayPlugin.current.stop();
          }
        }}
        onMouseLeave={() => {
          if (isInView) {
            autoplayPlugin.current.play();
          }
        }}
        plugins={[autoplayPlugin.current]}
        className="w-full ml-22"
      >
        <CarouselContent className="-ml-4">
          {solutionsCarouselItems.map((item, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-[28%] pl-4"
            >
              <motion.div 
                className="p-1 bg-gradient-1 text-white h-full min-h-[450px] flex flex-col p-4 group cursor-pointer hover:shadow-lg transition-all duration-300 rounded-sm"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <div className="flex-1 relative overflow-hidden flex items-center justify-center mt-12">
                  <Image 
                    src={item.imageSrc}
                    alt={item.title}
                    layout="fill"
                    objectFit="contain"
                    // className="p-24"
                  />
                </div>
                
                <div className="flex-1 flex items-end p-2 overflow-hidden">
                  {/* Title and Description Column */}
                  <div className="flex flex-col flex-1 w-full items-start mb-2 h-fit min-h-20">
                    <motion.h3 
                      className="text-[1.7rem] font-forum text-text-primary pr-2"
                      variants={{
                        rest: { y: 50 },
                        hover: { y: 0 }
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {item.title}
                    </motion.h3>

                    <motion.div
                      className="overflow-hidden mr-4"
                      variants={{
                        rest: { height: 0 },
                        hover: { height: "auto" }
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <motion.p 
                        className="text-sm text-black leading-relaxed"
                        variants={{
                          rest: { y: 10, opacity: 0 },
                          hover: { y: 0, opacity: 1 }
                        }}
                        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                       
                      >
                        {item.description}
                      </motion.p>
                    </motion.div>
                  </div>
                  
                  {/* Cta button*/}
                    <button className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center flex-shrink-0 group-hover:scale-115 transition-transform duration-200">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default SolutionsCarousel;
