# 4-Year Anniversary Website

A React-based anniversary website celebrating 4 years together (started Feb 5, 2022). Combines the best features from multiple example projects into a sequential, interactive experience.

## Features

- **Intro Sequence**: Floating heart particles with sequential anniversary messages
- **Interactive Question**: Yes/No buttons with draggable "No" button
- **Celebration Animation**: Confetti and heart burst effects
- **Countdown Timer**: Countdown to the 5th anniversary (Feb 5, 2026)
- **Photo Gallery**: Responsive image grid with lightbox
- **Story Section**: Timeline of 4 years together
- **Sunflower Garden**: Animated sunflower generation
- **Background Music**: Toggle-able background music

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
anniversary-website/
├── public/
│   ├── index.html
│   ├── images/          # Photo gallery images
│   └── audio/
│       └── bg-music.mp3  # Background music
├── src/
│   ├── components/
│   │   ├── Intro/
│   │   │   ├── IntroSequence.jsx
│   │   │   └── ParticleBackground.jsx
│   │   ├── Question/
│   │   ├── Celebration/
│   │   ├── Countdown/
│   │   ├── Gallery/
│   │   ├── Story/
│   │   ├── Sunflowers/
│   │   └── App.jsx
│   ├── styles/
│   │   ├── main.css
│   │   ├── intro.css
│   │   ├── question.css
│   │   ├── gallery.css
│   │   └── sunflowers.css
│   ├── utils/
│   │   └── dateUtils.js
│   └── index.js
├── package.json
└── README.md
```

## Technologies

- React 18
- CSS3 Animations
- React Hooks

## License

Private project for personal use.

