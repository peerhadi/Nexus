"use client";

export default function BuildBackground({
  submitted = false,
}: {
  submitted?: boolean;
}) {
  if (submitted) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[12%] h-72 w-72 animate-[float_8s_ease-in-out_infinite] rounded-full bg-fuchsia-300/35 blur-3xl" />
        <div className="absolute right-[5%] top-[18%] h-80 w-80 animate-[float_10s_ease-in-out_infinite_reverse] rounded-full bg-cyan-300/35 blur-3xl" />
        <div className="absolute bottom-[5%] left-[35%] h-96 w-96 animate-[float_12s_ease-in-out_infinite] rounded-full bg-yellow-300/30 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 top-10 h-[430px] w-[430px] animate-[float_9s_ease-in-out_infinite] rounded-full bg-fuchsia-300/25 blur-[100px]" />
      <div className="absolute -right-20 top-32 h-[420px] w-[420px] animate-[float_11s_ease-in-out_infinite_reverse] rounded-full bg-cyan-300/25 blur-[100px]" />
      <div className="absolute bottom-[-180px] left-[28%] h-[500px] w-[500px] animate-[float_13s_ease-in-out_infinite] rounded-full bg-yellow-300/20 blur-[110px]" />
      <div className="absolute right-[30%] top-[42%] h-72 w-72 animate-[float_8s_ease-in-out_infinite_reverse] rounded-full bg-violet-300/20 blur-[90px]" />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {Array.from({ length: 18 }).map((_, index) => (
        <div
          key={index}
          className="absolute h-1.5 w-1.5 animate-[particle_5s_ease-in-out_infinite] rounded-full bg-black/15"
          style={{
            left: `${(index * 17) % 100}%`,
            top: `${(index * 29) % 100}%`,
            animationDelay: `${index * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
}
