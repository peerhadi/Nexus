"use client";

import Background from "@/components/default/signup/background";
import SignupFooter from "@/components/default/signup/signup-footer";
import SignupForm from "@/components/default/signup/signup-form";
import SignupHeader from "@/components/default/signup/signup-header";

export default function SignupPage() {
  return (
    <main className="relative mt-10 flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#fbfbfa] px-5 py-10 text-[#111] selection:bg-black selection:text-white">
      <Background />

      <div className="pointer-events-none absolute left-[22%] top-[25%] h-1.5 w-1.5 rounded-full bg-fuchsia-500 animate-[ping_2.5s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-[24%] top-[31%] h-1.5 w-1.5 rounded-full bg-cyan-400 animate-[ping_3s_ease-in-out_infinite_300ms]" />
      <div className="pointer-events-none absolute bottom-[27%] left-[27%] h-1.5 w-1.5 rounded-full bg-lime-400 animate-[ping_2.8s_ease-in-out_infinite_500ms]" />
      <div className="pointer-events-none absolute bottom-[23%] right-[28%] h-1.5 w-1.5 rounded-full bg-orange-400 animate-[ping_3.2s_ease-in-out_infinite_700ms]" />

      <div className="relative z-10 w-full max-w-[760px]">
        <SignupHeader />
        <SignupForm />
        <SignupFooter />
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }

          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pop {
          0% {
            opacity: 0;
            transform: scale(0.4) rotate(-20deg);
          }

          70% {
            transform: scale(1.15) rotate(4deg);
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }
      `}</style>
    </main>
  );
}
