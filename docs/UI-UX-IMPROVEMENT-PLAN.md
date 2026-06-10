# Kế hoạch cải tiến UI/UX — Modern Tech Agency

> **Ngày lập:** 10/06/2025  
> **Phạm vi:** Toàn bộ website (15 trang marketing + 8 demo showcase)  
> **Stack hiện tại:** Next.js 16 · Tailwind v4 · shadcn/base-nova · Framer Motion · Lucide Icons

---

## Mục lục

1. [Tóm tắt đánh giá hiện trạng](#1-tóm-tắt-đánh-giá-hiện-trạng)
2. [Vấn đề gốc rễ (Root Causes)](#2-vấn-đề-gốc-rễ-root-causes)
3. [Định hướng thiết kế mới](#3-định-hướng-thiết-kế-mới)
4. [Bộ màu mới — Design Tokens](#4-bộ-màu-mới--design-tokens)
5. [Màu theo từng thành phần UI](#5-màu-theo-từng-thành-phần-ui)
6. [Typography & Spacing chuẩn hóa](#6-typography--spacing-chuẩn-hóa)
7. [Kế hoạch chi tiết theo trang](#7-kế-hoạch-chi-tiết-theo-trang)
8. [Kế hoạch chi tiết theo component](#8-kế-hoạch-chi-tiết-theo-component)
9. [Lộ trình triển khai (4 Phase)](#9-lộ-trình-triển-khai-4-phase)
10. [Checklist kiểm tra chất lượng](#10-checklist-kiểm-tra-chất-lượng)

---

## 1. Tóm tắt đánh giá hiện trạng

### Điểm mạnh

| Khu vực | Đánh giá | Ghi chú |
|---------|----------|---------|
| Trang Home (sections) | ⭐⭐⭐ | Dùng design tokens nhất quán, có animation |
| Trang Services | ⭐⭐⭐ | Cấu trúc rõ, gradient theo dịch vụ |
| Design tokens (`globals.css`) | ⭐⭐ | Đã có nhưng chưa đủ và bị phá vỡ ở nhiều nơi |
| Component library (shadcn) | ⭐⭐⭐ | Button, Input, Sheet hoạt động tốt |
| i18n (5 ngôn ngữ) | ⭐⭐ | Nav/footer OK, nhiều trang còn hardcode EN |

### Điểm yếu (lý do UI "rất xấu")

| Khu vực | Đánh giá | Vấn đề chính |
|---------|----------|--------------|
| About | ⭐ | Dark-glass trên nền trắng → border/card gần như vô hình |
| Projects | ⭐⭐ | Filter pills dùng `border-white/10` trên light theme |
| Contact | ⭐⭐ | Form card `border-white/10`, FormFeedback `text-white/80` |
| Demos gallery | ⭐ | Thiết kế dark hoàn toàn tách rời, text trắng trên nền sáng |
| 8 trang Demo | ⭐⭐ | Mỗi demo một palette riêng, không dùng design system |
| Header logo | ⭐⭐ | Gradient `from-primary to-accent` → accent là xám, logo nhạt |
| `.text-gradient` | ⭐ | `from-primary to-accent` → gradient gần như không thấy |
| Dark mode | ⭐ | CSS có `.dark` nhưng không bật ở bất kỳ đâu |
| Icon social footer | ⭐ | GitBranch/Briefcase thay vì Github/Linkedin |
| Emoji thay icon | ⭐⭐ | About, Projects empty state, demo products |

### Ma trận nhất quán thị giác

```
                    Token-based (light)    Dark-glass ad-hoc    Demo riêng biệt
Home sections           ████████░░              ░░                  ░░
Services                ████████░░              ░░                  ░░
About                   ░░░░░░░░░░              ████████░░          ░░
Projects                ░░                      ████████░░          ░░
Contact                 ████░░░░░░              ████████░░          ░░
Demos                   ░░░░░░░░░░              ░░                  ████████░░
```

**Kết luận:** Website đang chạy **3 ngôn ngữ thiết kế song song** trên cùng một light theme → cảm giác lộn xộn, thiếu chuyên nghiệp, khó đọc.

---

## 2. Vấn đề gốc rễ (Root Causes)

### 2.1 Hai (thực tế ba) visual language

- **Language A — Marketing tokens:** `bg-background`, `border-border`, `text-muted-foreground` (Home, Services hero/pricing)
- **Language B — Dark glass trên light:** `border-white/10`, `bg-white/5`, `bg-card/30` (About, Projects, Contact form)
- **Language C — Demo dark UI:** `text-white`, `text-gray-400`, gradient buttons thô (Demos section)

### 2.2 Token `--accent` bị hiểu sai

```css
/* Hiện tại — accent = xám, KHÔNG phải màu nhấn */
--accent: #f4f4f5;
.text-gradient { from-primary to-accent } /* → gradient xanh → xám, mờ */
```

### 2.3 CSS lỗi trên About hero

```html
<!-- hsl(var(--primary)/0.08) SAI vì --primary là hex #3b82f6, không phải HSL -->
bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)]
```

### 2.4 Button không thống nhất

| Vị trí | Style |
|--------|-------|
| shadcn default | `rounded-lg`, `h-8` |
| Marketing CTA | `rounded-full`, `size="lg"`, `shadow-primary/25` |
| Demo pages | Raw `<button>` gradient Tailwind |
| Filter pills | Custom `<button>` không qua Button component |

### 2.5 Duplicate chrome

`demo-layout.tsx` render lại `SiteHeader` + `SiteFooter` trong khi `[locale]/layout.tsx` đã render → **2 header/footer** trên 6 trang demo.

---

## 3. Định hướng thiết kế mới

### Concept: **"Precision Light"**

Agency công nghệ hiện đại, sáng sủa, tin cậy — lấy cảm hứng từ Linear, Vercel, Stripe nhưng có bản sắc riêng.

| Nguyên tắc | Mô tả |
|------------|-------|
| **Một theme, một ngôn ngữ** | Light mode làm mặc định; dark mode tùy chọn (Phase 4) |
| **Màu có ý nghĩa** | Primary = hành động; Accent = highlight/gradient; Semantic = success/warning/error |
| **Depth qua shadow, không qua opacity mù** | Thay `border-white/10` bằng `border-border` + `shadow-sm` |
| **Icon nhất quán** | Lucide throughout, không emoji trong UI chính |
| **Motion có chừng mực** | Reveal on scroll OK; giảm hover scale trên demo cards |
| **Accessibility first** | Contrast ≥ 4.5:1 body text, focus ring rõ trên mọi interactive |

### Mood board tham chiếu

- **Primary feel:** Clean SaaS, nền trắng ấm (`#FAFAFA`), chữ đen mềm (`#0F0F12`)
- **Accent feel:** Indigo-violet gradient (`#6366F1` → `#8B5CF6`) — hiện đại, tech
- **Surface feel:** Card trắng, border zinc-200, shadow nhẹ

---

## 4. Bộ màu mới — Design Tokens

### 4.1 Core palette (Light — mặc định)

Thay thế toàn bộ block `:root` trong `src/app/globals.css`:

| Token | Hiện tại | **Đề xuất mới** | Vai trò |
|-------|----------|-----------------|---------|
| `--background` | `#ffffff` | `#FAFAFA` | Nền trang — ấm hơn pure white |
| `--foreground` | `#18181b` | `#0F0F12` | Text chính — đậm, dễ đọc |
| `--card` | `#ffffff` | `#FFFFFF` | Card nổi trên background |
| `--card-foreground` | `#18181b` | `#0F0F12` | Text trên card |
| `--primary` | `#3b82f6` (blue generic) | `#6366F1` (Indigo 500) | CTA, link, icon nhấn |
| `--primary-foreground` | `#ffffff` | `#FFFFFF` | Text trên primary button |
| `--secondary` | `#f4f4f5` | `#F4F4F5` | Nền pill, badge |
| `--secondary-foreground` | `#18181b` | `#3F3F46` | Text trên secondary |
| `--muted` | `#f4f4f5` | `#F4F4F5` | Section alternate bg |
| `--muted-foreground` | `#71717a` | `#71717A` | Subtitle, caption |
| `--accent` | `#f4f4f5` ❌ | `#8B5CF6` (Violet 500) ✅ | Gradient end, highlight |
| `--accent-foreground` | `#18181b` | `#FFFFFF` | Text trên accent bg |
| `--destructive` | `#ef4444` | `#EF4444` | Error, xóa |
| `--success` | *(chưa có)* | `#10B981` | Toast success, form OK |
| `--warning` | *(chưa có)* | `#F59E0B` | Cảnh báo |
| `--border` | `#e4e4e7` | `#E4E4E7` | Border card, divider |
| `--input` | `#e4e4e7` | `#E4E4E7` | Input border |
| `--ring` | `#3b82f6` | `#6366F1` | Focus ring |
| `--radius` | `0.75rem` | `0.75rem` | Giữ nguyên |

### 4.2 Gradient tokens (mới)

Thêm vào `globals.css`:

```css
:root {
  --gradient-brand: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%);
  --gradient-brand-subtle: linear-gradient(135deg, #6366F1/12 0%, #8B5CF6/8 100%);
  --gradient-surface: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);
  --gradient-cta: linear-gradient(135deg, #6366F1/15 0%, #8B5CF6/10 50%, #FAFAFA 100%);
}
```

### 4.3 Utility classes cập nhật

```css
.text-gradient {
  @apply bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent;
}
/* Sau khi sửa accent → gradient indigo → violet, rõ ràng */

.glass {
  @apply bg-card/80 backdrop-blur-xl border border-border shadow-sm;
}
/* Bỏ shadow dark-mode-only phức tạp trên light */

.surface-elevated {
  @apply bg-card border border-border rounded-2xl shadow-sm;
}

.surface-muted {
  @apply bg-muted/50 border border-border/60 rounded-2xl;
}
```

### 4.4 Dark mode (Phase 4 — tùy chọn)

| Token | Dark value |
|-------|------------|
| `--background` | `#09090B` |
| `--foreground` | `#FAFAFA` |
| `--card` | `#18181B` |
| `--primary` | `#818CF8` (Indigo 400 — sáng hơn trên dark) |
| `--accent` | `#A78BFA` |
| `--border` | `#27272A` |

---

## 5. Màu theo từng thành phần UI

### 5.1 Buttons

| Variant | Background | Text | Border | Hover | Shadow | Icon |
|---------|------------|------|--------|-------|--------|------|
| **Primary (CTA)** | `#6366F1` | `#FFFFFF` | none | `#4F46E5` | `shadow-indigo-500/20` | `#FFFFFF` |
| **Primary outline** | transparent | `#6366F1` | `#6366F1/30` | `bg-indigo-50` | none | `#6366F1` |
| **Secondary** | `#F4F4F5` | `#3F3F46` | `#E4E4E7` | `#E4E4E7` bg | none | `#71717A` |
| **Ghost** | transparent | `#71717A` | none | `bg-muted` | none | inherit |
| **Destructive** | `#FEF2F2` | `#EF4444` | `#FECACA` | `#FEE2E2` | none | `#EF4444` |
| **Filter active** | `#6366F1/10` | `#6366F1` | `#6366F1/40` | — | none | — |
| **Filter inactive** | `#FFFFFF` | `#71717A` | `#E4E4E7` | `border-indigo-200` | none | — |

**Quy tắc shape:**
- CTA marketing: `rounded-full`, `h-10`, `px-6`
- Form/action trong card: `rounded-lg`, `h-9`
- Icon button: `rounded-lg`, `size-9`

**File cần sửa:** `src/components/ui/button.tsx` — thêm variant `cta` với rounded-full mặc định; thêm `filter` variant.

---

### 5.2 Icons

| Ngữ cảnh | Màu | Size | Ghi chú |
|----------|-----|------|---------|
| Nav link | `#71717A` → hover `#0F0F12` | 16px | — |
| CTA button inline | `#FFFFFF` | 16px | ArrowRight |
| Contact info (Mail, Phone, MapPin) | `#6366F1` | 20px | Trong circle `#6366F1/10` bg |
| Service card icon | white trên gradient riêng | 24px | Xem §5.4 |
| Process step number | `#6366F1/15` bg, `#6366F1` text | — | Thay số mờ `muted/20` |
| Testimonial Quote | `#6366F1/40` | 32px | — |
| Footer social | `#71717A` → hover `#6366F1` | 16px | **Đổi icon:** Github, Linkedin, Facebook |
| Check mark (lists) | `#6366F1` | 16px | — |
| Form error | `#EF4444` | 20px | AlertCircle |
| Form success | `#10B981` | 20px | CheckCircle |

**Thay emoji → Lucide trên About:**

| Emoji cũ | Icon mới | Màu nền icon box |
|----------|----------|------------------|
| ⌨️ | `Code2` | `#6366F1/10` |
| 📱 | `Smartphone` | `#10B981/10` |
| 🏗️ | `Layers` | `#F59E0B/10` |
| 🎯 | `Target` | `#EF4444/10` |

---

### 5.3 Cards & Surfaces

| Loại card | Background | Border | Shadow | Hover |
|-----------|------------|--------|--------|-------|
| **Default card** | `#FFFFFF` | `#E4E4E7` | `shadow-sm` | `shadow-md`, `-translate-y-0.5` |
| **Highlighted (Pro pricing)** | `#6366F1/5` | `#6366F1/30` | `shadow-indigo-500/10` | scale 1.01 |
| **Stat card** | `#FFFFFF` | `#E4E4E7` | none | `border-indigo-200` |
| **Testimonial** | `#FFFFFF` | `#E4E4E7` | `shadow-sm` | none |
| **Project card** | `#FFFFFF` | `#E4E4E7` | `shadow-sm` | `shadow-lg shadow-indigo-500/5` |
| **Demo card (gallery)** | `#FFFFFF` | `#E4E4E7` | `shadow-sm` | `border-indigo-300`, không scale |
| **Contact form wrapper** | `#FFFFFF` | `#E4E4E7` | `shadow-md` | — |
| **CTA block** | gradient `--gradient-cta` | `#6366F1/20` | `shadow-xl shadow-indigo-500/10` | — |

**Quy tắc:** Cấm dùng `border-white/10`, `bg-white/5`, `bg-card/30` trên light theme.

---

### 5.4 Màu theo dịch vụ (Services)

Giữ phân biệt màu nhưng tinh chỉnh cho hài hòa với primary indigo:

| Service | Icon gradient | Card tint | Tag bg |
|---------|---------------|-----------|--------|
| **Web Dev** | `from-indigo-500 to-violet-600` | `from-indigo-500/8` | `bg-indigo-50 text-indigo-700` |
| **Mobile** | `from-emerald-500 to-teal-600` | `from-emerald-500/8` | `bg-emerald-50 text-emerald-700` |
| **UI/UX** | `from-violet-500 to-fuchsia-600` | `from-violet-500/8` | `bg-violet-50 text-violet-700` |
| **Backend** | `from-slate-600 to-indigo-700` | `from-slate-500/8` | `bg-slate-100 text-slate-700` |

**File:** `src/data/services.ts` — cập nhật `color` và `gradient`.

---

### 5.5 Màu theo Demo (Showcase)

Demos là "sản phẩm con" — giữ identity riêng nhưng **wrapper thống nhất** với site chính. Chỉ UI bên trong demo giữ theme riêng.

| Demo | Theme color | Button trong demo | Icon box |
|------|-------------|-------------------|----------|
| Corporate | Cyan `#06B6D4` | `bg-cyan-600 hover:bg-cyan-700` | `from-cyan-500 to-blue-600` |
| Fashion | Rose `#F43F5E` | `bg-rose-600 hover:bg-rose-700` | `from-rose-500 to-pink-600` |
| Ordering App | Orange `#F97316` | `bg-orange-500` | `from-orange-500 to-red-500` |
| Product Catalog | Emerald `#10B981` | `bg-emerald-600` | `from-green-500 to-emerald-600` |
| Driver App | Red `#EF4444` | `bg-red-600` | `from-red-500 to-rose-600` |
| Note App | Indigo `#6366F1` | `bg-indigo-600` | `from-indigo-500 to-purple-600` |
| Ecommerce | Amber `#F59E0B` | `bg-amber-500` | `from-amber-500 to-orange-600` |
| Language App | Sky `#0EA5E9` | `bg-sky-500` | `from-cyan-500 to-blue-600` |

**Demos gallery page:** Chuyển từ dark sang light — card trắng, text `foreground`, hero dùng `.text-gradient`.

---

### 5.6 Form elements

| Element | Default | Focus | Error | Disabled |
|---------|---------|-------|-------|----------|
| Input bg | `#FFFFFF` | ring `#6366F1/30` | border `#EF4444` | `opacity-50` |
| Input border | `#E4E4E7` | border `#6366F1` | — | — |
| Label | `#0F0F12` font-medium | — | — | — |
| Placeholder | `#A1A1AA` | — | — | — |
| Select trigger | giống Input | giống Input | — | — |
| FormFeedback success | bg `#10B981/10`, border `#10B981/20`, text `#065F46` | — | — | — |
| FormFeedback error | bg `#EF4444/10`, border `#EF4444/20`, text `#991B1B` | — | — | — |
| FormFeedback loading | bg `#6366F1/10`, border `#6366F1/20`, text `#3730A3` | — | — | — |

**File:** `src/components/ui/form-feedback.tsx` — thay toàn bộ `text-white/80`.

---

### 5.7 Toast notifications

| Type | Background | Text | Icon |
|------|------------|------|------|
| Success | `#10B981` | white | CheckCircle |
| Error | `#EF4444` | white | AlertCircle |
| Info | `#6366F1` | white | Info |

Giữ toast đậm màu (overlay) — OK cho notification layer.

---

### 5.8 Header & Footer

**Header:**
- Logo box: `bg-gradient-to-br from-indigo-500 to-violet-600` (sửa accent)
- Scrolled state: `bg-background/80 backdrop-blur-xl border-border`
- Nav active state (mới): underline `indigo-500` hoặc `text-foreground font-semibold`
- CTA button: primary indigo, `rounded-full`

**Footer:**
- Background: `bg-muted/40` → `border-t border-border`
- Social icons: Github (`Github`), Linkedin (`Linkedin`), Facebook (`Facebook`), Zalo (giữ MessageCircle hoặc custom SVG)
- Link hover: `text-primary`

---

## 6. Typography & Spacing chuẩn hóa

### 6.1 Type scale

| Level | Class | Size | Weight | Color | Dùng ở |
|-------|-------|------|--------|-------|--------|
| Display | `text-5xl sm:text-6xl` | 48–60px | 700 | foreground + gradient span | Hero H1 |
| H1 page | `text-4xl sm:text-5xl` | 36–48px | 700 | foreground | Page titles |
| H2 section | `text-3xl sm:text-4xl` | 30–36px | 700 | foreground | Section headings |
| H3 card | `text-xl` | 20px | 600 | foreground | Card titles |
| Body lg | `text-lg` | 18px | 400 | muted-foreground | Intro paragraphs |
| Body | `text-base` | 16px | 400 | foreground | General |
| Small | `text-sm` | 14px | 400/500 | muted-foreground | Captions, meta |
| Eyebrow | `text-sm uppercase tracking-widest` | 14px | 500 | primary | Section labels |

### 6.2 Spacing scale

| Pattern | Value | Ghi chú |
|---------|-------|---------|
| Section padding Y | `py-20 md:py-28` | Thống nhất (About đang `py-16` — tăng lên) |
| Section padding X | `px-4 sm:px-6` | Giữ |
| Container | `max-w-6xl mx-auto` | About/Demos dùng `max-w-4xl/7xl` — OK |
| Card padding | `p-6` default, `p-8 md:p-10` featured | — |
| Grid gap | `gap-6` cards, `gap-12` two-col | — |
| Stack gap | `space-y-6` lists, `mt-4` after heading | — |

---

## 7. Kế hoạch chi tiết theo trang

### 7.1 Trang chủ `/` — 8 sections

**File:** `src/app/[locale]/page.tsx` + `src/components/sections/*`

#### HeroSection
| Hạng mục | Hiện trạng | Cải tiến |
|----------|------------|----------|
| Badge | border-border, bg-secondary | Thêm dot pulse xanh `#10B981` bên cạnh Sparkles |
| Title gradient | Mờ (accent xám) | Sau fix token → indigo-violet rõ |
| Primary CTA | OK structure | Đổi shadow `shadow-indigo-500/25` |
| Secondary CTA | OK | Thêm `hover:border-primary/40` |
| Hero visual cards | border-border OK | Perf card: đổi `text-primary-foreground/90` → `text-foreground` (bug contrast) |
| Background | Trống | Thêm subtle grid pattern hoặc radial glow `primary/5` góc phải |

#### SocialProofSection
| Hạng mục | Cải tiến |
|----------|----------|
| Stats | Thêm divider dọc giữa stats desktop |
| Tech pills | `hover:border-primary/30 hover:text-primary` |
| Section bg | Giữ `bg-muted/30` |

#### ServicesPreviewSection
| Hạng mục | Cải tiến |
|----------|----------|
| Cards | Thêm `shadow-sm` default |
| Hover image | Giảm blur, tăng opacity 40% |
| Thumbnails | Dùng `next/image` thay `<img>` |
| Icon box | Cập nhật gradient theo §5.4 |

#### FeaturedProjectsSection
| Hạng mục | Cải tiến |
|----------|----------|
| Cards | Thêm overlay gradient bottom trên image |
| Category badge | `bg-indigo-500/90 text-white` thay `bg-background/85` |

#### ProcessSection
| Hạng mục | Cải tiến |
|----------|----------|
| Step number | `text-indigo-500/20` → số lớn hơn, hoặc icon Lucide mỗi step |
| Cards | Thêm connector line ngang desktop (giữa 4 steps) |
| Step colors | Discovery=indigo, Design=violet, Dev=emerald, Deploy=amber |

#### TechStackSection
| Hạng mục | Cải tiến |
|----------|----------|
| Marquee items | Thêm logo SVG thay text-only pills |
| Fade edges | Gradient mask trái/phải |

#### TestimonialsSection
| Hạng mục | Cải tiến |
|----------|----------|
| Cards | Thêm avatar circle (initials) cho author |
| Quote icon | `text-primary/30` |

#### CtaSection
| Hạng mục | Cải tiến |
|----------|----------|
| Container | Dùng `--gradient-cta` token |
| Border | `border-primary/20` |

---

### 7.2 Trang About `/about`

**File:** `src/app/[locale]/about/page.tsx`

**Priority: CAO — trang xấu nhất**

| Section | Việc cần làm |
|---------|--------------|
| Hero | Fix radial gradient → `bg-[radial-gradient(ellipse_at_top_right,var(--primary)/0.08,transparent_60%)]`; border `border-border` |
| Avatar | Thêm ring `ring-4 ring-indigo-500/20`; placeholder → logo SVG hoặc ảnh thật |
| Stats | `border-border bg-card shadow-sm`; i18n labels vào `messages/*.json` |
| Skills bars | Track: `bg-muted` thay `bg-white/5`; fill: `from-indigo-500 to-violet-500` |
| Timeline | Card: `surface-elevated`; dot: `bg-primary border-2 border-background` |
| How we work | Emoji → Lucide + colored icon box (§5.2) |
| CTA | `surface-elevated` thay `bg-card/30`; i18n button text |

---

### 7.3 Trang Services `/services`

**File:** `src/app/[locale]/services/page.tsx`

| Section | Việc cần làm |
|---------|--------------|
| Hero | OK — thêm decorative blur orb `primary/10` |
| Service articles | Fix icon wrapper (đang `text-transparent bg-clip-text` + `text-white` conflict) → `bg-gradient-to-br ${s.color}` solid |
| ServiceGallery | Border radius match card; nav dots contrast |
| Pricing Pro tier | Thêm badge "Popular" `bg-primary text-primary-foreground` |
| Pricing price | Sau fix `.text-gradient` → hiển thị đẹp |
| FAQ | Migrate Radix accordion styling → match design tokens |
| Bottom CTA | Thêm gradient subtle giống home CTA |

---

### 7.4 Trang Projects `/projects`

**Files:** `projects-client.tsx`, `projects/[slug]/page.tsx`

#### Listing
| Hạng mục | Việc cần làm |
|----------|--------------|
| Filter pills | `border-border bg-card` inactive; active giữ `border-primary bg-primary/10` |
| Project cards | `border-border bg-card shadow-sm` thay dark-glass |
| Count text | i18n "project/projects" |
| Empty state | Emoji → illustration SVG + i18n |

#### Detail
| Hạng mục | Việc cần làm |
|----------|--------------|
| ParticleNetwork | Giảm opacity hoặc chỉ dùng trên dark; light: subtle dot grid |
| Carousel dots | `bg-muted-foreground/30` active `bg-primary` |
| Carousel controls | Luôn hiện trên mobile (`opacity-100 md:opacity-0 md:group-hover:opacity-100`) |
| Prev/Next | i18n |
| Related projects | Card style thống nhất listing |

---

### 7.5 Trang Contact `/contact`

**Files:** `contact/page.tsx`, `contact-form.tsx`

| Hạng mục | Việc cần làm |
|----------|--------------|
| Form wrapper | `surface-elevated p-8` thay `border-white/10 bg-card/40` |
| Contact icons | Wrap trong `h-10 w-10 rounded-xl bg-primary/10` |
| Form inputs | Verify focus ring indigo |
| FormFeedback | Fix text colors (§5.6) |
| Layout mobile | Form full-width trước contact info |

---

### 7.6 Trang Demos Gallery `/demos`

**File:** `src/app/[locale]/demos/page.tsx`

**Priority: CAO — hoàn toàn lệch theme**

| Hạng mục | Việc cần làm |
|----------|--------------|
| Background | Bỏ dark ParticleNetwork hoặc opacity 15% trên light |
| Hero title | `.text-gradient` + i18n |
| Subtitle | `text-muted-foreground` |
| Demo cards | Light cards (§5.3); bỏ `hover:scale-[1.02]` |
| Link | Dùng `@/i18n/navigation` Link |
| Category filter | (mới) Thêm filter chips theo category |

---

### 7.7 Trang Demo riêng lẻ (×8)

**Files:** `src/app/[locale]/demos/*/page.tsx`, `demo-layout.tsx`

| Hạng mục | Việc cần làm |
|----------|--------------|
| DemoLayout | **Xóa** duplicate SiteHeader/SiteFooter |
| Breadcrumb | Style token-based; i18n Link |
| Demo interior | Giữ dark theme RIÊNG trong container `rounded-3xl overflow-hidden border shadow-2xl` — như phone mockup |
| Custom buttons | Tạo `DemoButton` component với variant theo theme color |
| Product emoji | Thay bằng placeholder image hoặc Lucide Package icon |

---

### 7.8 Trang 404 & Error

**Files:** `not-found.tsx`, `projects/error.tsx`

| Hạng mục | Việc cần làm |
|----------|--------------|
| Layout | Centered, illustration, token colors |
| CTA | Primary button "Về trang chủ" — i18n |
| Error state | Retry button + friendly message |

---

## 8. Kế hoạch chi tiết theo component

### 8.1 Layout components

| Component | File | Tasks |
|-----------|------|-------|
| SiteHeader | `layout/site-header.tsx` | Fix logo gradient; nav active state; CTA indigo |
| SiteFooter | `layout/site-footer.tsx` | Fix social icons (Github, Linkedin); hover primary |
| LocaleSwitcher | `layout/locale-switcher.tsx` | Trigger style match Input; flag icons (optional) |

### 8.2 UI primitives

| Component | File | Tasks |
|-----------|------|-------|
| Button | `ui/button.tsx` | Add `cta` variant (rounded-full); add `filter` variant |
| Input | `ui/input.tsx` | Verify height `h-10` for forms |
| Select | `ui/select.tsx` | Match input height |
| Sheet | `ui/sheet.tsx` | Mobile menu: `bg-background` not glass overload |
| FormFeedback | `ui/form-feedback.tsx` | Semantic light-mode colors; i18n defaults |
| Accordion | `ui/accordion.tsx` | Consolidate with ServicesFaq OR delete unused |
| ProjectImageCarousel | `ui/ProjectImageCarousel.tsx` | Fix dots contrast; fix interval reset bug |

### 8.3 Section components

| Component | Priority | Key changes |
|-----------|----------|---------------|
| hero-section.tsx | P1 | Visual contrast fix, background glow |
| social-proof-section.tsx | P2 | Pill hover states |
| services-preview-section.tsx | P1 | next/image, gradients §5.4 |
| featured-projects-section.tsx | P2 | Image overlay |
| process-section.tsx | P2 | Step colors, connector |
| tech-stack-section.tsx | P3 | Logo icons |
| testimonials-section.tsx | P2 | Avatars |
| cta-section.tsx | P1 | Gradient token |
| services-gallery.tsx | P2 | Dot contrast, next/image |

### 8.4 Feature components

| Component | File | Tasks |
|-----------|------|-------|
| ContactForm | `contact/contact-form.tsx` | Spacing, label styles, feedback integration |
| ServicesFaq | `services/services-faq.tsx` | Token borders, chevron primary color |
| Reveal | `motion/reveal.tsx` | OK — keep |
| DemoLayout | `demos/demo-layout.tsx` | Remove duplicate header/footer |
| DemoFilter | `demos/demo-filter.tsx` | Use Button filter variant |
| DemoSearch | `demos/demo-search.tsx` | Match Input styles |
| MobileFrame | `demos/MobileFrame.tsx` | Realistic bezel color `#1a1a1a` |
| ParticleNetwork | `animations/ParticleNetwork.tsx` | Props: `variant="light"|"dark"`, opacity |
| LiquidGradient | `animations/LiquidGradient.tsx` | Integrate as hero bg OR delete |
| TechGrid | `animations/TechGrid.tsx` | Use as subtle section bg OR delete |

### 8.5 Data files

| File | Tasks |
|------|-------|
| `data/services.ts` | Update color/gradient per §5.4 |
| `data/demos.ts` | OK — colors documented in §5.5 |
| `data/site.ts` | Verify social links |
| `messages/*.json` | Add all missing i18n strings |

---

## 9. Lộ trình triển khai (4 Phase)

### Phase 1 — Foundation (1–2 ngày) 🔴 Critical

**Mục tiêu:** Sửa nền tảng để mọi trang có thể nhìn được.

- [ ] Cập nhật design tokens trong `globals.css` (§4.1, §4.2, §4.3)
- [ ] Fix `.text-gradient` (accent → violet)
- [ ] Fix `form-feedback.tsx` text colors
- [ ] Thay toàn bộ `border-white/10`, `bg-white/5`, `bg-card/30` → token classes
  - `about/page.tsx`
  - `contact/page.tsx`
  - `projects-client.tsx`
  - `demos/page.tsx`
- [ ] Fix About hero radial gradient CSS
- [ ] Remove duplicate header/footer trong `demo-layout.tsx`
- [ ] Fix footer social icons

**Kết quả mong đợi:** Không còn border/card "vô hình"; gradient text hoạt động.

---

### Phase 2 — Component polish (2–3 ngày) 🟠 High

**Mục tiêu:** Buttons, cards, forms nhất quán.

- [ ] Button variants: `cta`, `filter`
- [ ] About page full redesign (emoji → icons, skills bars, stats i18n)
- [ ] Projects filter + cards light theme
- [ ] Contact page icon boxes + form wrapper
- [ ] Demos gallery → light theme
- [ ] Services icon wrapper fix + pricing badge
- [ ] Home hero visual contrast fix
- [ ] CTA sections dùng gradient token
- [ ] `services.ts` color update

**Kết quả mong đợi:** 7 trang marketing nhìn thống nhất, chuyên nghiệp.

---

### Phase 3 — Enhancement (2–3 ngày) 🟡 Medium

**Mục tiêu:** Polish, motion, accessibility.

- [ ] Process section step colors + connector
- [ ] Testimonials avatars
- [ ] Featured projects overlay
- [ ] Tech stack logos
- [ ] Project detail carousel fixes
- [ ] `<img>` → `next/image` (services-preview, gallery)
- [ ] i18n: About stats, Projects, Demos, 404, form-feedback
- [ ] Demos page: i18n Link, category filter
- [ ] ParticleNetwork light variant
- [ ] Demo interior: DemoButton component
- [ ] Header nav active indicator

**Kết quả mong đợi:** Site cảm giác "premium agency".

---

### Phase 4 — Optional advanced (1–2 ngày) 🟢 Nice-to-have

- [ ] Dark mode toggle + ThemeProvider
- [ ] Consolidate accordion (Base UI vs Radix)
- [ ] LiquidGradient / TechGrid integration or cleanup
- [ ] Custom 404 illustration
- [ ] OG image per page with brand colors
- [ ] Reduced motion audit toàn site
- [ ] Lighthouse accessibility ≥ 95

---

## 10. Checklist kiểm tra chất lượng

### Visual consistency
- [ ] Không còn class `border-white/*` hoặc `bg-white/5` trên light pages
- [ ] Mọi CTA primary cùng màu `#6366F1`
- [ ] Mọi `.text-gradient` hiển thị indigo → violet rõ ràng
- [ ] Card styles thống nhất: white bg + border + shadow-sm

### Accessibility
- [ ] Body text contrast ≥ 4.5:1 (WebAIM checker)
- [ ] Focus ring visible trên keyboard tab
- [ ] Carousel controls reachable on mobile
- [ ] Form errors có text + icon, không chỉ màu

### i18n
- [ ] Không còn hardcoded English trên trang vi (default locale)
- [ ] Mọi Link nội bộ qua `@/i18n/navigation`

### Performance
- [ ] Hero/LCP image optimized (next/image, priority)
- [ ] ParticleNetwork không block main thread (lazy load)
- [ ] Framer Motion respects `prefers-reduced-motion`

### Cross-browser
- [ ] Chrome, Firefox, Safari, Edge
- [ ] Mobile iOS Safari + Android Chrome
- [ ] Locale zh: Noto Sans SC renders correctly

---

## Phụ lục A — Mapping file → Phase

| File | Phase |
|------|-------|
| `src/app/globals.css` | 1 |
| `src/components/ui/form-feedback.tsx` | 1 |
| `src/components/layout/site-footer.tsx` | 1 |
| `src/components/demos/demo-layout.tsx` | 1 |
| `src/app/[locale]/about/page.tsx` | 1, 2 |
| `src/app/[locale]/contact/page.tsx` | 1, 2 |
| `src/app/[locale]/projects/projects-client.tsx` | 1, 2 |
| `src/app/[locale]/demos/page.tsx` | 1, 2 |
| `src/components/ui/button.tsx` | 2 |
| `src/data/services.ts` | 2 |
| `src/components/sections/hero-section.tsx` | 2 |
| `src/components/sections/cta-section.tsx` | 2 |
| `src/app/[locale]/services/page.tsx` | 2 |
| `src/components/sections/process-section.tsx` | 3 |
| `src/components/sections/testimonials-section.tsx` | 3 |
| `src/components/ui/ProjectImageCarousel.tsx` | 3 |
| `messages/*.json` | 2, 3 |
| `src/components/animations/ParticleNetwork.tsx` | 3 |
| Dark mode / ThemeProvider | 4 |

---

## Phụ lục B — So sánh Before / After (tóm tắt)

| Khía cạnh | Before | After |
|-----------|--------|-------|
| Theme | 3 visual languages lẫn lộn | 1 light theme + demo sandbox |
| Primary | Blue generic `#3B82F6` | Indigo `#6366F1` |
| Accent | Gray `#F4F4F5` (sai) | Violet `#8B5CF6` |
| Gradient text | Gần invisible | Indigo → Violet rõ |
| Cards on About | `bg-card/30` invisible | White + shadow |
| Demos gallery | Dark, text trắng trên nền sáng | Light cards, token colors |
| Icons | Emoji + wrong social icons | Lucide throughout |
| Buttons | 3 styles khác nhau | 2 tiers: CTA rounded-full + default rounded-lg |
| i18n | Partial English leaks | Full 5-locale |

---

*Tài liệu này là blueprint triển khai. Bắt đầu từ Phase 1 để có impact lớn nhất với effort nhỏ nhất.*
