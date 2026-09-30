"use client";
import { settings } from "./data";
import SettingItem from "./setting-item";

export default function SettingsList() {
  return (
    <section>
      <div className="mb-4">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
          Settings
        </div>

        <h2 className="mt-1 text-xl font-black tracking-tight text-slate-800">
          Account preferences
        </h2>
      </div>

      <div className="grid gap-3">
        {settings.map((item, index) => (
          <SettingItem key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
