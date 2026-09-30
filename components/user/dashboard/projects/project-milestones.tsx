import { Check } from "lucide-react";
import { milestones } from "./data";

export default function ProjectMilestones() {
  return (
    <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <div className="mb-7">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
          Roadmap
        </div>

        <h2 className="mt-1 text-xl font-black">Project milestones</h2>
      </div>

      <div className="space-y-1">
        {milestones.map(([name, status, done], index) => (
          <div key={name} className="relative flex items-center gap-4 py-4">
            {index !== milestones.length - 1 && (
              <div
                className={`absolute left-[15px] top-[46px] h-8 w-px ${
                  done ? "bg-black/40" : "bg-black/10"
                }`}
              />
            )}

            <div
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                done
                  ? "bg-black/90 text-white"
                  : status === "In progress"
                    ? "bg-gradient-to-br from-pink-400 to-violet-400 text-white"
                    : "bg-black/[0.05] text-black/20"
              }`}
            >
              {done ? <Check size={13} /> : index + 1}
            </div>

            <div>
              <div className="text-[12px] font-black">{name}</div>

              <div className="mt-1 text-[9px] font-bold text-black/35">
                {status}
              </div>
            </div>

            {status === "In progress" && (
              <div className="ml-auto rounded-full bg-violet-50 px-2.5 py-1 text-[8px] font-black text-violet-600">
                CURRENT
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
