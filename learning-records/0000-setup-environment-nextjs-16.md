# Setup Sân Tập Next.js 16 & Sanity Check Môi Trường

Đã thiết lập thành công dự án thực hành `next-practice` với phiên bản Next.js 16.3.3, React 19.2.8, Turbopack, TypeScript 5.1+ Strict và Tailwind v4.

## Evidence

- Máy học viên chạy Node.js `v22.22.2`, npm `11.4.2` đáp ứng đầy đủ yêu cầu tối thiểu (Node $\ge 20.9.0$).
- Khởi tạo project `next-practice` với cấu hình `--src-dir`, `--turbopack`, `--typescript`.
- Component `src/app/page.tsx` chẩn đoán Server Runtime và RSC render thành công.
- Lệnh `npm run build` chạy thành công 100% với Turbopack (`▲ Next.js 16.3.3 (Turbopack)`).
- Đã soạn thảo bài học `lessons/0000-setup-environment.html` và cập nhật `GLOSSARY.md`.

## Implications

- Toàn bộ các bài học tiếp theo (RSC, `"use cache"`, `updateTag`, `proxy.ts`, Streaming, Security) sẽ được thực hành và kiểm chứng trực tiếp trên sân tập `next-practice`.
