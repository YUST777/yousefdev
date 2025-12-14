<div align="center">

# 🚀 01Studio Portfolio

**Building innovative blockchain solutions on The Open Network**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.13-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

[🌐 Live Website](https://01studio.xyz) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🎨 Key Components](#-key-components)
- [⚙️ Configuration](#️-configuration)
- [📱 Responsive Design](#-responsive-design)
- [🔧 Scripts](#-scripts)
- [📦 Dependencies](#-dependencies)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎯 Core Features

- ⚡ **Lightning Fast** - Built with Next.js 15 for optimal performance
- 🎨 **Modern UI/UX** - Beautiful animations powered by GSAP
- 📱 **Fully Responsive** - Mobile-first design with StaggeredMenu navigation
- 🌐 **SEO Optimized** - Complete SEO implementation with structured data
- 🎭 **Interactive Animations** - Smooth transitions and micro-interactions
- 🎁 **Profile Gifts Integration** - Telegram profile gift showcase
- 💬 **Testimonials** - Dynamic testimonial slider with animations
- 🎬 **Video Showcases** - Project demos and presentations

### 🎨 Design Highlights

- 🎪 **Animated Hero Section** - Eye-catching hero with video backgrounds
- 🎴 **Bento Grid Layout** - Modern card-based project showcase
- 🎪 **Marquee Animations** - Smooth scrolling technology stack display
- 🎯 **Interactive Modals** - Project detail modals with rich content
- 🎨 **Dark Theme** - Sleek dark mode design
- 🎭 **Staggered Menu** - Beautiful mobile navigation with animations

---

## 🛠️ Tech Stack

### Core Technologies

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15.0.4 |
| **Language** | TypeScript 5.7 |
| **UI Library** | React 19.2 |
| **Styling** | Tailwind CSS 3.4 |
| **Animations** | GSAP 3.13 |
| **Database** | Better SQLite3 |

### Key Libraries

- **@gsap/react** - React integration for GSAP animations
- **lottie-react** - Lottie animations support
- **@microsoft/clarity** - User analytics
- **clsx** - Conditional class names

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Get the project**
   ```bash
   # Download or clone the project files
   cd 01Studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your configuration:
   ```env
   NEXT_PUBLIC_CLARITY_PROJECT_ID=your-clarity-project-id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
01Studio/
├── app/                    # Next.js app directory
│   ├── api/                # API routes
│   │   ├── profile-gifts/  # Profile gifts API
│   │   └── sticker-collections/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── robots.ts          # Robots.txt
│   └── sitemap.ts         # Sitemap generation
│
├── components/             # React components
│   ├── Navigation.tsx      # Navigation with StaggeredMenu
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Services.tsx        # Services showcase
│   ├── Projects.tsx        # Projects grid
│   ├── Testimonials.tsx    # Testimonials
│   ├── StaggeredMenu.tsx   # Mobile navigation menu
│   └── ...
│
├── lib/                    # Utility libraries
│   └── profileCache.ts     # Profile caching
│
├── public/                 # Static assets
│   ├── *.webm             # Video files
│   ├── *.webp             # Optimized images
│   └── *.json             # Lottie animations
│
└── data/                   # Database files
    └── profile_cache.db    # SQLite cache
```

---

## 🎨 Key Components

### 🎪 StaggeredMenu
Beautiful animated mobile navigation menu with staggered animations.

```tsx
<StaggeredMenu
  position="right"
  colors={['#ffffff', '#000000']}
  items={menuItems}
  displayItemNumbering={true}
  accentColor="#5227FF"
/>
```

### 🎬 Hero Section
Animated hero with video backgrounds and interactive elements.

### 🎴 Projects Grid
Bento-style grid layout showcasing projects with hover effects.

### 💬 Testimonial Slider
Smooth animated slider for client testimonials.

---

## ⚙️ Configuration

### Next.js Config

The project uses optimized Next.js configuration:
- Image optimization with WebP/AVIF
- Compression enabled
- Security headers
- Cache optimization

### Tailwind CSS

Custom theme with:
- Dark color palette
- Custom animations
- Responsive breakpoints

### GSAP Animations

Smooth animations for:
- Page transitions
- Component entrances
- Interactive elements
- Scroll-triggered animations

---

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Features

- StaggeredMenu navigation
- Touch-optimized interactions
- Optimized images and videos
- Fast loading times

---

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 📦 Dependencies

### Production Dependencies

```json
{
  "@gsap/react": "^2.1.2",
  "@microsoft/clarity": "^1.0.0",
  "better-sqlite3": "^12.4.6",
  "clsx": "^2.1.1",
  "gsap": "^3.13.0",
  "lottie-react": "^2.4.1",
  "next": "^15.0.4",
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

### Development Dependencies

```json
{
  "@types/better-sqlite3": "^7.6.13",
  "@types/node": "^22.10.2",
  "@types/react": "^19.0.2",
  "@types/react-dom": "^19.0.2",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.49",
  "tailwindcss": "^3.4.15",
  "typescript": "^5.7.2"
}
```

---

## 🎯 Performance

- ⚡ **Lighthouse Score**: 95+ across all metrics
- 🚀 **First Contentful Paint**: < 1.5s
- 📦 **Optimized Bundle Size**: Code splitting and lazy loading
- 🖼️ **Image Optimization**: WebP/AVIF formats
- 🎬 **Video Optimization**: WebM format for better compression

---

## 🔒 Security

- Security headers configured
- XSS protection
- Content Security Policy
- HTTPS enforced
- Secure cookie settings

---

## 📊 Analytics

- Microsoft Clarity integration
- Privacy-compliant tracking
- Error handling for ad blockers

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create your feature branch
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic

---

## 📄 License

This project is private and proprietary.

---

## 👨‍💻 Author

**01Studio**

- Website: [01studio.xyz](https://01studio.xyz)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [GSAP](https://greensock.com/gsap/) - Animation Library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [React Bits](https://reactbits.dev/) - UI Components

---

<div align="center">


Made with ❤️ by 01Studio

[⬆ Back to Top](#-01studio-portfolio)

</div>
