"use client";

import Background from "@/components/default/login/background";
import LoginFooter from "@/components/default/login/login-footer";
import LoginForm from "@/components/default/login/login-form";
import LoginHeader from "@/components/default/login/login-header";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#fbfbfa] px-5 py-10 text-[#111] selection:bg-black selection:text-white">
      <Background />

      <div className="pointer-events-none absolute left-[24%] top-[28%] h-1.5 w-1.5 animate-[ping_2.7s_ease-in-out_infinite] rounded-full bg-fuchsia-500" />
      <div className="pointer-events-none absolute right-[25%] top-[25%] h-1.5 w-1.5 animate-[ping_3.1s_ease-in-out_infinite_400ms] rounded-full bg-cyan-400" />
      <div className="pointer-events-none absolute bottom-[27%] left-[29%] h-1.5 w-1.5 animate-[ping_2.9s_ease-in-out_infinite_700ms] rounded-full bg-lime-400" />
      <div className="pointer-events-none absolute bottom-[25%] right-[29%] h-1.5 w-1.5 animate-[ping_3.4s_ease-in-out_infinite_300ms] rounded-full bg-orange-400" />

      <div className="relative z-10 w-full max-w-[460px] mt-20">
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
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
      `}</style>
    </main>
  );
}
