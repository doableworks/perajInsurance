"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TransitionHorizontal from "@/animations/TransitionHorizontal";
import { StatCard } from "./StatCard";

function StatsSection() {
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { 
    once: false, 
    amount: 0.3,
    margin: "-10% 0px -10% 0px"
  });

  const statsData = [
    {
      value: 70,
      suffix: "+",
      label: "Years of legacy in insurance\nand risk advisory.",
      delay: 0,
    },
    {
      value: 400,
      suffix: "+",
      label: "Global broker partnerships\nenabling worldwide service.",
      delay: 2,
    },
    {
      value: 150,
      suffix: "+",
      label: "Countries where Peraj supports\nIndian and multinational clients.",
      delay: 1,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95] as const
      }
    },
  };

  return (
    <div className="w-full flex items-center justify-center flex-1">
      <motion.div
        ref={inViewRef}
        className="w-full flex items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            className={`
              flex-[33%] relative overflow-hidden
              ${index === 0 ? "z-[50]" : ""}
              ${index === 1 ? "mt-[11vh] -z-[10] overflow-hidden" : ""}
              ${index === 2 ? "mt-[22vh] z-[50] " : ""}
            `}
            variants={cardVariants}
          >
            {/* Shadow blobs for second card */}
            {index === 1 && (
              <>
                <motion.div 
                  className="absolute -left-10 top-1/2 -translate-y-1/2 w-16 h-52 bg-[#3D3D3D]/25 blur-xl z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: 2.4, // After all cards have animated (3 cards * 0.8s duration)
                    ease: [0.175, 0.885, 0.32, 1.275] as const
                  }}
                />
                <motion.div 
                  className="absolute -right-10 bottom-6 w-16 h-28 bg-[#3D3D3D]/25 blur-xl z-10 overflow-hidden"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: 2.4, // Slightly after the left blob
                    ease: [0.175, 0.885, 0.32, 1.275] as const
                  }}
                />
              </>
            )}
            <div
              className="bg-gradient-1 h-56 px-4 py-2 flex flex-col font-forum font-light"
              style={{
                clipPath: "polygon(85% 0, 100% 20%, 100% 100%, 0 100%, 0 0)",
              }}
            >
              <StatCard
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={stat.delay}
                isInView={isInView}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default StatsSection;