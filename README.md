# Breakeven LLC 💼

An interactive terminal-powered business consulting website that combines professional services with cutting-edge technology experiences.

## 🚀 Overview

Breakeven LLC is a modern business consulting firm's digital presence, featuring an innovative **interactive terminal interface** as its centerpiece. The website demonstrates our commitment to technology-forward solutions while maintaining professional business standards.

### Key Features

- **🖥️ Interactive Terminal Interface** - A fully functional command-line experience in the browser
- **🎧 Podcast-as-a-Service** - Stream business and technology podcasts directly through terminal commands
- **🎨 Cyberpunk Professional Design** - Modern aesthetics that blend business professionalism with tech innovation
- **📱 Fully Responsive** - Works seamlessly across all devices
- **⚡ Lightning Fast** - Static site generation for optimal performance

## 💻 Terminal Commands

The terminal supports various commands that showcase our capabilities:

```bash
help      # Show all available commands
about     # Learn about Breakeven LLC
status    # Check system operational metrics
podcast   # Access our Podcast-as-a-Service platform
clear     # Clear the terminal screen
date      # Display current date and time
echo      # Echo back your message
```

### 🎙️ Podcast-as-a-Service

Experience audio content through our innovative terminal interface:

```bash
podcast play   # Start streaming curated business content
podcast pause  # Pause the current stream
podcast stop   # Stop playback completely
```

Currently featuring curated content on:
- Vibe-Driven Development methodology
- Business innovation strategies
- Technology leadership insights

## 🛠️ Technology Stack

- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Terminal**: xterm.js
- **Deployment**: GitHub Pages with GitHub Actions
- **Domain**: breakevenllc.com

## 🏗️ Project Structure

```
breakevenllc.com/
├── app/              # Next.js App Router pages
│   ├── components/   # React components (Terminal, etc.)
│   ├── globals.css   # Global styles and theme
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Homepage with terminal
├── public/           # Static assets
│   ├── CNAME        # Custom domain configuration
│   └── podcast.m4a  # Podcast audio file
├── .github/          
│   └── workflows/    # GitHub Actions for deployment
└── package.json      # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/jensbodal/breakevenllc.com.git
cd breakevenllc.com

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site locally.

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript compiler checks
```

## 🌐 Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch. The deployment workflow:

1. Builds the Next.js static site
2. Exports to the `out/` directory
3. Deploys to GitHub Pages
4. Serves at [breakevenllc.com](https://breakevenllc.com)

## 🎯 Business Purpose

Breakeven LLC specializes in:

- **Strategy** - Business transformation and growth strategies
- **Technology** - Modern tech stack implementation and consulting
- **Innovation** - Cutting-edge solutions for modern challenges

Our interactive terminal interface serves as both a demonstration of our technical capabilities and an engaging way for potential clients to explore our services.

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines and contribution instructions.

## 📄 License

© 2025 Breakeven LLC. All rights reserved.

---

**Ready to transform your business?** Try our terminal at [breakevenllc.com](https://breakevenllc.com)