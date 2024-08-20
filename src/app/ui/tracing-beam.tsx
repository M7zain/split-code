"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface TracingBeamProps {
  height?: number;
  className?: string;
}

export const TracingBeam: React.FC<TracingBeamProps> = ({
  height = 1000,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, height]), {
    stiffness: 500,
    damping: 90,
  });

  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, height - 200]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  return (
    <motion.div
      ref={ref}
      className={cn(
        " flex justify-center items-center px-10 h-full",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="h-4 w-4 rounded-full border border-neutral shadow-sm flex items-center justify-center"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.2,
            }}
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0 ? "white" : "#FB8500", // splitorange
              borderColor:
                scrollYProgress.get() > 0 ? "white" : "#FB8500", // splitorange
            }}
            className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${height}`}
          width="20"
          height={height}
          className="block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 10 0 V ${height}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          />
          <motion.path
            d={`M 10 0 V ${height}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#FB8500" stopOpacity="0" />
              <stop offset="0.1" stopColor="#FB8500" />
              <stop offset="0.5" stopColor="#FB8500" />
              <stop offset="0.9" stopColor="#FB8500 " />
              <stop offset="1" stopColor="#BAEFF5" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
};
