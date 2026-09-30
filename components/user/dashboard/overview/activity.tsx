"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { activity } from "./data";
import ActivityItem from "./activity-item";

export default function OverviewActivity() {
  return (
    <section>
      <div className="mb-4">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Timeline
        </div>

        <h2 className="mt-1 text-xl font-black tracking-tight text-slate-800">
          Recent activity
        </h2>
      </div>

      <div className="rounded-[22px] border border-white bg-white/75 p-5 shadow-sm backdrop-blur-xl">
        <div className="space-y-6">
          {activity.map((item, index) => (
            <ActivityItem
              key={item.title}
              item={item}
              index={index}
              total={activity.length}
            />
          ))}
        </div>

        <Link
          href="/dashboard/messages"
          className="mt-7 flex items-center justify-between rounded-xl bg-gradient-to-r from-violet-50 to-pink-50 px-3 py-3 text-[10px] font-black text-violet-600 transition hover:from-violet-100 hover:to-pink-100"
        >
          Open communication
          <ChevronRight size={13} />
        </Link>
      </div>
    </section>
  );
}
