# Kế Hoạch Chi Tiết Cải Tiến UI/UX — Modern Tech Agency

> **Ngày:** 10/06/2026
> **Base plan:** `docs/UI-UX-IMPROVEMENT-PLAN.md`
> **Images plan:** `docs/complete-images-plan.md`, `docs/demo-images-plan.md`

---

## Phase 1 — Foundation (Nền tảng)

**Mục tiêu:** Xóa bỏ "dark-glass on light", thống nhất design tokens, fix lỗi cơ bản.

### Task 1.1 — Design tokens (đã gần xong)
- `globals.css`: `--primary: #6366F1`, `--accent: #8B5CF6`, `--background: #FAFAFA` ✅
- Gradient tokens: `--gradient-brand`, `--gradient-cta` ✅
- Utility: `.text-gradient`, `.glass`, `.surface-elevated` ✅
- **Cần verify:** `.text-gradient` hiển thị indigo→violet

### Task 1.2 — Xóa `border-white/*` và `bg-white/5`
| File | Change |
|------|--------|
| `about/page.tsx` | `border-white/5`→`border-border`, `bg-card/30`→`bg-card`, `border-white/10`→`border-border` |
| `contact/page.tsx` | `border-white/10 bg-card/40`→`border-border bg-card shadow-sm` |
| `projects-client.tsx` | `border-white/10`→`border-border`, `bg-white/5`→`bg-secondary`, `bg-background/85`→`bg-secondary` |
| `projects/[slug]/page.tsx` | `border-white/10`→`border-border`, `bg-white/5`→`bg-secondary/50`, `bg-card/40`→`bg-card` |
| `demos/page.tsx` | Full dark→light: `text-white`→`text-foreground`, `text-gray-400`→`text-muted-foreground`, `bg-white/5`→`bg-card`, `border-white/10`→`border-border` |

### Task 1.3 — Fix About hero radial gradient
- `about/page.tsx:37`: Sai `hsl(var(--primary)/0.08)` vì `--primary` là hex
- Fix: `color-mix(in srgb, var(--primary) 8%, transparent)`

### Task 1.4 — Fix FormFeedback
- `form-feedback.tsx:212`: `text-white/80` → `text-foreground` / `text-green-800` / `text-red-800`
- Loading spinner: `border-white/30 border-t-white` → `border-primary/30 border-t-primary`

### Task 1.5 — Fix Footer social icons
- `site-footer.tsx`: GitBranch→Github, Briefcase→Linkedin, Share2→Facebook

### Task 1.6 — Remove duplicate header/footer trong DemoLayout
- `demo-layout.tsx`: Xóa SiteHeader/SiteFooter (đã có trong `[locale]/layout.tsx`)
- Chuyển `bg-black text-white` thành `bg-background text-foreground`

### Task 1.7 — ParticleNetwork light variant
- Thêm prop `variant`, light: bg `#FAFAFA`, particles `#6366F1` opacity 0.3

---

## Phase 2 — Component Polish

**Mục tiêu:** Button, card, form, pages chính thống nhất visual.

### Task 2.1 — Button variants
- `button.tsx`: Thêm variant `cta` (rounded-full, shadow) và `filter`

### Task 2.2 — About page redesign
- Emoji→Lucide: ⌨️→Code2, 📱→Smartphone, 🏗️→Layers, 🎯→Target
- Icon boxes: nền màu riêng mỗi icon
- Skills bars: `bg-muted` track, `from-indigo-500 to-violet-500` fill
- Stats: `bg-card border-border shadow-sm`

### Task 2.3 — Services data color
- `services.ts`: Cập nhật color/gradient theo §5.4

### Task 2.4 — Services icon wrapper
- `services/page.tsx:73`: Fix `text-transparent bg-clip-text` conflict

### Task 2.5 — Pricing Pro badge
- Thêm "Popular" badge trên tier Pro

### Task 2.6 — Contact icon boxes
- Wrap icons trong `h-10 w-10 rounded-xl bg-primary/10`

### Task 2.7 — Hero contrast
- Perf card `text-primary-foreground/90`→`text-foreground`
- Thêm radial glow bg

### Task 2.8 — CTA gradient token
- Dùng `--gradient-cta` CSS variable

### Task 2.9 — Projects filter pills
- `border-border bg-card` inactive, `border-primary bg-primary/10` active
- Empty state: i18n + SVG illustration

### Task 2.10 — Demos gallery light theme
- Category filter chips
- Hero `.text-gradient`

---

## Phase 3 — Enhancement

### Task 3.1 — Process section
- Step colors per step
- Connector line

### Task 3.2 — Testimonials avatars
- Avatar circle với initials

### Task 3.3 — Featured projects overlay
- Badge `bg-indigo-500/90 text-white`

### Task 3.4 — Tech stack logos
- SVG logos thay text pills

### Task 3.5 — Carousel fixes
- Dots, controls contrast

### Task 3.6 — i18n bổ sung
- About stats, Projects, Demos, 404

### Task 3.7 — DemoButton component

### Task 3.8 — Image generation (92 images)
- **45 images mới:** OG (6), Site (6), Testimonials (3), Projects (20), Tech Stack (10)
- **47 images demos** (kế thừa từ demo-images-plan.md)
- Tích hợp SafeImage vào các components

---

## Phase 4 — Optional

### Task 4.1 — Dark mode toggle
### Task 4.2 — Component cleanup
### Task 4.3 — 404 illustration
### Task 4.4 — OG images
### Task 4.5 — Accessibility audit

---

## Hình ảnh các trang (After)

### Trang Home (`/`)
```
After: Badge dot pulse, gradient rõ indigo→violet, CTA shadow, radial glow
```

### Trang About (`/about`) ⚡ Priority
```
After: Card trắng border-border shadow, Lucide icons, skills bars gradient
```

### Trang Services (`/services`)
```
After: Icon gradient solid, "Popular" badge Pro, FAQ token colors
```

### Trang Projects List (`/projects`)
```
After: Filter pills light, card trắng shadow-sm, SVG illustration empty state
```

### Trang Project Detail (`/projects/[slug]`)
```
After: ParticleNetwork light variant, border-border, bg-secondary tags
```

### Trang Contact (`/contact`)
```
After: surface-elevated, icon boxes bg-primary/10
```

### Trang Demos Gallery (`/demos`)
```
After: Light theme, text-gradient, card trắng, category filter
```

### Trang Demo Pages (×8)
```
After: Single header/footer, dark interior trong container
```
