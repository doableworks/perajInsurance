"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TransitionHorizontal from "@/animations/TransitionHorizontal";
import TransitionVertical from "@/animations/TransitionVertical";

interface IndustryCardProps {
  title: string;
  backgroundImage: string;
  gridArea: string;
}

const industryCards: IndustryCardProps[] = [
  {
    title: "Construction",
    backgroundImage: "/industries/industry1.jpg",
    gridArea: "1 / 1 / 3 / 5",
  },
  {
    title: "Real Estate",
    backgroundImage: "/industries/industry4.jpg",
    gridArea: "3 / 1 / 5 / 3",
  },
  {
    title: "Manufacturing",
    backgroundImage: "/industries/industry5.png",
    gridArea: "3 / 3 / 5 / 5",
  },
  {
    title: "Energy",
    backgroundImage: "/industries/industry2.jpg",
    gridArea: "1 / 5 / 3 / 7",
  },
  {
    title: "Healthcare",
    backgroundImage: "/industries/industry3.jpg",
    gridArea: "1 / 7 / 3 / 9",
  },
  {
    title: "Transportation",
    backgroundImage: "/industries/industry6.jpg",
    gridArea: "3 / 5 / 5 / 9",
  },
];

function IndustriesSection() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* Grid Container */}
        <div className="grid grid-cols-8 grid-rows-4 gap-6 h-full min-h-[700px]">
          {industryCards.map((card, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
              style={{ gridArea: card.gridArea }}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={card.backgroundImage}
                  alt={card.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bottom-0 top-auto bg-gradient-to-t from-[#00557590] to-transparent h-[50%]" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-2 text-white">
                <TransitionVertical>
                <Link
                  href={"#"}
                  className="inline-flex items-center justify-between p-2 rounded-sm font-medium transition-colours duration-400 group-hover:bg-white min-w-48 w-full bg-white/70"
                >
                    <TransitionHorizontal>
                  <span className="text-xl text-text-primary font-forum">
                    {card.title}
                  </span>
                  </TransitionHorizontal>
                  <div className="flex items-center justify-center w-8 h-8 rounded-xs transition-transform duration-200 group-hover:translate-x-1 bg-primary">
                    <ArrowRight size={20} className="bg-primary text-white" />
                  </div>
                </Link>
                </TransitionVertical>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IndustriesSection;
