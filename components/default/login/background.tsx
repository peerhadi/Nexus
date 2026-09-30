"use client";

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,#ff00cc,#00e5ff,#a8ff00,#ffe600,#ff4d00,#ff00cc)] opacity-[0.045] blur-[110px] animate-[spin_20s_linear_infinite]" />

      <div className="absolute left-[8%] top-[15%] h-36 w-36 rounded-full bg-fuchsia-400/15 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
      <div className="absolute right-[8%] top-[20%] h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl animate-[pulse_4s_ease-in-out_infinite_400ms]" />
      <div className="absolute bottom-[12%] left-[15%] h-40 w-40 rounded-full bg-lime-300/15 blur-3xl animate-[pulse_6s_ease-in-out_infinite_700ms]" />
      <div className="absolute bottom-[15%] right-[17%] h-36 w-36 rounded-full bg-orange-300/15 blur-3xl animate-[pulse_5s_ease-in-out_infinite_300ms]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.017)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.017)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
    </div>
  );
}
