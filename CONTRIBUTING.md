# 🤝 Contributing to Fandom-Fusion

First off, thank you for considering contributing to Fandom-Fusion! It's people like you that make this project a great tool for the creative community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Guidelines](#coding-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

---

## 🎯 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g. Windows, macOS, Linux]
 - Browser: [e.g. Chrome, Firefox]
 - Node version: [e.g. 18.0.0]
 - Project version: [e.g. 0.0.1]

**Additional context**
Any other context about the problem.
```

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description** of the suggested enhancement
- **Use case**: Explain why this enhancement would be useful
- **Possible implementation**: If you have ideas on how to implement it
- **Alternatives considered**: Other solutions you've thought about

### 🎨 Contributing Code

1. **Pick an issue** or create one to discuss your idea
2. **Fork the repository**
3. **Create a feature branch** from `main`
4. **Make your changes** following our coding guidelines
5. **Test thoroughly**
6. **Submit a pull request**

### 📖 Improving Documentation

Documentation improvements are always welcome! This includes:
- Fixing typos or clarifying existing docs
- Adding examples or tutorials
- Translating documentation to other languages
- Creating video tutorials or guides

---

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git
- A code editor (VS Code recommended)
- A Google Gemini API key for testing

### Step-by-Step Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Fandom-Fusion-.git
   cd Fandom-Fusion-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your API_KEY
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

---

## 📁 Project Structure

Understanding the project structure will help you navigate the codebase:

```
Fandom-Fusion-/
├── components/              # React components
│   ├── Header.tsx          # Navigation and branding
│   ├── Overview.tsx        # Project overview section
│   ├── Phases.tsx          # Development phases display
│   ├── Architecture.tsx    # Technical architecture diagram
│   ├── GeneratorDemo.tsx   # Main prompt generator
│   ├── FusionDemo.tsx      # Crossover generator
│   ├── Footer.tsx          # Footer with credits
│   └── Loader.tsx          # Loading animation
├── services/
│   └── geminiService.ts    # Gemini API integration
├── App.tsx                 # Main app component
├── index.tsx               # App entry point
├── types.ts                # TypeScript type definitions
├── constants.tsx           # App constants and data
├── metadata.json           # Project metadata
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

### Key Files to Know

- **`services/geminiService.ts`**: All AI interactions happen here
- **`constants.tsx`**: Phase data, fandom options, and tone options
- **`types.ts`**: TypeScript interfaces and types
- **`components/GeneratorDemo.tsx`**: Main user interaction component

---

## 💻 Coding Guidelines

### TypeScript Best Practices

1. **Always use TypeScript** - No plain JavaScript files
2. **Define types explicitly** - Avoid `any` unless absolutely necessary
3. **Use interfaces** for object shapes
4. **Export types** that might be reused

Example:
```typescript
// Good
interface PromptRequest {
  fandom: string;
  tone: string;
  characters?: string[];
}

const generatePrompt = async (request: PromptRequest): Promise<string> => {
  // implementation
};

// Avoid
const generatePrompt = async (request: any): Promise<any> => {
  // implementation
};
```

### React Component Guidelines

1. **Use functional components** with hooks
2. **Keep components focused** - Single responsibility principle
3. **Extract reusable logic** into custom hooks
4. **Use proper prop typing**

Example:
```typescript
interface ComponentProps {
  title: string;
  onAction: (id: string) => void;
  isActive?: boolean;
}

const MyComponent: React.FC<ComponentProps> = ({ 
  title, 
  onAction, 
  isActive = false 
}) => {
  // implementation
};

export default MyComponent;
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `GeneratorDemo.tsx`)
- **Services**: camelCase (e.g., `geminiService.ts`)
- **Types**: camelCase (e.g., `types.ts`)
- **Constants**: UPPER_SNAKE_CASE for values, camelCase for files

### Code Style

- **Indentation**: 4 spaces (already configured)
- **Quotes**: Single quotes for strings
- **Semicolons**: Always use them
- **Line length**: Aim for 80-100 characters
- **Comments**: Use JSDoc for functions, inline comments for complex logic

Example:
```typescript
/**
 * Generates a comic prompt based on fandom and tone
 * @param fandom - The fictional universe (e.g., "Star Wars")
 * @param tone - The desired tone (e.g., "Humoristisk")
 * @returns A creative prompt string
 */
export const generateComicPrompt = async (
  fandom: string, 
  tone: string
): Promise<string> => {
  // Implementation
};
```

---

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(generator): add character selection to prompt generator

Added a new dropdown to select specific characters for the prompt.
This allows for more targeted and personalized prompts.

Closes #123
```

```bash
fix(api): handle empty API responses gracefully

Previously, empty responses would cause the app to crash.
Now we show a friendly error message to the user.
```

```bash
docs(readme): update installation instructions

Added troubleshooting section for common setup issues.
```

---

## 🔄 Pull Request Process

### Before Submitting

1. ✅ **Update documentation** if you changed functionality
2. ✅ **Test your changes** thoroughly
3. ✅ **Follow coding guidelines**
4. ✅ **Update the README** if you added features
5. ✅ **Check for TypeScript errors** (`npm run build`)

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes.

## Screenshots (if applicable)
Add screenshots to show UI changes.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested my changes thoroughly

## Related Issues
Closes #(issue_number)
```

### Review Process

1. **Automated checks** will run on your PR
2. **Maintainers will review** your code
3. **Address feedback** if any changes are requested
4. **Approval and merge** once everything looks good

### What We Look For

- ✅ Code quality and readability
- ✅ Proper TypeScript usage
- ✅ Component reusability
- ✅ Performance considerations
- ✅ User experience improvements
- ✅ Documentation updates

---

## 🧪 Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] **UI Functionality**: All buttons and interactions work
- [ ] **API Calls**: Gemini integration works correctly
- [ ] **Error Handling**: Errors display properly
- [ ] **Responsive Design**: Works on different screen sizes
- [ ] **Browser Compatibility**: Test in Chrome, Firefox, Safari
- [ ] **Loading States**: Spinners and loaders display correctly

### Testing User Flows

1. **Prompt Generation**
   - Select different fandoms
   - Try different tones
   - Generate multiple prompts
   - Check for appropriate responses

2. **Crossover Generator**
   - Select two different fandoms
   - Verify fusion prompts make sense
   - Test with same fandom twice (should handle gracefully)

3. **Error Scenarios**
   - Missing API key
   - Network failures
   - Invalid inputs

---

## 📚 Documentation Guidelines

### Code Documentation

Use JSDoc comments for functions:

```typescript
/**
 * Generates a fusion prompt combining two fandoms
 * 
 * @param fandom1 - First fictional universe
 * @param fandom2 - Second fictional universe
 * @returns A creative crossover scenario
 * @throws {Error} If API call fails
 * 
 * @example
 * const prompt = await generateFusionPrompt("Star Wars", "Harry Potter");
 * // Returns: "Luke Skywalker discovers he's a wizard..."
 */
export const generateFusionPrompt = async (
  fandom1: string, 
  fandom2: string
): Promise<string> => {
  // Implementation
};
```

### README Updates

When adding features:
1. Update the **Features** section
2. Add to **Usage Guide** if user-facing
3. Update **API Documentation** if you added functions
4. Add to **Troubleshooting** if there are common issues

---

## 🌍 Translation Contributions

We welcome translations! Currently, the app is in Norwegian. To contribute translations:

1. Create a `locales/` directory
2. Add JSON files for each language (e.g., `en.json`, `no.json`)
3. Update components to use translation keys
4. Submit a PR with your translation

---

## 🎉 Recognition

Contributors will be recognized in:
- The project README
- Release notes for significant contributions
- Our GitHub contributors page

---

## ❓ Questions?

Don't hesitate to ask! You can:
- Open an issue with the `question` label
- Start a discussion in GitHub Discussions
- Reach out to the maintainers

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

**Thank you for contributing to Fandom-Fusion!** 🎨✨

*Every contribution, big or small, makes a difference.*

</div>
