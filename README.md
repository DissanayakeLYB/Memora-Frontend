# Memora Frontend

A human-first, emotionally sensitive AI photo album platform.

## How It Works

1. **Users choose visual styles** — Instead of describing what they want in words, users select from sample images that represent different moods/styles
2. **Upload photos** — Users upload their own photos (up to 10)
3. **Backend processes** — The frontend sends style IDs to the backend, which maps them to AI prompts
4. **Album is created** — Users receive generated images in a beautiful gallery

## Style-to-Prompt Mapping

Users never see technical prompt IDs. They just pick images that "feel right."

Each style has:
- `id` — Unique identifier (e.g., `graduation_warm_01`)
- `label` — Human-friendly name (e.g., "Graduation – calm & proud")
- `imageUrl` — Sample image path
- `backendPromptGroup` — Technical ID sent to backend (e.g., `GRADUATION_WARM`)

Styles are configured in `src/lib/imageStyles.ts`.

**Frontend sends to backend:**
```json
{
  "albumTitle": "My Album",
  "description": "Optional description",
  "selectedStyleIds": ["graduation_warm_01", "family_warm_01"],
  "selectedPromptGroups": ["GRADUATION_WARM", "FAMILY_WARM"],
  "uploadedPhotos": [File, File, ...]
}
```

## Backend Integration

Replace mock functions in `src/lib/api.ts` with real API calls:

1. `login()` — POST to your auth endpoint
2. `register()` — POST to your registration endpoint
3. `createAlbum()` — POST album data + photos to your creation endpoint
4. `getAlbum()` — GET album status and generated images
5. `getUserAlbums()` — GET user's album list

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── login/             # Sign in
│   ├── register/          # Sign up
│   ├── dashboard/         # User's albums
│   ├── create-album/      # Album creation flow
│   └── album/[id]/        # Album result page
├── components/
│   ├── ui/                # shadcn-style base components
│   ├── album/             # Album-specific components
│   └── layout/            # Header, Footer
├── lib/
│   ├── api.ts             # API functions (mock)
│   ├── constants.ts       # App constants
│   ├── imageStyles.ts     # Style configurations
│   └── utils.ts           # Utility functions
└── types/
    └── index.ts           # TypeScript types
```

## Adding New Styles

1. Add sample image to `public/samples/`
2. Add entry in `src/lib/imageStyles.ts`:

```typescript
{
  id: "your_style_id",
  label: "Human-Friendly Label",
  imageUrl: "/samples/your-image.jpg",
  backendPromptGroup: "YOUR_PROMPT_GROUP",
  category: "Category Name"
}
```

3. Backend must recognize `YOUR_PROMPT_GROUP`

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- shadcn/ui patterns
- React Hook Form
- Lucide React icons
