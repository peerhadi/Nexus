"use client";

import { motion } from "framer-motion";
import { Bot, Globe2, Sparkles, Terminal } from "lucide-react";

export default function ProjectVisual({
  index,
  gradient,
}: {
  index: number;
  gradient: string;
}) {
  return (
    <div className="absolute inset-x-0 top-[17%] h-[46%] overflow-hidden">
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [-2, 1.5, -2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[9%] top-[7%] w-[82%] rounded-[30px] border border-black/[0.08] bg-white/80 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.1)] backdrop-blur-2xl sm:p-5"
      >
        <div className="flex items-center gap-1.5 border-b border-black/[0.06] pb-4">
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />

          <div className="ml-4 h-5 flex-1 rounded-lg bg-black/[0.035]" />
        </div>

        <div className="mt-5 grid grid-cols-[0.25fr_1fr] gap-4">
          <div className="space-y-2.5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className={`h-2 rounded-full ${
                  item === 1 ? "bg-black/15" : "bg-black/[0.06]"
                }`}
                style={{ width: `${45 + item * 8}%` }}
              />
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 w-20 rounded-full bg-black/10" />
                <div className="mt-2.5 h-6 w-36 rounded-lg bg-black/[0.06]" />
              </div>

              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white`}
              >
                {index === 0 ? (
                  <Sparkles className="h-4 w-4" />
                ) : index === 1 ? (
                  <Globe2 className="h-4 w-4" />
                ) : index === 2 ? (
                  <Terminal className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-black/[0.06] bg-black/[0.018] p-3"
                >
                  <div className="h-1.5 w-8 rounded-full bg-black/10" />
                  <div className="mt-3 h-5 w-10 rounded-md bg-black/[0.06]" />
                </div>
              ))}
            </div>

            <motion.div
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className={`mt-3 h-20 rounded-2xl bg-gradient-to-r ${gradient} opacity-60`}
              style={{ backgroundSize: "200% 200%" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
