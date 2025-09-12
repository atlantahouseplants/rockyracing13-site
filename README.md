# Rocky Racing Official Website

> Black & Gold. From Sim to Reality.

The official website for Rocky Racing - documenting a 13-year-old's iRacing journey with transparency, community focus, and professional motorsports aspirations.

## 🏁 Project Overview

This modern, mobile-first website serves as the central hub for Rocky Racing, featuring:

- **Race Results & Schedule** - Performance tracking and upcoming events
- **Video Content** - YouTube integration and live streaming
- **Community Building** - Discord integration and fan engagement  
- **Transparent Support** - Clear funding goals and contribution tracking
- **Sponsor Portal** - Partnership opportunities and media resources

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom Rocky Racing brand colors
- **Typography**: Bebas Neue (headings) + Inter (body)
- **Icons**: Lucide React
- **SEO**: next-sitemap with automatic sitemap/robots.txt generation
- **Deployment**: Vercel with automatic deployments from `main` branch

## 🎨 Design System

### Brand Colors
- **Rocky Black**: `#000000` (Primary background)
- **Rocky Gold**: `#D4AF37` (Accent color)
- **Rocky White**: `#FFFFFF` (Text on dark backgrounds)

### Usage in Tailwind
```html
<div class="bg-rr-black text-rr-white border-rr-gold">
  <h1 class="font-heading text-rr-gold">Rocky Racing</h1>
</div>
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rockyracing13-site.git
   cd rockyracing13-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   PLAUSIBLE_DOMAIN=rockyracing13.com
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

The build process automatically generates:
- Optimized static assets
- `sitemap.xml` for search engines  
- `robots.txt` for web crawlers

## 📊 Content Management

### Race Results
Edit `content/results.csv` with new race data:
```csv
Date,Series,Track,Car,Position,Incidents,Status,Notes
2025-09-15,IMSA Pilot Challenge,Road America,Porsche 718 GT4,P3,0,Podium,Clean race!
```

### Schedule Updates  
Update `content/schedule.json`:
```json
{
  "id": "race-123",
  "date": "2025-09-22", 
  "series": "iRacing Porsche Cup",
  "track": "Spa-Francorchamps",
  "status": "upcoming"
}
```

### Funding Goals
Update `content/progress.json`:
```json
{
  "goalAmount": 2500,
  "raisedAmount": 850, 
  "lastUpdated": "2025-09-15",
  "label": "Direct Drive Wheel Base"
}
```

## 🔧 Development

### Key Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production  
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Performance Targets
- Lighthouse Score: 90+ (mobile & desktop)
- Core Web Vitals: All green
- Bundle Size: Optimized with code splitting

## 🚀 Deployment

### Automatic Deployment (Recommended)

1. **Connect to Vercel**
   - Import GitHub repository to Vercel
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

2. **Environment Variables**
   Set in Vercel dashboard:
   ```
   NEXT_PUBLIC_SITE_URL=https://rockyracing13.com
   PLAUSIBLE_DOMAIN=rockyracing13.com
   ```

3. **Custom Domain**
   - Add `rockyracing13.com` as production domain
   - Configure DNS to point to Vercel
   - SSL certificate auto-generated

## 📈 Analytics & SEO

### Search Engine Optimization
- Automatic sitemap generation (`/sitemap.xml`)
- Robots.txt configuration (`/robots.txt`)  
- OpenGraph meta tags for social sharing
- JSON-LD structured data for rich snippets
- Mobile-first responsive design

### Analytics Integration
Choose one analytics provider:

**Plausible (Privacy-focused)**
```env
PLAUSIBLE_DOMAIN=rockyracing13.com
```

**Google Analytics 4**  
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📞 Contact & Support

- **Email**: max@rockyracing13.com (parent-supervised)
- **Website**: [rockyracing13.com](https://rockyracing13.com)
- **GitHub Issues**: For technical problems or suggestions

> **Note**: All communications are parent-supervised as per our community guidelines.

---

**Rocky Racing** - Dream big. Drive clean. Get faster — one lap at a time. 🏁
