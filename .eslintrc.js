module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript/recommended', '@vue/prettier', '@vue/prettier/@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2020,
    },
    globals: {
        GityGis: true,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }], //
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
    },
}
