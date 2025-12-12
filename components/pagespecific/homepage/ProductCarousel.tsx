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
        title: "PDBI",
        description:"Smart protection for critical assets, infrastructure, and operational continuity.",
        imageSrc:"/products/prod1.png",
    },
    {
        title:"Liability/Casualty",
        description:"Agile coverage for leadership, operations, and third-party exposure in fast-moving environments.",
        imageSrc:"/products/prod2.png",
    },
    {
        title:"Financial",
        description:"Specialised protection for governance, financial integrity, and high-stake decision-making.",
        imageSrc:"/products/prod3.png",
    },
    {
        title:"Cyber",
        description:"Advanced defence against ransomware, data breaches, and digital disruption.",
        imageSrc:"/products/prod4.png",
    },
        {
        title: "Risk Management Practice",
        description:"We identify vulnerabilities to clarify your risk.",
        imageSrc:"/products/prod1.png",
    },
]


function ProductsCarousel() {
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
              className="md:basis-1/2 lg:basis-[33%] pl-4"
            >
              <motion.div 
                className="p-1 bg-white text-white h-full aspect-square flex flex-col p-2 group cursor-pointer hover:shadow-lg transition-all duration-300 rounded-sm"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <div className="flex-[0.7] relative overflow-hidden flex items-center justify-center rounded-xs">
                  <Image 
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                
                <div className="flex-[0.5] flex items-center p-10 overflow-hidden">
                  {/* Title and Description Column */}
                  <div className="flex flex-col flex-1 w-full items-start mb-2 h-full gap-4">
                    <h3 
                      className="text-4xl font-forum text-text-primary pr-2"
                    >
                      {item.title}
                    </h3>
                      <p 
                        className="text-lg text-black leading-relaxed"
                      >
                        {item.description}
                      </p>

                  </div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default ProductsCarousel;
