# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)**: Uses [Babel](https://babeljs.io/) for Fast Refresh.
- **[@vitejs/plugin-react-swc](https://swc.rs/)**: Uses [SWC](https://swc.rs/) for Fast Refresh.

---

## Expanding the ESLint Configuration

If you're developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```javascript
// eslint.config.js
import tseslint from 'typescript-eslint'; // This import was missing!

export default tseslint.config([
  {
    // globalIgnores(['dist']) is not standard for flat config.
    // Use an object with an 'ignores' property for top-level ignores.
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with one of these:
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules:
      // ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules:
      // ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js

// eslint.config.js

import reactX from 'eslint-plugin-react-x'

import reactDom from 'eslint-plugin-react-dom'



export default tseslint.config([

  globalIgnores(['dist']),

  {

    files: ['**/*.{ts,tsx}'],

    extends: [

      // Other configs...

      // Enable lint rules for React

      reactX.configs['recommended-typescript'],

      // Enable lint rules for React DOM

      reactDom.configs.recommended,

    ],

    languageOptions: {

      parserOptions: {

        project: ['./tsconfig.node.json', './tsconfig.app.json'],

        tsconfigRootDir: import.meta.dirname,

      },

      // other options...

    },

  },

])

```
