# Memora — Premium Photo Service Frontend

A calm, premium marketing and service intake frontend for Memora — a done-for-you AI-assisted photo creation service.

> **Memora is not a DIY AI tool. Memora is a done-for-you service.**

## 🎯 What is Memora?

Memora offers luxury, professional-quality photos without photographers, travel, posing, or stress. Users don't generate images themselves — they submit references and requirements, and Memora handles everything manually using AI.

**The frontend is designed to feel:**
- Premium & calm
- Trustworthy
- Human-led
- Emotionally aware

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page (marketing)
│   ├── request/
│   │   └── page.tsx          # Multi-step service request form
│   ├── thank-you/
│   │   └── page.tsx          # Confirmation page
│   ├── layout.tsx            # Root layout with Header/Footer
│   └── globals.css           # Global styles & CSS variables
├── components/
│   ├── landing/              # Landing page components
│   │   ├── HeroSection.tsx
│   │   ├── PainPointCard.tsx
│   │   ├── ServiceStep.tsx
│   │   ├── WhyMemoraCard.tsx
│   │   └── index.ts
│   ├── request/              # Request form components
│   │   ├── CategoryImageCard.tsx
│   │   ├── ImageUploadZone.tsx
│   │   └── index.ts
│   ├── layout/               # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   └── ui/                   # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── textarea.tsx
│       └── ...
└── lib/
    ├── constants.ts          # Routes, categories, config
    ├── utils.ts              # Utility functions
    └── api.ts                # API helpers (mock)
```

## 🗂️ Pages

### `/` — Landing Page

The marketing homepage designed to:
- Clearly explain the service
- Build trust
- Drive users to request photos

**Sections:**
1. **Hero** — Premium headline, CTAs, trust indicators
2. **Pain Points** — Relatable human problems we solve
3. **How It Works** — Simple 4-step service flow
4. **Why Memora** — Differentiators (human-reviewed, privacy-first, etc.)
5. **Promise Section** — Commitments & testimonial
6. **Final CTA** — Drive to request form

### `/request` — Service Request Form

Multi-step form for service intake:

| Step | Title | Purpose |
|------|-------|---------|
| 1 | Your Details | Name & email |
| 2 | Photo Type | Select categories (multi-select) |
| 3 | Your Photos | Upload 5-10 reference photos |
| 4 | Your Vision | Describe requirements |

**Submission payload:**
```json
{
  "name": "string",
  "email": "string",
  "categories": ["graduation", "professional"],
  "description": "string",
  "referenceImages": [
    { "name": "photo1.jpg", "size": 1234567, "type": "image/jpeg" }
  ]
}
```

### `/thank-you` — Confirmation Page

Calm confirmation with:
- Success message
- What happens next
- Expected timeline
- Back to home CTA

## 🎨 Category → Prompt Mapping (Internal)

Categories are user-friendly labels that map to internal AI prompt categories:

| User Category | Internal Prompt Category |
|--------------|-------------------------|
| Graduation Photos | `graduation_ceremony_academic` |
| Family Portraits | `family_portrait_warm` |
| Professional Headshots | `professional_headshot_corporate` |
| Creative & Artistic | `creative_artistic_editorial` |
| Memorial Photos | `memorial_remembrance_gentle` |
| Couples & Romance | `couples_romantic_intimate` |

These mappings are defined in `src/lib/constants.ts` under `SERVICE_CATEGORIES`.

The user never sees:
- Prompt names
- AI terminology
- Technical language

## 🔧 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | App Router framework |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| lucide-react | Icons |
| react-hook-form | Form handling |
| next/image | Optimized images |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📋 Service Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         USER FLOW                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. User lands on homepage                                  │
│     ↓                                                       │
│  2. User clicks "Request Your Photos"                       │
│     ↓                                                       │
│  3. User fills multi-step form:                             │
│     • Basic details (name, email)                           │
│     • Selects photo categories                              │
│     • Uploads reference photos (5-10)                       │
│     • Describes requirements                                │
│     ↓                                                       │
│  4. User submits request                                    │
│     ↓                                                       │
│  5. User sees thank-you confirmation                        │
│     ↓                                                       │
│  6. [Backend] Request is reviewed by team                   │
│     ↓                                                       │
│  7. [Backend] Photos are created using AI + human review    │
│     ↓                                                       │
│  8. [Backend] Final images delivered to user via email      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🔮 Future Automation Plan

### Phase 1: Basic Backend Integration
- [ ] Connect form submission to real API endpoint
- [ ] Implement file upload to cloud storage (S3/Cloudflare R2)
- [ ] Email notification on submission (SendGrid/Resend)
- [ ] Admin dashboard for request management

### Phase 2: Processing Pipeline
- [ ] Automated face detection & quality validation
- [ ] Reference photo preprocessing
- [ ] Queue system for processing requests
- [ ] Status tracking & user notifications

### Phase 3: AI Integration
- [ ] Integration with AI image generation APIs
- [ ] Prompt template system based on categories
- [ ] Batch generation with quality scoring
- [ ] Human review interface

### Phase 4: Delivery & Feedback
- [ ] Secure delivery portal
- [ ] Revision request system
- [ ] Satisfaction tracking
- [ ] Automated follow-up

## 🎨 Design System

### Colors (CSS Variables)
```css
--background: 20, 14%, 4%     /* Dark warm background */
--foreground: 60, 9%, 98%     /* Light text */
--primary: 38, 92%, 50%       /* Warm amber accent */
--secondary: 24, 10%, 16%     /* Muted surfaces */
--muted-foreground: 24, 6%, 56%  /* Secondary text */
--border: 24, 10%, 18%        /* Subtle borders */
```

### Typography
- **Headlines:** Georgia/serif
- **Body:** Geist Sans (system fallback)
- **Sizes:** Responsive scaling with Tailwind

### Principles
- Neutral, warm colors
- Soft shadows
- Rounded edges (0.75rem radius)
- Generous whitespace
- Subtle animations
- No technical jargon

## 🚫 What This Is NOT

This is a **service intake website**, not a SaaS platform.

**Not included:**
- ❌ Pricing pages
- ❌ Payment processing
- ❌ User authentication
- ❌ User dashboards
- ❌ Waitlists
- ❌ Self-service generation

## 📞 Philosophy

This product sells:
- **Relief** — No more awkward photo shoots
- **Comfort** — Someone real is handling this
- **Confidence** — Professional results guaranteed
- **Memories** — Moments that matter, preserved

The frontend reflects this through calm design, human language, and a premium feel that reassures users they're in good hands.

---

Built with care for memories that matter.
