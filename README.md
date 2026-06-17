# ISTQB Zero → Hero · CTFL v4.0

> Nền tảng học **ISTQB Certified Tester Foundation Level (v4.0)** theo phong cách micro-learning — song ngữ (giảng tiếng Việt, thuật ngữ & câu hỏi tiếng Anh sát đề thật), tương tác, truyền cảm hứng, và **hoạt động 100% offline**.

Học từ con số 0 đến tự tin ace kỳ thi ISTQB Foundation: 6 chương đầy đủ, bài học ngắn dễ tiêu hoá, diagram & widget tương tác, quiz có giải thích chi tiết, thi thử 40 câu mô phỏng đề thật, và hệ thống **ôn tập cách quãng (spaced repetition)** giúp nhớ lâu.

## ✨ Tính năng

- **6 chương CTFL v4.0** bám sát learning objectives chính thức (K1/K2/K3).
- **Micro-learning**: bài học chia nhỏ, mỗi bài 9–13 phút, có hook tạo cảm hứng.
- **Widget tương tác**: Boundary Value Analysis, Equivalence Partitioning, Decision Table, State Transition, quy trình test 7 bước, 7 nguyên lý, bài tập nối/phân loại…
- **Quiz & thi thử**: phản hồi tức thì + giải thích tiếng Việt; đề thi thử 40 câu, 60 phút, ngưỡng đạt 65%, lấy ngẫu nhiên theo phân bố sát kỳ thi thật.
- **Ôn tập cách quãng (SM-2)**: thuật ngữ tự lên lịch ôn đúng lúc bạn sắp quên.
- **Theo dõi tiến độ**: XP, streak, % hoàn thành theo chương, lịch sử thi.
- **Giao diện**: light/dark, responsive, accessible, motion tôn trọng `prefers-reduced-motion`.
- **Offline-first**: toàn bộ tiến độ lưu trong `localStorage`; font tự host (không gọi CDN); không cần backend.

## 🧱 Tech stack

| Thành phần | Công nghệ |
|---|---|
| Build | Vite 8 |
| UI | React 19 |
| Styling | Tailwind CSS v4 (`@theme`, CSS-first) |
| Routing | React Router (HashRouter — không cần cấu hình server) |
| Animation | Motion (`motion/react`) |
| Icons | lucide-react |
| Fonts | Plus Jakarta Sans + Inter (self-hosted qua `@fontsource`) |

## 🚀 Chạy local

```bash
npm install
npm run dev        # http://localhost:5173
```

Build & xem thử bản production:

```bash
npm run build      # xuất ra dist/
npm run preview
npm run lint       # kiểm tra ESLint
```

## 🌐 Deploy lên GitHub Pages

Đã kèm sẵn GitHub Actions tại [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Push repo lên GitHub.
2. Vào **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. Mỗi lần push lên `main`, site tự build và deploy.

`vite.config.js` đặt `base: './'` (đường dẫn tương đối) nên site chạy được dưới **bất kỳ tên repo nào** trên GitHub Pages, và thậm chí khi mở thẳng từ ổ đĩa. Kết hợp HashRouter nên không bị lỗi 404 khi refresh.

## 📂 Cấu trúc nội dung

Nội dung tách hẳn khỏi giao diện trong [`src/data/`](src/data):

- `course.js` — meta khoá học + gom 6 chương.
- `chapters/chN-*.js` — từng chương (lessons, blocks, quiz).
- `glossary.js` — thuật ngữ (tự gộp thêm key terms từ mọi bài).
- `mockExam.js` — ngân hàng câu hỏi thi thử.
- `schema.js` — "hợp đồng" mô tả mọi block/question type mà renderer hiểu.

Muốn thêm/sửa nội dung? Chỉ cần chỉnh các file trong `src/data/chapters/` theo đúng schema — không phải đụng vào code giao diện.

## 📜 License

MIT — tự do dùng cho mục đích học tập.

> Dựa trên ISTQB® Certified Tester Foundation Level Syllabus v4.0. ISTQB® là thương hiệu đã đăng ký của International Software Testing Qualifications Board. Đây là tài liệu học tập độc lập, không phải tài liệu chính thức của ISTQB.
