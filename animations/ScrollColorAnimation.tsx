"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollColorTransitionProps {
  children: React.ReactNode;
  className?: string;
  greyColor?: string;
  blackColor?: string;
}

function ScrollColorTransition({ 
  children, 
  className = "", 
  greyColor = "#c8c8c8ff", 
  blackColor = "#1F2937" 
}: ScrollColorTransitionProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  // Extract text content from children
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return node.toString();
    if (React.isValidElement(node)) {
      const props = node.props as { children?: React.ReactNode };
      if (props.children) {
        return getTextContent(props.children);
      }
    }
    if (Array.isArray(node)) {
      return node.map(getTextContent).join('');
    }
    return '';
  };

  const textContent = getTextContent(children);
  const words = textContent.split(' ');

  // Clear refs array
  lettersRef.current = [];

  useEffect(() => {
    if (!elementRef.current || lettersRef.current.length === 0) return;

    // Create GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elementRef.current,
        start: "bottom 75%", // Animation starts when top of element hits 10% of viewport
        end: "top 0%",   // Animation ends when top of element hits 0% of viewport
        scrub: 1,         // Smooth scrubbing, 1 second lag
        // markers: true,  // Uncomment to see scroll trigger markers for debugging
      }
    });

    // Animate each letter individually
    lettersRef.current.forEach((letter, index) => {
      if (letter) {
        const delay = index * 0.2; // Stagger the animations
        
        tl.to(letter, {
          color: blackColor,
          duration: 5,
          ease: "power2.out"
        }, delay);
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children, blackColor]); // Re-run when children or colors change

  let letterIndex = 0;

  return (
    <div ref={elementRef} className={className}>
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          <span className="inline-block">
            {word.split('').map((letter, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  if (el) lettersRef.current[letterIndex++] = el;
                }}
                style={{ color: greyColor }}
              >
                {letter}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 && <span> </span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default ScrollColorTransition;