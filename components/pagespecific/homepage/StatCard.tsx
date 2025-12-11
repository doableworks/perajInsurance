import React from "react";
import { motion } from "framer-motion";
import TransitionHorizontal from "@/animations/TransitionHorizontal";
import { SlotMachineCounter } from "./SlotMachineCounter";

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
  isInView?: boolean;
}

export const StatCard = ({
  value,
  suffix,
  label,
  delay,
  isInView = true,
}: StatCardProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div>
        <SlotMachineCounter
          targetValue={value}
          suffix={suffix}
          duration={2000}
          delay={delay * 200}
          easingFunction="easeOutQuart"
          trigger={isInView}
        >
          <span className="text-primary text-9xl font-extralight" />
        </SlotMachineCounter>
      </div>
      <div className="flex flex-row-reverse">
        <TransitionHorizontal>
          <p className="text-text-primary text-md whitespace-pre-line mr-8">
            {label}
          </p>
        </TransitionHorizontal>
      </div>
    </div>
  );
};