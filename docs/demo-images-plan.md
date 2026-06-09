# Demo Images Generation & Integration Plan

## 1. Thư mục lưu ảnh

Tất cả ảnh đặt trong `public/images/demos/<demo-slug>/`:

```
public/images/demos/
├── corporate/
│   ├── products/
│   │   ├── corp-1.webp
│   │   ├── corp-2.webp
│   │   ├── corp-3.webp
│   │   ├── corp-4.webp
│   │   └── corp-5.webp
│   └── avatars/
│       ├── corp-user-1.webp
│       └── corp-user-2.webp
│
├── fashion/
│   ├── products/
│   │   ├── fashion-1.webp
│   │   ├── fashion-2.webp
│   │   ├── fashion-3.webp
│   │   ├── fashion-4.webp
│   │   └── fashion-5.webp
│   └── avatars/
│       └── fashion-user-1.webp
│
├── ordering-app/
│   ├── products/
│   │   ├── order-1.webp
│   │   ├── order-2.webp
│   │   ├── order-3.webp
│   │   ├── order-4.webp
│   │   └── order-5.webp
│   └── avatars/
│       └── order-user-1.webp
│
├── product-catalog/
│   ├── products/
│   │   ├── catalog-1.webp
│   │   ├── catalog-2.webp
│   │   ├── catalog-3.webp
│   │   ├── catalog-4.webp
│   │   ├── catalog-5.webp
│   │   └── catalog-6.webp
│   └── avatars/
│       └── catalog-user-1.webp
│
├── ecommerce/
│   ├── products/
│   │   ├── market-1.webp
│   │   ├── market-2.webp
│   │   ├── market-3.webp
│   │   └── market-4.webp
│   ├── vendors/
│   │   ├── vendor-1.webp
│   │   ├── vendor-2.webp
│   │   └── vendor-3.webp
│   └── avatars/
│       └── market-user-1.webp
│
├── driver-app/
│   ├── vehicles/
│   │   ├── tesla-model-3.webp
│   │   └── uber-black.webp
│   └── avatars/
│       ├── driver-1.webp
│       └── driver-2.webp
│
├── note-app/
│   ├── folders/
│   │   ├── folder-1.webp
│   │   ├── folder-2.webp
│   │   └── folder-3.webp
│   └── screenshots/
│       └── editor-preview.webp
│
└── language-app/
    ├── courses/
    │   ├── course-1.webp
    │   └── course-2.webp
    ├── flags/
    │   ├── spain.webp
    │   └── france.webp
    └── screenshots/
        └── lesson-preview.webp
```

**Quy ước:**
- Định dạng: **WebP** (dung lượng nhỏ, hỗ trợ trong suốt)
- Kích thước: products ~800x800px, avatars ~200x200px, screenshots ~1200x800px
- Dung lượng: <100KB mỗi ảnh (dùng tinypng.com hoặc squoosh.app sau khi generate)

---

## 2. Prompts tạo ảnh AI

> **Công cụ đề xuất:** Midjourney v6 / DALL-E 3 / Stable Diffusion XL
> *Đuôi `--ar 1:1 --v 6` dành cho Midjourney*

---

### A. Corporate — Enterprise SaaS (8 ảnh)

**Products (800x800px):**

| File | Prompt |
|------|--------|
| `corp-1.webp` | *Sleek 3D illustration of cloud infrastructure, interconnected server nodes floating in dark blue digital space, glowing cyan data streams, minimalist flat design, dark theme, clean product showcase, soft rim lighting* |
| `corp-2.webp` | *Modern API gateway network visualization, glowing connection nodes forming a shield shape, blue and cyan neon accents, abstract tech illustration, isometric style, dark background* |
| `corp-3.webp` | *Business intelligence analytics dashboard mockup, 3D colorful charts and graphs floating, futuristic UI elements, blue-purple gradient background, clean data visualization style* |
| `corp-4.webp` | *Cybersecurity concept, glowing shield with lock icon, digital protection aura, blue and teal neon accents, matrix-like data streams in background, dark theme* |
| `corp-5.webp` | *Workflow automation visualization, flowchart with glowing connected nodes, process arrows forming cycle, minimalist tech style, blue-cyan color palette, dark background* |

**Avatars (200x200px):**

| File | Prompt |
|------|--------|
| `corp-user-1.webp` | *Professional Asian female portrait, business casual attire, confident natural smile, modern tech office background blurred, warm professional studio lighting, corporate headshot style* |
| `corp-user-2.webp` | *Professional Hispanic male portrait with glasses, tech industry look, friendly confident expression, modern office background blurred, cool professional lighting, corporate headshot style* |

---

### B. Fashion — Luxury Brand (6 ảnh)

**Products (800x800px):**

| File | Prompt |
|------|--------|
| `fashion-1.webp` | *Luxurious silk evening gown on elegant mannequin, deep navy color, delicate floral embroidery detail on bodice, dramatic studio lighting with soft shadows, dark elegant background, high-end fashion photography style* |
| `fashion-2.webp` | *Italian premium leather handbag with visible texture, gold-plated hardware, rich brown color, angled view showing interior, soft studio lighting on marble surface, minimalist luxury product photography* |
| `fashion-3.webp` | *Premium cashmere coat elegantly draped, warm camel color, visible soft fabric texture, minimal studio setting with dramatic side lighting, high-end fashion editorial style* |
| `fashion-4.webp` | *Elegant diamond necklace on black velvet display bust, sparkling brilliant-cut diamonds, platinum chain, dramatic spotlight with sparkle effects, luxury jewelry photography, very dark background* |
| `fashion-5.webp` | *Designer stiletto high heels, black patent leather with red sole, elegant angled side view, studio lighting creating reflections, fashion editorial style, minimalist grey background* |

**Avatars (200x200px):**

| File | Prompt |
|------|--------|
| `fashion-user-1.webp` | *Elegant young Caucasian female portrait, fashion industry style, chic minimal outfit, soft natural window lighting, blurred luxury boutique background with mannequins* |

---

### C. Ordering App — Food Delivery (6 ảnh)

**Products (400x400px):**

| File | Prompt |
|------|--------|
| `order-1.webp` | *Juicy gourmet beef burger on wooden board, melted cheddar cheese dripping, fresh lettuce tomato slice, sesame bun, side of crispy fries, warm golden lighting, shallow depth of field, professional food photography* |
| `order-2.webp` | *Wood-fired vegetarian pizza on rustic wooden peel, fresh bell peppers mushrooms olives, melted mozzarella cheese, basil leaves, slight char on crust, warm cozy lighting, top-down angle* |
| `order-3.webp` | *Golden crispy chicken wings stacked on dark slate plate, glazed with BBQ sauce, small bowl of ranch dip, parsley garnish, steam rising slightly, warm amber lighting* |
| `order-4.webp` | *Fresh Caesar salad in rustic wooden bowl, crisp romaine lettuce, grated parmesan, crunchy croutons, lemon wedge on side, vibrant green colors, bright natural lighting* |
| `order-5.webp` | *Warm fudgy chocolate brownie in small cast iron skillet, melting center, vanilla ice cream scoop on top, chocolate sauce drizzle, warm dessert mood lighting, steam visible* |

**Avatars (200x200px):**

| File | Prompt |
|------|--------|
| `order-user-1.webp` | *Casual young Caucasian male portrait, friendly smile, holding smartphone slightly visible, warm cafe restaurant background blurred, relaxed foodie lifestyle look* |

---

### D. Product Catalog — E-commerce (7 ảnh)

**Products (800x800px):**

| File | Prompt |
|------|--------|
| `catalog-1.webp` | *Premium over-ear wireless headphones on minimalist display stand, sleek matte black design with silver metallic accents, clean white studio background, soft even lighting, product catalog style* |
| `catalog-2.webp` | *Ultra-slim 32-inch 4K monitor on modern wooden desk, screen showing colorful graphic design workspace, mechanical keyboard beside, plants in background, soft ambient lighting* |
| `catalog-3.webp` | *Premium ergonomic office chair with lumbar support, black mesh back and cushion, adjustable armrests, modern office setting with plants, clean professional product photography* |
| `catalog-4.webp` | *Full-size RGB mechanical keyboard with colorful per-key backlighting, aluminum frame visible, on dark desk mat, gaming setup aesthetic, vibrant but professional lighting* |
| `catalog-5.webp` | *Minimalist adjustable LED desk lamp with sleek metal arm, warm and cool light modes, on clean wooden desk, soft shadows, modern product photography, white/beige background* |
| `catalog-6.webp` | *Modern sleek smart scale with glass surface, minimalist white design, on bathroom tile floor, clean bright lighting, healthy lifestyle product photography* |

**Avatars (200x200px):**

| File | Prompt |
|------|--------|
| `catalog-user-1.webp` | *Creative young male portrait, artistic stylish look, modern casual outfit, blurred creative studio with tech equipment background, warm natural lighting* |

---

### E. Ecommerce — Marketplace (8 ảnh)

**Products (400x400px):**

| File | Prompt |
|------|--------|
| `market-1.webp` | *Black wireless charging pad on wooden desk, smartphone placed on it showing charging animation, green LED indicator glowing, minimalist desk setup, clean lifestyle product shot* |
| `market-2.webp` | *Slim minimalist RFID-blocking leather wallet opened showing card slots, rich brown leather texture visible, flat lay on wooden surface, soft natural window lighting* |
| `market-3.webp` | *Smart LED desk lamp with built-in wireless charging base, modern adjustable design, warm ambient glow illuminating desk surface, clean contemporary workspace* |
| `market-4.webp` | *Designer oversized sunglasses with gradient black lenses, thick acetate frame, angled creative view, golden hour sunlight creating reflections, fashion accessory product shot* |

**Vendors (600x400px):**

| File | Prompt |
|------|--------|
| `vendor-1.webp` | *Modern electronics retail store interior, clean organized shelves with gadgets and devices, blue accent lighting, minimal customer in background, bright tech retail atmosphere* |
| `vendor-2.webp` | *Boutique fashion store interior display, curated clothing racks and mannequins, warm cozy lighting, elegant interior design with mirrors, empty stylish boutique atmosphere* |
| `vendor-3.webp` | *Modern home goods store interior, tasteful furniture displays and decor items, bright welcoming atmosphere with plants, clean organized retail space* |

**Avatars (200x200px):**

| File | Prompt |
|------|--------|
| `market-user-1.webp` | *Young Asian female portrait, happy expression holding shopping bags, modern retail environment background blurred, warm lifestyle photography style* |

---

### F. Driver App — Ride-hailing (4 ảnh)

**Vehicles (600x400px):**

| File | Prompt |
|------|--------|
| `tesla-model-3.webp` | *Tesla Model 3 in clean white color, three-quarter front angle, parked on modern city street, golden hour sunset lighting, professional automotive photography, sharp and clean* |
| `uber-black.webp` | *Premium black luxury sedan, polished exterior reflecting city lights, front angled view, night urban setting with bokeh lights, professional automotive photography* |

**Avatars (200x200px):**

| File | Prompt |
|------|--------|
| `driver-1.webp` | *Professional African American male portrait, smart casual polo shirt, friendly confident smile, blurred city street background with cars, driver profile style* |
| `driver-2.webp` | *Professional young Asian female portrait, casual smart outfit, warm genuine smile, blurred urban cityscape background, driver profile photography style* |

---

### G. Note App — Productivity (4 ảnh)

**Folder icons (200x200px):**

| File | Prompt |
|------|--------|
| `folder-1.webp` | *Minimalist folder icon with document and chart graphic, blue slate color scheme, clean flat vector illustration style on transparent background, simple professional* |
| `folder-2.webp` | *Minimalist folder icon with heart and person silhouette, warm purple-indigo color scheme, clean flat vector illustration style on transparent background* |
| `folder-3.webp` | *Minimalist folder icon with lightbulb and sparkle graphic, amber-yellow color scheme, clean flat vector illustration style on transparent background* |

**Screenshot (1200x800px):**

| File | Prompt |
|------|--------|
| `editor-preview.webp` | *Dark mode note-taking app UI mockup, three-panel layout with folder sidebar, notes list, and text editor open showing markdown content, indigo accent color, clean modern interface design* |

---

### H. Language App — Learning (5 ảnh)

**Courses (600x400px):**

| File | Prompt |
|------|--------|
| `course-1.webp` | *Spanish language learning illustration, colorful flamenco dancer silhouette, Spain flag red and yellow colors, books and speech bubbles, vibrant educational vector style* |
| `course-2.webp` | *French language learning illustration, elegant Eiffel Tower silhouette, France flag blue white red colors, open book with speech bubbles, educational vector style* |

**Flags (200x200px):**

| File | Prompt |
|------|--------|
| `spain.webp` | *Spain flag minimalist round icon, red and yellow horizontal stripes, clean flat vector design on transparent background, scalable icon style* |
| `france.webp` | *France flag minimalist round icon, blue white and red vertical stripes, clean flat vector design on transparent background, scalable icon style* |

**Screenshot (1200x800px):**

| File | Prompt |
|------|--------|
| `lesson-preview.webp` | *Language learning mobile app UI mockup, vocabulary flashcards interface, progress bars and streak counter, cyan blue accent color, clean modern educational app design* |

---

## 3. Vị trí cần cập nhật trong code

Sau khi có ảnh, cần thay thế emoji placeholder bằng `<Image>` component từ `next/image`.

### 3.1. Corporate — `src/app/[locale]/demos/corporate/page.tsx`

```tsx
import Image from 'next/image';
```

**CorporateCard component (~dòng 15):**
```tsx
// HIỆN TẠI (emoji placeholder):
<div className="text-6xl opacity-40 group-hover:opacity-60 transition-opacity">
  {product.metadata?.emoji || '📦'}
</div>

// THAY BẰNG:
<Image
  src={`/images/demos/corporate/products/${product.id}.webp`}
  alt={product.name}
  width={400}
  height={300}
  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
/>
```

### 3.2. Fashion — `src/app/[locale]/demos/fashion/page.tsx`

```tsx
import Image from 'next/image';
```

**Carousel image (~dòng 60-65):**
```tsx
// HIỆN TẠI:
<div className="text-6xl mb-4">{product.metadata?.emoji || '✨'}</div>

// THAY BẰNG:
<Image
  src={`/images/demos/fashion/products/${product.id}.webp`}
  alt={product.name}
  width={600}
  height={600}
  className="w-full h-full object-contain p-8"
/>
```

**Thumbnail grid (~dòng 97):**
```tsx
// HIỆN TẠI:
<span className="text-2xl">{p.metadata?.emoji || '✨'}</span>

// THAY BẰNG:
<Image
  src={`/images/demos/fashion/products/${p.id}.webp`}
  alt={p.name}
  width={60}
  height={60}
  className="w-full h-full object-cover rounded-lg"
/>
```

### 3.3. Ordering App — `src/app/[locale]/demos/ordering-app/page.tsx`

```tsx
import Image from 'next/image';
```

**FoodCard (~dòng 18-21):**
```tsx
// HIỆN TẠI:
<div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0 flex items-center justify-center text-white text-3xl">
  {product.metadata?.emoji || '🍽️'}
</div>

// THAY BẰNG:
<div className="w-24 h-24 rounded-2xl flex-shrink-0 overflow-hidden">
  <Image
    src={`/images/demos/ordering-app/products/${product.id}.webp`}
    alt={product.name}
    width={96}
    height={96}
    className="w-full h-full object-cover"
  />
</div>
```

**FoodCardDesktop (~dòng 70-74):**
```tsx
// HIỆN TẠI:
<div className="text-5xl">{product.metadata?.emoji || '🍽️'}</div>

// THAY BẰNG:
<Image
  src={`/images/demos/ordering-app/products/${product.id}.webp`}
  alt={product.name}
  width={200}
  height={176}
  className="w-full h-full object-cover"
/>
```

### 3.4. Product Catalog — `src/app/[locale]/demos/product-catalog/page.tsx`

```tsx
import Image from 'next/image';
```

**CatalogCard (~dòng 18-21):**
```tsx
// HIỆN TẠI:
<div className="text-6xl opacity-40 group-hover:opacity-60 transition-opacity">
  {product.metadata?.emoji || '📦'}
</div>

// THAY BẰNG:
<Image
  src={`/images/demos/product-catalog/products/${product.id}.webp`}
  alt={product.name}
  width={400}
  height={192}
  className="w-full h-full object-contain p-4"
/>
```

### 3.5. E-commerce — `src/app/[locale]/demos/ecommerce/page.tsx`

```tsx
import Image from 'next/image';
```

**MarketplaceCard (~dòng 16-18):**
```tsx
// HIỆN TẠI:
<div className="text-4xl">{product.metadata?.emoji || '📦'}</div>

// THAY BẰNG:
<Image
  src={`/images/demos/ecommerce/products/${product.id}.webp`}
  alt={product.name}
  width={400}
  height={160}
  className="w-full h-full object-contain p-4"
/>
```

**Vendor avatar (~dòng 48):**
```tsx
// HIỆN TẠI:
<div className="text-4xl">{vendor.avatar}</div>

// THAY BẰNG:
<Image
  src={`/images/demos/ecommerce/vendors/${vendor.id}.webp`}
  alt={vendor.name}
  width={48}
  height={48}
  className="rounded-lg"
/>
```

### 3.6. Driver App — `src/app/[locale]/demos/driver-app/page.tsx`

```tsx
import Image from 'next/image';
```

**Driver avatar (~dòng 36):**
```tsx
// HIỆN TẠI: không có avatar image, chỉ có text

// THÊM VÀO driver card button (trước driver.name):
<Image
  src={`/images/demos/driver-app/avatars/${driver.id}.webp`}
  alt={driver.name}
  width={40}
  height={40}
  className="rounded-full"
/>
```

**Vehicle info section (~dòng 104-120):**
```tsx
// THÊM vào vehicle info block:
<div className="flex items-center gap-4 mb-4">
  <Image
    src={`/images/demos/driver-app/vehicles/${selectedDriver.vehicle?.make === 'Tesla' ? 'tesla-model-3' : 'uber-black'}.webp`}
    alt={`${selectedDriver.vehicle?.make} ${selectedDriver.vehicle?.model}`}
    width={120}
    height={80}
    className="rounded-lg object-cover"
  />
</div>
```

### 3.7. Note App — `src/app/[locale]/demos/note-app/page.tsx`

```tsx
import Image from 'next/image';
```

**Folder tree icons (~dòng 32):**
```tsx
// HIỆN TẠI:
<Folder className="w-4 h-4" />

// THAY BẰNG:
<Image
  src={`/images/demos/note-app/folders/${folder.id}.webp`}
  alt={folder.name}
  width={16}
  height={16}
  className="opacity-70"
/>
```

**Editor area (~dòng 145-150):**
```tsx
// THÊM ảnh preview nhỏ bên cạnh note content:
{selectedNote.image && (
  <Image
    src={`/images/demos/note-app/screenshots/editor-preview.webp`}
    alt="Note preview"
    width={400}
    height={250}
    className="rounded-lg mb-4 border border-white/10"
  />
)}
```

### 3.8. Language App — `src/app/[locale]/demos/language-app/page.tsx`

```tsx
import Image from 'next/image';
```

**Course list sidebar (~dòng 40):**
```tsx
// HIỆN TẠI: chỉ có text title

// THÊM course image vào mỗi course button (thêm trước course.title):
<Image
  src={`/images/demos/language-app/courses/${course.id}.webp`}
  alt={course.title}
  width={40}
  height={40}
  className="rounded-lg flex-shrink-0"
/>
```

**Course header (~dòng 141):**
```tsx
// HIỆN TẠI:
<BookOpen className="w-6 h-6 text-cyan-400" />

// THAY BẰNG flag:
<Image
  src={`/images/demos/language-app/flags/${course.language === 'Spanish' ? 'spain' : 'france'}.webp`}
  alt={course.language}
  width={48}
  height={48}
  className="rounded-full"
/>
```

### 3.9. Overview Gallery — `src/app/[locale]/demos/page.tsx`

```tsx
import Image from 'next/image';
```

**Thêm ảnh preview cho mỗi demo card (~dòng 29, trước icon):**
```tsx
{/* Thêm screenshot preview */}
<div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
  <Image
    src={`/images/demos/${demo.slug}/screenshots/thumbnail.webp`}
    alt={demo.title}
    fill
    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
</div>
```

---

## 4. Tổng số ảnh cần tạo

| Demo | Product | Avatar/Vendor/Vehicle | Icon/Folder | Screenshot | Total |
|------|---------|----------------------|-------------|------------|-------|
| Corporate | 5 | 2 | - | - | 7 |
| Fashion | 5 | 1 | - | - | 6 |
| Ordering App | 5 | 1 | - | - | 6 |
| Product Catalog | 6 | 1 | - | - | 7 |
| E-commerce | 4 | 4 | - | - | 8 |
| Driver App | - | 4 | - | - | 4 |
| Note App | - | - | 3 | 1 | 4 |
| Language App | 2 (courses) | 2 (flags) | - | 1 | 5 |
| **Total** | **27** | **15** | **3** | **2** | **47** |

---

## 5. Workflow triển khai

### Bước 1: Tạo ảnh
- Dùng Midjourney / DALL-E 3 với prompts ở mục 2
- Export WebP, resize về kích thước quy định
- Nén dung lượng bằng squoosh.app

### Bước 2: Lưu ảnh
- Copy ảnh vào đúng thư mục theo cấu trúc ở mục 1

### Bước 3: Update code
- Sửa từng file demo page theo hướng dẫn ở mục 3
- Thêm `import Image from 'next/image'` vào mỗi file
- Thay thế emoji placeholder bằng `<Image>` component
- Thêm `sizes` attribute cho responsive images

### Bước 4: Kiểm tra
- `npx tsc --noEmit` — check TypeScript
- `npm run lint` — check ESLint
- `npm run dev` — kiểm tra trực quan trên browser
