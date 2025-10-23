# Hadza Project - Claude AI Context

## Project Overview
Hadza is a creative web project featuring an interactive cursor-following blob effect with background blur. Originally created on CodePen by Isaac Osuna, this project demonstrates modern web design techniques with smooth animations and gradient effects.

**Original CodePen URL**: [https://codepen.io/isaacoze/pen/YzRpBRP/60c319efdf97e8f076c0ec94d59f2087](https://codepen.io/isaacoze/pen/YzRpBRP/60c319efdf97e8f076c0ec94d59f2087)

## Project Structure

```
hadza.dev/
├── src/
│   ├── index.html    # Main HTML structure with blob and home section
│   ├── script.js     # JavaScript for cursor tracking and animations
│   └── style.css     # Styling including gradients and animations
├── dist/             # Distribution/build files
├── README.md         # Project documentation
└── claude.md         # This file - AI assistant context
```

## Technologies Used

- **HTML5**: Semantic markup for the page structure
- **CSS3**: Custom styling with:
  - Gradient effects
  - Backdrop blur filters
  - Animations and transitions
  - Tailwind-like utility classes
- **JavaScript**: Interactive cursor-following blob functionality

## Key Features

1. **Cursor-following Blob**: An animated blob that follows the user's cursor movement
2. **Background Blur Effect**: Dynamic blur effect that enhances the visual experience
3. **Gradient Text**: Stylized text with gradient effects for the "hADzA" heading
4. **Responsive Design**: Layout adapts to different screen sizes

## Development Guidelines

### Code Style
- Maintain clean, semantic HTML structure
- Use consistent naming conventions (kebab-case for IDs/classes)
- Keep JavaScript modular and well-commented
- Ensure CSS is organized and maintainable

### Working with This Project
- The main entry point is `src/index.html`
- Interactive behavior is controlled in `src/script.js`
- Visual styling is in `src/style.css`
- Test changes locally before committing

## Author

**Isaac Osuna** - Original creator

## Notes for Claude

- This is a creative/artistic web project focusing on visual effects
- Preserve the aesthetic and smooth animations when making changes
- The cursor-following blob is a core feature - be careful when modifying related code
- When making changes, consider performance impact on animations
