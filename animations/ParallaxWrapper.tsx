"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// import { useFeatureDetection } from "@/customHook/versionCheck";

export default function ParallaxScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
//   const isSupported = useFeatureDetection();

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Call hooks unconditionally
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Conditionally return based on mobile detection
  if (isMobile) {
    return <div className="relative z-10">{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y: backgroundY }} className="relative z-10">
      {children}
    </motion.div>
  );
}