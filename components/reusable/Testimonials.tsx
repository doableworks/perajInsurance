"use client";
import * as React from "react";
import { useEffect, useState, useRef } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TransitionVertical from "@/animations/TransitionVertical";
import Image from "next/image";
import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
}

interface TestimonialPair {
  testimonial1: Testimonial;
  testimonial2: Testimonial;
}

const testimonialData: TestimonialPair[] = [
  {
    testimonial1: {
      quote:
        "Peraj Insurance has been instrumental in protecting our business growth. Their expertise and personalized approach made all the difference.",
      name: "Sarah Johnson",
      designation: "CEO, TechStart Inc.",
    },
    testimonial2: {
      quote:
        "Outstanding service and comprehensive coverage. They truly understand our industry's unique challenges and provide tailored solutions.",
      name: "Michael Chen",
      designation: "CFO, Global Manufacturing",
    },
  },
  {
    testimonial1: {
      quote:
        "The claims process was seamless and efficient. Peraj's team was there for us when we needed them most.",
      name: "Emily Rodriguez",
      designation: "Operations Director, Healthcare Plus",
    },
    testimonial2: {
      quote:
        "Their risk management insights have helped us prevent potential issues and optimize our insurance strategy.",
      name: "David Thompson",
      designation: "Risk Manager, Financial Services Corp",
    },
  },
  {
    testimonial1: {
      quote:
        "Professional, reliable, and always available. Peraj Insurance sets the standard for excellence in the industry.",
      name: "Lisa Wang",
      designation: "Founder, Innovation Labs",
    },
    testimonial2: {
      quote:
        "They've been our trusted partner for over a decade. Their expertise and commitment are unmatched.",
      name: "Robert Martinez",
      designation: "VP Operations, Logistics United",
    },
  },
];

export function TestimonialsCarousel() {
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

  const handlePrevious = () => {
    if (api) {
      autoplayPlugin.current.stop();
      api.scrollPrev();

      if (isInView) {
        setTimeout(() => {
          autoplayPlugin.current.play();
        }, 100);
      }
    }
  };

  const handleNext = () => {
    if (api) {
      autoplayPlugin.current.stop();
      api.scrollNext();

      if (isInView) {
        setTimeout(() => {
          autoplayPlugin.current.play();
        }, 100);
      }
    }
  };

  return (
    <div ref={sectionRef} className="w-full relative px-22 overflow-hidden">
      {/* Left Navigation Button */}
      <motion.button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-transparent border-[1px] border-gray-900 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 z-10 shadow-lg"
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
      >
        <ArrowLeft size={16} />
      </motion.button>

      {/* Right Navigation Button */}
      <motion.button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-gray-600 hover:border-gray-400 transition-all duration-300 z-10 shadow-lg"
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
      >
        <ArrowRight size={16} className="text-white" />
      </motion.button>

      {/* Testimonials Container with clipPath */}
      {/* Border Container */}
      <TransitionVertical>
      <div
        className="w-full bg-gray-600/30 relative min-h-[500px] p-[1px]"
        style={{
          clipPath:
            "polygon(0 0, 95% 0%, 100% 10%, 100% 100%, 5% 100%, 0% 90%)",
        }}
      >
        {/* Content Container */}
        <div
          className="w-full flex flex-col items-center px-16 py-16 bg-white min-h-[500px] relative"
          style={{
            clipPath:
              "polygon(0 0, 95% 0%, 100% 10%, 100% 100%, 5% 100%, 0% 90%)",
          }}
        >
          {/* Title - Outside carousel so it only transitions once */}
          <div className="mb-12">
            <h3 className="w-full text-center text-5xl font-forum">
              <TransitionVertical>
                They speak for us
              </TransitionVertical>
            </h3>
          </div>

          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              axis: "x",
            }}
            plugins={[autoplayPlugin.current, fadePlugin.current]}
            className="w-full "
          >
            {/* > */}
            <CarouselContent>
              {testimonialData.map((pair, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-transparent border-none shadow-none">
                    <CardContent>
                      {/* Two Testimonials Side by Side */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* First Testimonial */}
                        <div className="text-left flex flex-col gap-2">
                          <div className="flex w-fit items-center justify-center">
                            <Image
                              src={"/icons/quotation.svg"}
                              alt="Quote Icon"
                              width={20}
                              height={20}
                            />
                            <Image
                              src={"/icons/quotation.svg"}
                              alt="Quote Icon"
                              width={20}
                              height={20}
                            />
                          </div>
                          <blockquote className="text-lg md:text-xl italic text-gray-700 leading-relaxed mb-4">
                            {pair.testimonial1.quote}
                          </blockquote>
                        </div>

                        {/* Second Testimonial */}
                        <div className="text-left flex flex-col gap-2">
                          <div className="flex w-fit items-center justify-center">
                            <Image
                              src={"/icons/quotation.svg"}
                              alt="Quote Icon"
                              width={20}
                              height={20}
                            />
                            <Image
                              src={"/icons/quotation.svg"}
                              alt="Quote Icon"
                              width={20}
                              height={20}
                            />
                          </div>
                          <blockquote className="text-lg md:text-xl italic text-gray-700 leading-relaxed mb-4">
                            {pair.testimonial2.quote}
                          </blockquote>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="w-full h-px bg-gray-300 mb-8"></div>

                      {/* Names and Designations */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* First Person */}
                        <div className="text-left">
                          <p className="font-semibold text-gray-900 text-lg mb-1">
                            {pair.testimonial1.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {pair.testimonial1.designation}
                          </p>
                        </div>

                        {/* Second Person */}
                        <div className="text-left">
                          <p className="font-semibold text-gray-900 text-lg mb-1">
                            {pair.testimonial2.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {pair.testimonial2.designation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      </TransitionVertical>
    </div>
  );
}
