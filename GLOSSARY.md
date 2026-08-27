# Next.js 16 & React 19 Interview Mastery Glossary

Thuật ngữ chuẩn xác được sử dụng trong suốt bộ tài liệu và khóa học Next.js 16 (Middle/Senior Level).

## Next.js 16 & Bundling

**Turbopack**:
Bundler mặc định viết bằng Rust trên nền tảng kiến trúc tính toán gia tăng (Incremental Turbo Engine), cung cấp File System Caching và tốc độ Fast Refresh < 10ms.
_Avoid_: Webpack wrapper.

**`proxy.ts`**:
File quy ước mới trong Next.js 16 thay thế `middleware.ts`, định nghĩa ranh giới Network Boundary tại tầng Edge/Server để can thiệp headers, cookies, redirects và rewrite trước khi request chạm tới routes.
_Avoid_: Express middleware, application router.

**`after()`**:
API chuẩn hóa của Next.js 16 cho phép lập lịch thực thi các tác vụ phụ (logging, analytics, audit sync) SAU KHI response đã hoàn tất stream về client, giúp tối ưu tối đa TTFB (Time to First Byte).
_Avoid_: setTimeout, unhandled background promise.

## React Server Components & Rendering

**React Server Components (RSC)**:
Các component React được thực thi 100% trên Server tại build-time hoặc request-time, không bao gồm code JS trong client bundle và trực tiếp truy cập tài nguyên server (DB, filesystem).
_Avoid_: Server Side Rendering (SSR), Server Component gọi qua API.

**Client Component**:
Component được đánh dấu bằng chỉ thị `'use client'`, được render trên server ra HTML ban đầu và gửi kèm JS bundle xuống trình duyệt để thực thi Hydration và xử lý sự kiện tương tác.
_Avoid_: Traditional React Component, SPA Component.

**Hydration**:
Quá trình React ở trình duyệt duyệt qua cây DOM HTML tĩnh (đã được server gửi xuống) và gắn các event listeners (onClick, onChange...) cùng state vào DOM đó.
_Avoid_: Page load, re-rendering.

**Serialization Boundary**:
Ranh giới chuyển giao dữ liệu từ Server Component sang Client Component. Dữ liệu truyền qua props phải là loại dữ liệu serialize được (JSON-like: string, number, plain object, array, Uint8Array...; không truyền được function, class instance, symbol).
_Avoid_: Pass props thông thường.

**Cache Components (`"use cache"`)**:
Mô hình caching linh hoạt của Next.js 16 cho phép đánh dấu component hoặc async function để tự động cache và phục vụ tức thì (Instant Navigations) mà không phụ thuộc vào cấu hình static route cứng nhắc.
_Avoid_: unstable_cache, manual memoization.

## Caching & Invalidation (Next.js 16)

**`updateTag(tag)`**:
Hàm xóa cache và ép tạo dữ liệu mới tức thì theo mô hình **Read-your-own-writes (Strong Consistency)**, chuyên dùng trong Server Actions để người dùng thấy ngay thay đổi của mình sau khi submit.
_Avoid_: revalidateTag cũ 1 tham số.

**`revalidateTag(tag, profile)`**:
Hàm đánh dấu dữ liệu hết hạn theo mô hình **Stale-While-Revalidate (Eventual Consistency)**, chuyên dùng cho Webhooks / Background Cron jobs để trả cache cũ ngay lập tức và revalidate ngầm.
_Avoid_: Force refresh.

**Request Memoization**:
Cơ chế tự động lưu tạm kết quả của các hàm `fetch` có cùng URL & options TRONG CÙNG 1 LẦN RENDER (1 HTTP Request lifecycle) ở phía Server.
_Avoid_: Client caching, Redis cache.

**Data Cache**:
Bộ nhớ cache phía Server giúp duy trì dữ liệu fetch được qua NHIỀU REQUESTS và NHIỀU USERS, chỉ bị hủy khi revalidate (time-based hoặc tag-based).
_Avoid_: Browser cache.

## Routing & Mutations

**Server Action**:
Hàm async chạy trên Server được khai báo với chỉ thị `'use server'`, cho phép client gọi trực tiếp qua Form action hoặc event handler mà không cần viết Route Handler API thủ công.
_Avoid_: API route POST, RPC call.

**Parallel Routes (`@slot`)**:
Kỹ thuật render đồng thời một hoặc nhiều trang độc lập trong cùng một layout sử dụng các slots được đặt tên (ví dụ: `@analytics`, `@team`).
_Avoid_: Multi-component layout.

**Intercepting Routes (`(.)`, `(..)`):**:
Kỹ thuật "chặn" đường dẫn điều hướng từ bên trong app để hiển thị một route mới trong bối cảnh hiện tại (ví dụ: mở Photo Modal khi click link, nhưng load full trang photo khi F5 reload).
_Avoid_: React Modal state đơn thuần.
