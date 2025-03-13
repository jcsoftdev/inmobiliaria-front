import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin, // ✅ Fix: Use as an object, not a function
      
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: '@components/**', group: 'internal', position: 'before' },
            { pattern: '@constants/**', group: 'internal', position: 'before' },
            { pattern: '@contracts/**', group: 'internal', position: 'before' },
            { pattern: '@modules/**', group: 'internal', position: 'before' },
            { pattern: '@services/**', group: 'internal', position: 'before' },
            { pattern: '@utils/**', group: 'internal', position: 'before' },
            { pattern: '@store/**', group: 'internal', position: 'before' },
            { pattern: '@router/**', group: 'internal', position: 'before' },
            { pattern: '@hooks/**', group: 'internal', position: 'before' },
            { pattern: '@http/**', group: 'internal', position: 'before' },
            { pattern: '@auth/**', group: 'internal', position: 'before' },
            { pattern: '@assets/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['internal'], // Ensure these groups are respected
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
)