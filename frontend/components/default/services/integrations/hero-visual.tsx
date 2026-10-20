import { Check, CircleDot, Workflow, Zap } from "lucide-react";

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[650px]">
      <div className="absolute inset-8 rounded-full bg-[var(--accent)] opacity-[0.09] blur-3xl" />

      <div className="relative aspect-square w-full">
        <div className="integration-ring absolute left-[8%] top-[8%] h-[84%] w-[84%] rounded-full border border-dashed border-[var(--card-border)]" />
        <div className="integration-ring-reverse absolute left-[19%] top-[19%] h-[62%] w-[62%] rounded-full border border-[var(--card-border)] opacity-70" />
        <div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--card-border)] opacity-70" />

        <div className="integration-orb absolute left-[8%] top-[8%] h-16 w-16 rounded-[22px] border border-white/20 bg-gradient-to-br from-indigo-400/80 to-violet-600/80 shadow-2xl sm:h-20 sm:w-20">
          <div className="absolute inset-2 rounded-[15px] border border-white/25" />
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
        </div>

        <div className="integration-orb absolute right-[8%] top-[14%] h-14 w-14 rounded-full border border-white/20 bg-gradient-to-br from-emerald-300/80 to-teal-600/80 shadow-2xl sm:h-[72px] sm:w-[72px]">
          <div className="absolute inset-2 rounded-full border border-white/30" />
          <div className="absolute inset-[35%] rounded-full bg-white/90" />
        </div>

        <div className="integration-orb absolute bottom-[12%] right-[10%] h-16 w-16 rotate-12 rounded-[20px] border border-white/20 bg-gradient-to-br from-sky-300/80 to-blue-600/80 shadow-2xl sm:h-[76px] sm:w-[76px]">
          <div className="absolute inset-2 rotate-12 rounded-[13px] border border-white/30" />
        </div>

        <div className="integration-orb absolute bottom-[9%] left-[14%] h-12 w-12 rotate-45 rounded-xl border border-white/20 bg-gradient-to-br from-orange-300/80 to-pink-500/80 shadow-2xl sm:h-16 sm:w-16">
          <div className="absolute inset-2 rounded-lg border border-white/30" />
        </div>

        <div className="integration-orb absolute left-[1%] top-[48%] h-9 w-9 rounded-full border border-white/20 bg-gradient-to-br from-cyan-300 to-blue-500 shadow-xl sm:h-12 sm:w-12" />

        <div className="integration-orb absolute right-[3%] top-[51%] h-9 w-9 rotate-12 rounded-xl border border-white/20 bg-gradient-to-br from-pink-300 to-fuchsia-600 shadow-xl sm:h-12 sm:w-12" />

        <svg
          viewBox="0 0 600 600"
          className="absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="integration-flow-a"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop stopColor="#8b91ff" />
              <stop offset="1" stopColor="#56d8c5" />
            </linearGradient>
            <linearGradient
              id="integration-flow-b"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop stopColor="#f6a36b" />
              <stop offset="1" stopColor="#bc8bff" />
            </linearGradient>
          </defs>
          <path
            d="M300 300 C240 230 190 190 115 110"
            stroke="url(#integration-flow-a)"
            strokeWidth="1.5"
            opacity=".7"
          />
          <path
            d="M300 300 C390 220 430 180 490 115"
            stroke="url(#integration-flow-a)"
            strokeWidth="1.5"
            opacity=".7"
          />
          <path
            d="M300 300 C390 350 430 405 485 490"
            stroke="url(#integration-flow-b)"
            strokeWidth="1.5"
            opacity=".7"
          />
          <path
            d="M300 300 C210 365 165 430 125 495"
            stroke="url(#integration-flow-b)"
            strokeWidth="1.5"
            opacity=".7"
          />
          <path
            d="M300 300 C205 290 125 295 45 300"
            stroke="url(#integration-flow-a)"
            strokeWidth="1.5"
            opacity=".5"
          />
          <path
            d="M300 300 C390 290 465 300 555 310"
            stroke="url(#integration-flow-b)"
            strokeWidth="1.5"
            opacity=".5"
          />
          <circle r="4" fill="#a6a9ff">
            <animateMotion
              dur="3.8s"
              repeatCount="indefinite"
              path="M300 300 C240 230 190 190 115 110"
            />
          </circle>
          <circle r="3.5" fill="#68e1c7">
            <animateMotion
              dur="4.5s"
              repeatCount="indefinite"
              path="M490 115 C430 180 390 220 300 300"
            />
          </circle>
          <circle r="4" fill="#f6a36b">
            <animateMotion
              dur="4.2s"
              repeatCount="indefinite"
              path="M300 300 C390 350 430 405 485 490"
            />
          </circle>
          <circle r="3.5" fill="#c3a1ff">
            <animateMotion
              dur="3.4s"
              repeatCount="indefinite"
              path="M125 495 C165 430 210 365 300 300"
            />
          </circle>
          <circle r="3" fill="#8bd8ff">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path="M45 300 C125 295 205 290 300 300"
            />
          </circle>
        </svg>

        <div className="absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[34px] border border-white/30 bg-[var(--card)] shadow-[0_20px_80px_rgba(0,0,0,0.15)] sm:h-40 sm:w-40 sm:rounded-[42px]">
          <div className="absolute inset-2 rounded-[27px] border border-[var(--card-border)] sm:rounded-[34px]" />
          <div className="relative flex flex-col items-center gap-2">
            <div className="integration-float flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg sm:h-14 sm:w-14">
              <Workflow size={26} />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] integration-muted">
              Nexus Connect
            </span>
          </div>
        </div>

        <div className="integration-float absolute left-[36%] top-[7%] rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-[10px] font-medium shadow-lg sm:text-xs">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
          API connected
        </div>

        <div className="integration-float-delay absolute bottom-[27%] left-[1%] rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-[10px] font-medium shadow-lg sm:text-xs">
          <Zap size={12} className="mr-1.5 inline text-amber-400" />
          Event received
        </div>

        <div className="integration-float absolute bottom-[18%] right-[1%] rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-[10px] font-medium shadow-lg sm:text-xs">
          <Check size={12} className="mr-1.5 inline text-emerald-400" />
          Data synced
        </div>

        <div className="absolute left-1/2 top-[2%] -translate-x-1/2 text-[9px] font-medium uppercase tracking-[0.25em] integration-muted sm:text-[10px]">
          One system · Many possibilities
        </div>
      </div>

      <div className="integration-card absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3 sm:bottom-0">
        <div className="flex -space-x-2">
          {["#7c8cff", "#43c9b6", "#f4a76b", "#d78af4"].map(
            (color, index) => (
              <span
                key={color}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--card)] text-[9px] font-bold text-white"
                style={{ background: color, zIndex: 4 - index }}
              >
                {["A", "D", "@", "#"][index]}
              </span>
            ),
          )}
        </div>
        <div>
          <p className="text-xs font-semibold">Everything in sync</p>
          <p className="integration-muted mt-0.5 text-[10px]">
            Designed around your workflow
          </p>
        </div>
        <CircleDot size={15} className="ml-1 text-emerald-400" />
      </div>
    </div>
  );
}
