"use client";

import { motion } from "framer-motion";
import { Bot, Check, Sparkles, Zap } from "lucide-react";

export default function HeroVisual() {
  return (
    <div className="relative mx-auto h-[520px] w-full max-w-[600px] lg:h-[650px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.07] sm:h-[560px] sm:w-[560px]"
      >
        <div className="absolute left-[8%] top-[12%] h-3 w-3 rounded-full bg-violet-500 shadow-[0_0_25px_rgba(139,92,246,0.6)]" />
        <div className="absolute bottom-[18%] right-[8%] h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-black/[0.09]"
      >
        <div className="absolute right-[5%] top-[20%] h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 1.5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 z-10 w-[285px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-black/10 bg-white/80 p-5 shadow-[0_35px_100px_rgba(0,0,0,0.12)] backdrop-blur-2xl sm:w-[340px]"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">
              Nexus automation
            </p>
            <p className="mt-1 font-bold">Morning routine</p>
          </div>

          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg"
          >
            <Sparkles className="h-4 w-4" />
          </motion.div>
        </div>

        <div className="space-y-2.5">
          {[
            ["Check inbox", "Done", true],
            ["Create reminders", "Done", true],
            ["Prepare daily report", "Running", false],
          ].map(([name, status, done], index) => (
            <motion.div
              key={name as string}
              animate={{ x: [0, index % 2 === 0 ? 3 : -3, 0] }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center gap-3 rounded-2xl bg-[#f6f6f4] p-3.5"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  done
                    ? "bg-black text-white"
                    : "bg-gradient-to-br from-blue-400 to-violet-400 text-white"
                }`}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Zap className="h-3.5 w-3.5" />
                )}
              </div>

              <div className="flex-1">
                <p className="text-xs font-bold">{name as string}</p>
                <p className="mt-0.5 text-[10px] text-black/35">
                  Automatically handled
                </p>
              </div>

              <span className="text-[10px] font-semibold text-black/35">
                {status as string}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-2xl bg-black px-4 py-3 text-white">
          <span className="text-[10px] text-white">NEXT RUN</span>
          <span className="text-xs font-bold">08:30 AM</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], rotate: [-4, -2, -4] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-[8%] left-0 z-20 rounded-2xl border border-black/10 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-300 to-pink-300" />

          <div>
            <p className="text-xs font-bold">Email received</p>
            <p className="text-[10px] text-black/35">Nexus is handling it</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -18, 0], rotate: [5, 3, 5] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute right-0 top-[9%] z-20 rounded-2xl border border-black/10 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-cyan-300 text-white">
            <Bot className="h-4 w-4" />
          </div>

          <div>
            <p className="text-xs font-bold">Task completed</p>
            <p className="text-[10px] text-black/35">4.2 seconds ago</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
