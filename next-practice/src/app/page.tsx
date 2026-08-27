// Trang Home — Mặc định là React Server Component (chạy trên Node.js server)
import { Suspense } from "react";

// Component kiểm tra Async RSC data fetching
async function ServerDiagnostic() {
  // Giả lập một tác vụ async trên server
  const serverTime = new Date().toLocaleTimeString("vi-VN");
  const nodeVersion = process.version;
  const envMode = process.env.NODE_ENV;

  return (
    <div className="p-6 bg-slate-800/80 border border-slate-700 rounded-xl space-y-3">
      <h2 className="text-xl font-semibold text-sky-400">🟢 Server Runtime Diagnostic</h2>
      <ul className="text-sm space-y-1 text-slate-300 font-mono">
        <li>&bull; Server Render Time: <span className="text-emerald-400">{serverTime}</span></li>
        <li>&bull; Node.js Version: <span className="text-amber-400">{nodeVersion}</span></li>
        <li>&bull; Environment: <span className="text-purple-400">{envMode}</span></li>
        <li>&bull; Component Type: <span className="text-sky-300">React Server Component (Zero Client JS)</span></li>
      </ul>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-xl w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Next.js 16 Sân Tập Thực Hành
          </h1>
          <p className="text-slate-400 text-sm">
            Môi trường sẵn sàng cho lộ trình Next.js Middle / Senior Interview Mastery.
          </p>
        </div>

        <Suspense fallback={<div className="text-slate-500 font-mono">Đang render server...</div>}>
          <ServerDiagnostic />
        </Suspense>
      </div>
    </main>
  );
}
