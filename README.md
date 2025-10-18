<div align="center">
<img width="1200" height="475" alt="Fandom Fusion Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🎨 Fandom-Fusion

**An AI-Powered Comic Prompt Generator for Creative Storytellers**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://reactjs.org/)
[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%20AI-orange.svg)](https://ai.google.dev/)

</div>

---

## 📖 Overview

**Fandom-Fusion** is an innovative web application that leverages Google's Gemini AI to generate creative comic strip prompts for artists and storytellers. Whether you're a comic creator looking for inspiration or a fan fiction writer seeking new ideas, Fandom-Fusion helps you explore endless possibilities across popular fictional universes.

### ✨ Key Features

- 🎭 **Multi-Universe Support** - Generate prompts from Star Wars, Lord of the Rings, Marvel (MCU), Pokémon, Avatar: The Last Airbender, and Harry Potter
- 🎨 **Tone Customization** - Choose between humorous, heartwarming, or absurd tones
- 🔀 **Crossover Generator** - Create unique fusion prompts combining characters from different universes
- 📊 **Interactive Dashboard** - Explore project phases, architecture, and technical implementation
- 🤖 **AI-Powered** - Built on Google's Gemini 2.5 Flash model for high-quality, creative outputs
- 🎯 **3-Panel Format** - Optimized prompts for traditional comic strip structure

### 🎯 Use Cases

- **Comic Artists**: Get instant inspiration for your next comic strip
- **Fan Fiction Writers**: Discover unique character interactions and scenarios
- **Creative Workshops**: Use as a brainstorming tool for storytelling sessions
- **Educators**: Teach creative writing and visual storytelling concepts

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- A **Google Gemini API key** (get one at [Google AI Studio](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GizzZmo/Fandom-Fusion-.git
   cd Fandom-Fusion-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   API_KEY=your_gemini_api_key_here
   ```

   > ⚠️ **Important**: Never commit your `.env.local` file. It's already included in `.gitignore`.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
npm run preview
```

The optimized production build will be in the `dist/` directory.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **React 19.2** | UI framework for building interactive components |
| **TypeScript 5.8** | Type-safe development and better code quality |
| **Vite 6.2** | Fast build tool and development server |
| **Tailwind CSS** | Utility-first CSS framework (via inline styles) |
| **Google Gemini AI** | Advanced language model for prompt generation |
| **Recharts 3.3** | Data visualization for project metrics |

---

## 📚 Project Structure

```
Fandom-Fusion-/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Overview.tsx    # Project overview section
│   ├── Phases.tsx      # Project phases display
│   ├── Architecture.tsx # Technical architecture
│   ├── GeneratorDemo.tsx # Prompt generator interface
│   ├── FusionDemo.tsx  # Crossover generator
│   ├── Footer.tsx      # Footer component
│   └── Loader.tsx      # Loading spinner
├── services/
│   └── geminiService.ts # Gemini API integration
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
├── types.ts            # TypeScript type definitions
├── constants.tsx       # Application constants
├── metadata.json       # Project metadata
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

---

## 🎮 Usage Guide

### Generating a Comic Prompt

1. **Select a Universe**: Choose from the dropdown menu (e.g., Star Wars, Marvel)
2. **Choose a Tone**: Pick between Humorous, Heartwarming, or Absurd
3. **Generate**: Click the "Generer Prompt" button
4. **Expand** (Optional): Get detailed panel breakdowns or dialogue suggestions

### Creating a Crossover

1. Navigate to the **Kreativ Fusion** section
2. Select two different universes
3. Click "Generer Fusion-Prompt"
4. Enjoy unique character interactions from different worlds!

### Example Output

**Prompt**: "Luke Skywalker and Darth Vader are forced to compete in a bake-off on the Death Star, with stormtroopers as the judges."

**Panel Breakdown**:
- Panel 1: Luke and Vader in chef hats, staring at ingredients
- Panel 2: Chaos in the kitchen with flour explosions
- Panel 3: Stormtroopers trying to taste-test with their helmets on

---

## 🔧 API Documentation

### Gemini Service Functions

#### `generateComicPrompt(fandom: string, tone: string): Promise<string>`
Generates a single-paragraph comic strip prompt.

**Parameters**:
- `fandom`: The fictional universe (e.g., "Star Wars")
- `tone`: The desired tone (e.g., "Humoristisk")

**Returns**: A creative prompt string in Norwegian

#### `expandPromptToPanels(prompt: string): Promise<string>`
Expands a prompt into a 3-panel breakdown.

**Parameters**:
- `prompt`: The original prompt text

**Returns**: Detailed descriptions for each panel

#### `generateDialogueForPrompt(prompt: string, panelBreakdown?: string): Promise<string>`
Generates dialogue for the characters in the prompt.

**Parameters**:
- `prompt`: The original prompt text
- `panelBreakdown`: (Optional) Panel descriptions for context

**Returns**: Character dialogue in format "Character: line"

#### `generateFusionPrompt(fandom1: string, fandom2: string): Promise<string>`
Creates a crossover prompt between two universes.

**Parameters**:
- `fandom1`: First fictional universe
- `fandom2`: Second fictional universe

**Returns**: A creative crossover scenario

---

## 🗺️ Project Roadmap

The project is structured in four main phases:

### Phase 1: Data Collection (Weeks 1-4) ✅
- Gather structured data from fandom wikis
- Collect context from Reddit, TV Tropes, and fan fiction archives
- Build knowledge base of characters, locations, and narrative tropes

### Phase 2: AI Model & Prompt Logic (Weeks 5-8) ✅
- Integrate Google Gemini AI
- Fine-tune prompt templates for comic-specific output
- Develop tone and focus adjustment logic

### Phase 3: User Interface (Weeks 9-10) ✅
- Build React-based web application
- Implement intuitive controls and result display
- Deploy interactive dashboard

### Phase 4: Testing & Iteration (Weeks 11-12+) 🔄
- Beta testing with comic creators and fan artists
- Implement feedback mechanism
- Continuous updates to knowledge base

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add TypeScript types for new functions and components
- Test your changes thoroughly before submitting
- Update documentation for any new features
- Keep commits small and focused

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: "API_KEY environment variable not set"
- **Solution**: Ensure you've created a `.env.local` file with your Gemini API key

**Issue**: Build fails with TypeScript errors
- **Solution**: Run `npm install` to ensure all dependencies are up to date

**Issue**: Port 5173 already in use
- **Solution**: Change the port in `vite.config.ts` or stop the process using that port

**Issue**: Gemini API calls fail
- **Solution**: Check your API key is valid and you haven't exceeded rate limits

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors & Acknowledgments

- **Project Creator**: [GizzZmo](https://github.com/GizzZmo)
- **Powered by**: Google Gemini AI
- **Special Thanks**: To all the comic creators and storytellers who inspire this project

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/GizzZmo/Fandom-Fusion-/issues)
- **Discussions**: [GitHub Discussions](https://github.com/GizzZmo/Fandom-Fusion-/discussions)
- **AI Studio**: [View in AI Studio](https://ai.studio/apps/drive/1HXvbaHwpHc8sN9l4_2NAfDmoWeg79TWl)

---

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

<div align="center">

**Made with ❤️ by the Fandom-Fusion Team**

*Bringing fandoms together, one comic strip at a time*

</div>
