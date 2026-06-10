# Kế hoạch Ảnh Toàn Diện — Modern Tech Agency

> **Tài liệu tổng hợp:** Tất cả ảnh cần tạo cho toàn bộ website (92 images)  
> **Tích hợp:** Kế thừa từ `docs/demo-images-plan.md`  
> **Fallback:** `public/images/default.png` — hiển thị khi ảnh chưa có  
> **Component:** `src/components/ui/safe-image.tsx` — tự động fallback

---

## Mục lục

1. [Tổng quan cấu trúc thư mục](#1-tổng-quan-cấu-trúc-thư-mục)
2. [Nhóm 1: Site Marketing (21 ảnh)](#2-nhóm-1-site-marketing-21-ảnh)
3. [Nhóm 2: Projects (20 ảnh)](#3-nhóm-2-projects-20-ảnh)
4. [Nhóm 3: Tech Stack (10 ảnh)](#4-nhóm-3-tech-stack-10-ảnh)
5. [Nhóm 4: Testimonials (3 ảnh)](#5-nhóm-4-testimonials-3-ảnh)
6. [Nhóm 5: Demos (47 ảnh — kế thừa từ demo-images-plan.md)](#6-nhóm-5-demos-47-ảnh)
7. [Tổng hợp số lượng](#7-tổng-hợp-số-lượng)
8. [Hướng dẫn triển khai](#8-hướng-dẫn-triển-khai)

---

## 1. Tổng quan cấu trúc thư mục

```
public/images/
├── default.png                        # Fallback — ảnh mặc định khi chưa có
│
├── og/                                # Open Graph images (6)
│   ├── home.webp
│   ├── about.webp
│   ├── services.webp
│   ├── projects.webp
│   ├── contact.webp
│   └── demos.webp
│
├── site/                              # Ảnh trang marketing (6)
│   ├── hero-bg.webp
│   ├── hero-illustration.webp
│   ├── about-avatar.webp
│   ├── about-team.webp
│   ├── 404.webp
│   └── error.webp
│
├── projects/                          # Project covers + gallery (20)
│   ├── ecommerce-analytics.webp
│   ├── ecommerce-analytics-1.webp
│   ├── ecommerce-analytics-2.webp
│   ├── fitness-companion-app.webp
│   ├── fitness-companion-app-1.webp
│   ├── saas-landing-rebrand.webp
│   ├── saas-landing-rebrand-1.webp
│   ├── booking-portal-web.webp
│   ├── booking-portal-web-1.webp
│   ├── corporate-identity.webp
│   ├── corporate-identity-1.webp
│   ├── corporate-identity-2.webp
│   ├── product-catalog.webp
│   ├── product-catalog-1.webp
│   ├── fashion-brand.webp
│   ├── fashion-brand-1.webp
│   ├── ordering-app.webp
│   ├── driver-app.webp
│   ├── ecommerce-platform.webp
│   └── language-learning.webp
│
├── testimonials/                      (3)
│   ├── author-a.webp
│   ├── author-b.webp
│   └── author-c.webp
│
├── tech-stack/                        # Logo dạng SVG (10)
│   ├── react.svg
│   ├── nextjs.svg
│   ├── flutter.svg
│   ├── typescript.svg
│   ├── tailwindcss.svg
│   ├── nodejs.svg
│   ├── firebase.svg
│   ├── postgresql.svg
│   ├── docker.svg
│   └── vercel.svg
│
├── services/                          # Đã có sẵn (12 ảnh)
│   ├── web-1.webp ... web-3.webp
│   ├── mobile-1.webp ... mobile-3.webp
│   ├── uiux-1.webp ... uiux-3.webp
│   └── backend-1.webp ... backend-3.webp
│
└── demos/                             # Demo showcases (47 ảnh)
    ├── corporate/
    ├── fashion/
    ├── ordering-app/
    ├── product-catalog/
    ├── ecommerce/
    ├── driver-app/
    ├── note-app/
    └── language-app/
```

---

## 2. Nhóm 1: Site Marketing (21 ảnh mới)

### 2.1 Open Graph Images (6)

> Kích thước: 1200×630px (OG standard), WebP, <100KB

| File | Prompt |
|------|--------|
| `og/home.webp` | *Modern tech agency branding, indigo-violet gradient background (from #6366F1 to #8B5CF6), geometric abstract shapes and grid patterns, professional SaaS aesthetic, clean minimal design with negative space in center for text overlay, 1200×630px* |
| `og/about.webp` | *Team collaboration concept, abstract silhouettes connected by glowing lines, warm indigo background, professional agency atmosphere, clean modern design, 1200×630px* |
| `og/services.webp` | *Isometric service icons floating (code symbol, palette, server, smartphone), connected by glowing trails, indigo-violet gradient background, clean tech illustration style, 1200×630px* |
| `og/projects.webp` | *Abstract project dashboard visualization, colorful charts and data cards floating in 3D space, dark-indigo background, technology portfolio aesthetic, 1200×630px* |
| `og/contact.webp` | *Minimalist communication concept, glowing message bubble and location pin, indigo gradient background, clean professional design, 1200×630px* |
| `og/demos.webp` | *Showcase display with floating app icons and demo interface mockups, indigo-violet gradient background, modern portfolio aesthetic, 1200×630px* |

### 2.2 Site Illustrations (6)

| File | Kích thước | Prompt |
|------|-----------|--------|
| `site/hero-bg.webp` | 1920×1080 | *Subtle tech grid pattern on very light warm background (#FAFAFA), faint indigo glow at top-right corner, minimal barely visible texture, modern SaaS website hero background, no text, clean professional* |
| `site/hero-illustration.webp` | 600×500 | *Modern 3D isometric illustration of web development, glowing indigo and violet accents, floating UI elements and code snippets, clean flat design with subtle shadows, tech agency style* |
| `site/about-avatar.webp` | 400×400 | *Professional tech team member portrait, modern business casual attire, friendly confident smile, warm studio lighting, blurred modern office background, professional headshot style* |
| `site/about-team.webp` | 1200×800 | *Diverse tech team collaborating around a modern office table, laptops and sketches visible, bright natural lighting, modern minimalist office interior, warm collaborative atmosphere* |
| `site/404.webp` | 600×600 | *Creative 404 illustration, floating broken link chain or puzzle piece, indigo-violet gradient colors, minimal flat vector style, cute but professional, transparent background friendly* |
| `site/error.webp` | 600×600 | *Error state illustration, exclamation mark in circle with subtle gear elements, indigo-red gradient colors, minimal flat vector style, clean professional, technical but approachable* |

### 2.3 Testimonials Avatars (3)

> Kích thước: 200×200px, WebP, <50KB

| File | Prompt |
|------|--------|
| `testimonials/author-a.webp` | *Professional Asian female portrait, business casual attire, confident natural smile, modern tech office background blurred, warm professional studio lighting, corporate headshot style* |
| `testimonials/author-b.webp` | *Professional Caucasian male portrait with glasses, tech industry look, friendly confident expression, modern office background blurred, cool professional lighting, corporate headshot style* |
| `testimonials/author-c.webp` | *Professional African American female portrait, natural curly hair, modern smart casual outfit, warm genuine smile, blurred creative office background, professional headshot style* |

---

## 3. Nhóm 2: Projects (20 ảnh)

> Kích thước cover: 1200×800px, gallery: 1200×800px, WebP, <150KB  
> Đây là ảnh thay thế cho Unsplash URLs hiện tại trong `src/data/projects-base.ts`

| File | Prompt |
|------|--------|
| `projects/ecommerce-analytics.webp` | *Modern analytics dashboard interface mockup, colorful charts and graphs, dark theme with indigo accent, data visualization, isometric 3D data elements floating, professional SaaS style* |
| `projects/ecommerce-analytics-1.webp` | *Interactive data charts visualization, glowing line graphs and bar charts, futuristic UI, dark indigo background, clean data science aesthetic* |
| `projects/ecommerce-analytics-2.webp` | *Sales funnel and conversion metrics, 3D colorful infographic elements, modern business analytics style, clean dark interface with purple accents* |
| `projects/fitness-companion-app.webp` | *Fitness app interface mockup, iPhone frame, workout tracking screen, progress charts, vibrant green and blue gradient, modern mobile UI design, clean and energetic* |
| `projects/fitness-companion-app-1.webp` | *Fitness tracker watch and phone side by side, workout statistics overlay, motivational theme, orange and blue accents, modern health-tech aesthetic* |
| `projects/saas-landing-rebrand.webp` | *Modern SaaS landing page design mockup on laptop screen, clean hero section with gradient, testimonial cards, clean white and indigo theme, professional web design* |
| `projects/saas-landing-rebrand-1.webp` | *Website wireframe to final design transformation, before-after comparison, glowing design elements, purple gradient, UI/UX design process visualization* |
| `projects/booking-portal-web.webp` | *Booking platform interface, calendar widget, reservation list, hotel listing cards, modern clean UI, blue-indigo color scheme, professional web app design* |
| `projects/booking-portal-web-1.webp` | *Payment checkout interface mockup, secure payment badge, credit card form, order summary, clean green and indigo accents, modern e-commerce design* |
| `projects/corporate-identity.webp` | *Corporate brand identity collection, business cards, letterhead, brand guidelines book, mockup on desk, premium minimal aesthetic, indigo and gold accents* |
| `projects/corporate-identity-1.webp` | *Modern corporate website on multiple devices (desktop, tablet, mobile), clean professional layout, dark blue theme, business technology aesthetic* |
| `projects/corporate-identity-2.webp` | *Brand style guide spread, color palette, typography showcase, logo variations, clean layout on white background, professional branding mockup* |
| `projects/product-catalog.webp` | *E-commerce product grid catalog interface, product cards with images and prices, filter sidebar, modern clean design, emerald green accents, professional shop UI* |
| `projects/product-catalog-1.webp` | *Product detail page mockup, large product image gallery, descriptions and reviews section, add to cart button, clean minimalist e-commerce design* |
| `projects/fashion-brand.webp` | *Luxury fashion brand website on MacBook mockup, full-screen hero image, elegant typography, premium dark aesthetic, rose gold accents, high-end fashion feel* |
| `projects/fashion-brand-1.webp` | *Fashion collection grid, model photos, product cards with hover effects, minimalist luxury design, warm beige and rose palette, editorial style* |
| `projects/ordering-app.webp` | *Food ordering mobile app interface, restaurant menu screen, food items with prices, add to cart button, vibrant orange theme, clean modern mobile UI* |
| `projects/driver-app.webp` | *Ride-hailing driver app interface, map view with route, driver stats dashboard, earnings chart, accepting ride request screen, dark navy theme with red accents* |
| `projects/ecommerce-platform.webp` | *Multi-vendor marketplace platform interface, vendor store cards, product listings, shopping cart, clean modern design, amber and orange accents, professional UI* |
| `projects/language-learning.webp` | *Language learning app interface, flashcard screen, lesson progress, vocabulary quiz UI, multiple language flags, cyan blue gradient theme, educational app design* |

---

## 4. Nhóm 3: Tech Stack (10 SVG logos)

> Định dạng: SVG (vector), mỗi logo là SVG thuần, viewBox="0 0 24 24" hoặc tương ứng

| File | Mô tả thiết kế |
|------|---------------|
| `tech-stack/react.svg` | React logo với màu #61DAFB (cyan), biểu tượng nguyên tử đặc trưng, SVG thuần |
| `tech-stack/nextjs.svg` | Next.js logo với màu #000000, chữ "Next.js" hoặc biểu tượng "N" đặc trưng |
| `tech-stack/flutter.svg` | Flutter logo với màu #02569B (xanh dương), biểu tượng Flutter đặc trưng |
| `tech-stack/typescript.svg` | TypeScript logo với màu #3178C6 (xanh dương), chữ "TS" trên nền vuông |
| `tech-stack/tailwindcss.svg` | Tailwind CSS logo với màu #06B6D4 (teal), biểu tượng cánh gió đặc trưng |
| `tech-stack/nodejs.svg` | Node.js logo với màu #339933 (xanh lá), chữ "node" hoặc hexagon đặc trưng |
| `tech-stack/firebase.svg` | Firebase logo với màu #FFCA28 (vàng), biểu tượng lửa đặc trưng |
| `tech-stack/postgresql.svg` | PostgreSQL logo với màu #4169E1 (xanh dương), biểu tượng con voi đặc trưng |
| `tech-stack/docker.svg` | Docker logo với màu #2496ED (xanh dương), biểu tượng container đặc trưng |
| `tech-stack/vercel.svg` | Vercel logo với màu #000000, biểu tượng chữ V đặc trưng |

---

## 5. Nhóm 4: Testimonials (3 ảnh)

> Đã liệt kê ở mục 2.3. Testimonial avatars dùng ảnh người thật phong cách studio.

---

## 6. Nhóm 5: Demos (47 ảnh)

> **Kế thừa hoàn toàn từ:** `docs/demo-images-plan.md`  
> **Cấu trúc thư mục con trong:** `public/images/demos/<slug>/`

### 6.1 Corporate — Enterprise SaaS (7 ảnh)

**Products (800×800px):**

| File | Prompt |
|------|--------|
| `demos/corporate/corp-1.webp` | *Sleek 3D illustration of cloud infrastructure, interconnected server nodes floating in dark blue digital space, glowing cyan data streams, minimalist flat design, dark theme, clean product showcase, soft rim lighting* |
| `demos/corporate/corp-2.webp` | *Modern API gateway network visualization, glowing connection nodes forming a shield shape, blue and cyan neon accents, abstract tech illustration, isometric style, dark background* |
| `demos/corporate/corp-3.webp` | *Business intelligence analytics dashboard mockup, 3D colorful charts and graphs floating, futuristic UI elements, blue-purple gradient background, clean data visualization style* |
| `demos/corporate/corp-4.webp` | *Cybersecurity concept, glowing shield with lock icon, digital protection aura, blue and teal neon accents, matrix-like data streams in background, dark theme* |
| `demos/corporate/corp-5.webp` | *Workflow automation visualization, flowchart with glowing connected nodes, process arrows forming cycle, minimalist tech style, blue-cyan color palette, dark background* |

**Avatars (200×200px):**

| File | Prompt |
|------|--------|
| `demos/corporate/corp-user-1.webp` | *Professional Asian female portrait, business casual attire, confident natural smile, modern tech office background blurred, warm professional studio lighting, corporate headshot style* |
| `demos/corporate/corp-user-2.webp` | *Professional Hispanic male portrait with glasses, tech industry look, friendly confident expression, modern office background blurred, cool professional lighting, corporate headshot style* |

### 6.2 Fashion — Luxury Brand (6 ảnh)

**Products (800×800px):**

| File | Prompt |
|------|--------|
| `demos/fashion/fashion-1.webp` | *Luxurious silk evening gown on elegant mannequin, deep navy color, delicate floral embroidery detail on bodice, dramatic studio lighting with soft shadows, dark elegant background, high-end fashion photography style* |
| `demos/fashion/fashion-2.webp` | *Italian premium leather handbag with visible texture, gold-plated hardware, rich brown color, angled view showing interior, soft studio lighting on marble surface, minimalist luxury product photography* |
| `demos/fashion/fashion-3.webp` | *Premium cashmere coat elegantly draped, warm camel color, visible soft fabric texture, minimal studio setting with dramatic side lighting, high-end fashion editorial style* |
| `demos/fashion/fashion-4.webp` | *Elegant diamond necklace on black velvet display bust, sparkling brilliant-cut diamonds, platinum chain, dramatic spotlight with sparkle effects, luxury jewelry photography, very dark background* |
| `demos/fashion/fashion-5.webp` | *Designer stiletto high heels, black patent leather with red sole, elegant angled side view, studio lighting creating reflections, fashion editorial style, minimalist grey background* |

**Avatars (200×200px):**

| File | Prompt |
|------|--------|
| `demos/fashion/fashion-user-1.webp` | *Elegant young Caucasian female portrait, fashion industry style, chic minimal outfit, soft natural window lighting, blurred luxury boutique background with mannequins* |

### 6.3 Ordering App — Food Delivery (6 ảnh)

**Products (400×400px):**

| File | Prompt |
|------|--------|
| `demos/ordering-app/order-1.webp` | *Juicy gourmet beef burger on wooden board, melted cheddar cheese dripping, fresh lettuce tomato slice, sesame bun, side of crispy fries, warm golden lighting, shallow depth of field, professional food photography* |
| `demos/ordering-app/order-2.webp` | *Wood-fired vegetarian pizza on rustic wooden peel, fresh bell peppers mushrooms olives, melted mozzarella cheese, basil leaves, slight char on crust, warm cozy lighting, top-down angle* |
| `demos/ordering-app/order-3.webp` | *Golden crispy chicken wings stacked on dark slate plate, glazed with BBQ sauce, small bowl of ranch dip, parsley garnish, steam rising slightly, warm amber lighting* |
| `demos/ordering-app/order-4.webp` | *Fresh Caesar salad in rustic wooden bowl, crisp romaine lettuce, grated parmesan, crunchy croutons, lemon wedge on side, vibrant green colors, bright natural lighting* |
| `demos/ordering-app/order-5.webp` | *Warm fudgy chocolate brownie in small cast iron skillet, melting center, vanilla ice cream scoop on top, chocolate sauce drizzle, warm dessert mood lighting, steam visible* |

**Avatars (200×200px):**

| File | Prompt |
|------|--------|
| `demos/ordering-app/order-user-1.webp` | *Casual young Caucasian male portrait, friendly smile, holding smartphone slightly visible, warm cafe restaurant background blurred, relaxed foodie lifestyle look* |

### 6.4 Product Catalog — E-commerce (7 ảnh)

**Products (800×800px):**

| File | Prompt |
|------|--------|
| `demos/product-catalog/catalog-1.webp` | *Premium over-ear wireless headphones on minimalist display stand, sleek matte black design with silver metallic accents, clean white studio background, soft even lighting, product catalog style* |
| `demos/product-catalog/catalog-2.webp` | *Ultra-slim 32-inch 4K monitor on modern wooden desk, screen showing colorful graphic design workspace, mechanical keyboard beside, plants in background, soft ambient lighting* |
| `demos/product-catalog/catalog-3.webp` | *Premium ergonomic office chair with lumbar support, black mesh back and cushion, adjustable armrests, modern office setting with plants, clean professional product photography* |
| `demos/product-catalog/catalog-4.webp` | *Full-size RGB mechanical keyboard with colorful per-key backlighting, aluminum frame visible, on dark desk mat, gaming setup aesthetic, vibrant but professional lighting* |
| `demos/product-catalog/catalog-5.webp` | *Minimalist adjustable LED desk lamp with sleek metal arm, warm and cool light modes, on clean wooden desk, soft shadows, modern product photography, white/beige background* |
| `demos/product-catalog/catalog-6.webp` | *Modern sleek smart scale with glass surface, minimalist white design, on bathroom tile floor, clean bright lighting, healthy lifestyle product photography* |

**Avatars (200×200px):**

| File | Prompt |
|------|--------|
| `demos/product-catalog/catalog-user-1.webp` | *Creative young male portrait, artistic stylish look, modern casual outfit, blurred creative studio with tech equipment background, warm natural lighting* |

### 6.5 Ecommerce — Marketplace (8 ảnh)

**Products (400×400px):**

| File | Prompt |
|------|--------|
| `demos/ecommerce/market-1.webp` | *Black wireless charging pad on wooden desk, smartphone placed on it showing charging animation, green LED indicator glowing, minimalist desk setup, clean lifestyle product shot* |
| `demos/ecommerce/market-2.webp` | *Slim minimalist RFID-blocking leather wallet opened showing card slots, rich brown leather texture visible, flat lay on wooden surface, soft natural window lighting* |
| `demos/ecommerce/market-3.webp` | *Smart LED desk lamp with built-in wireless charging base, modern adjustable design, warm ambient glow illuminating desk surface, clean contemporary workspace* |
| `demos/ecommerce/market-4.webp` | *Designer oversized sunglasses with gradient black lenses, thick acetate frame, angled creative view, golden hour sunlight creating reflections, fashion accessory product shot* |

**Vendors (600×400px):**

| File | Prompt |
|------|--------|
| `demos/ecommerce/vendor-1.webp` | *Modern electronics retail store interior, clean organized shelves with gadgets and devices, blue accent lighting, minimal customer in background, bright tech retail atmosphere* |
| `demos/ecommerce/vendor-2.webp` | *Boutique fashion store interior display, curated clothing racks and mannequins, warm cozy lighting, elegant interior design with mirrors, empty stylish boutique atmosphere* |
| `demos/ecommerce/vendor-3.webp` | *Modern home goods store interior, tasteful furniture displays and decor items, bright welcoming atmosphere with plants, clean organized retail space* |

**Avatars (200×200px):**

| File | Prompt |
|------|--------|
| `demos/ecommerce/market-user-1.webp` | *Young Asian female portrait, happy expression holding shopping bags, modern retail environment background blurred, warm lifestyle photography style* |

### 6.6 Driver App — Ride-hailing (4 ảnh)

**Vehicles (600×400px):**

| File | Prompt |
|------|--------|
| `demos/driver-app/tesla-model-3.webp` | *Tesla Model 3 in clean white color, three-quarter front angle, parked on modern city street, golden hour sunset lighting, professional automotive photography, sharp and clean* |
| `demos/driver-app/uber-black.webp` | *Premium black luxury sedan, polished exterior reflecting city lights, front angled view, night urban setting with bokeh lights, professional automotive photography* |

**Avatars (200×200px):**

| File | Prompt |
|------|--------|
| `demos/driver-app/driver-1.webp` | *Professional African American male portrait, smart casual polo shirt, friendly confident smile, blurred city street background with cars, driver profile style* |
| `demos/driver-app/driver-2.webp` | *Professional young Asian female portrait, casual smart outfit, warm genuine smile, blurred urban cityscape background, driver profile photography style* |

### 6.7 Note App — Productivity (4 ảnh)

**Folder icons (200×200px):**

| File | Prompt |
|------|--------|
| `demos/note-app/folder-1.webp` | *Minimalist folder icon with document and chart graphic, blue slate color scheme, clean flat vector illustration style on transparent background, simple professional* |
| `demos/note-app/folder-2.webp` | *Minimalist folder icon with heart and person silhouette, warm purple-indigo color scheme, clean flat vector illustration style on transparent background* |
| `demos/note-app/folder-3.webp` | *Minimalist folder icon with lightbulb and sparkle graphic, amber-yellow color scheme, clean flat vector illustration style on transparent background* |

**Screenshot (1200×800px):**

| File | Prompt |
|------|--------|
| `demos/note-app/editor-preview.webp` | *Dark mode note-taking app UI mockup, three-panel layout with folder sidebar, notes list, and text editor open showing markdown content, indigo accent color, clean modern interface design* |

### 6.8 Language App — Learning (5 ảnh)

**Courses (600×400px):**

| File | Prompt |
|------|--------|
| `demos/language-app/course-1.webp` | *Spanish language learning illustration, colorful flamenco dancer silhouette, Spain flag red and yellow colors, books and speech bubbles, vibrant educational vector style* |
| `demos/language-app/course-2.webp` | *French language learning illustration, elegant Eiffel Tower silhouette, France flag blue white red colors, open book with speech bubbles, educational vector style* |

**Flags (200×200px):**

| File | Prompt |
|------|--------|
| `demos/language-app/spain.webp` | *Spain flag minimalist round icon, red and yellow horizontal stripes, clean flat vector design on transparent background, scalable icon style* |
| `demos/language-app/france.webp` | *France flag minimalist round icon, blue white and red vertical stripes, clean flat vector design on transparent background, scalable icon style* |

**Screenshot (1200×800px):**

| File | Prompt |
|------|--------|
| `demos/language-app/lesson-preview.webp` | *Language learning mobile app UI mockup, vocabulary flashcards interface, progress bars and streak counter, cyan blue accent color, clean modern educational app design* |

---

## 7. Tổng hợp số lượng

| Nhóm | Số lượng | Directory |
|------|----------|-----------|
| **OG Images** | 6 | `public/images/og/` |
| **Site Illustrations** | 6 | `public/images/site/` |
| **Testimonials** | 3 | `public/images/testimonials/` |
| **Projects** | 20 | `public/images/projects/` |
| **Tech Stack** | 10 | `public/images/tech-stack/` |
| **Subtotal (mới)** | **45** | |
| **Services** | 12 | `public/images/services/` (đã có) |
| **Demos** | 47 | `public/images/demos/` |
| **Total** | **92** | |

---

## 8. Hướng dẫn triển khai

### Bước 1: Tạo ảnh bằng AI
- Công cụ: **Midjourney v6** (thêm `--ar 16:9 --v 6` cho og/projects), **DALL-E 3**, **Stable Diffusion XL**
- Export WebP, resize đúng kích thước quy định
- Nén bằng squoosh.app hoặc tinypng.com (<100KB mỗi ảnh)

### Bước 2: Lưu ảnh vào đúng thư mục
- Copy ảnh theo cấu trúc ở mục 1

### Bước 3: Cập nhật code
- Dùng `SafeImage` component thay thế các `<Image>` và `<img>` hiện tại
- Cập nhật `projects-base.ts` — đổi Unsplash URLs → `/images/projects/<slug>.webp`
- Cập nhật `services-preview-section.tsx` — `<img>` → `<SafeImage>`
- Cập nhật `services-gallery.tsx` — `<img>` → `<SafeImage>`
- Cập nhật `featured-projects-section.tsx` — dùng SafeImage
- Cập nhật `project detail page` — dùng SafeImage
- Cập nhật demo pages — dùng SafeImage thay emoji

### Bước 4: Kiểm tra
- `npx tsc --noEmit` — check TypeScript
- `npm run lint` — check ESLint
- Kiểm tra trực quan — ảnh fallback hiển thị default.png khi ảnh chưa có

---

*Tài liệu này là blueprint tạo ảnh toàn diện. Sau khi generate xong tất cả ảnh, update code theo mapping ở trên.*
