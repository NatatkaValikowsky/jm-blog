module.exports = {
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    plugins: ['react', '@typescript-eslint', 'jest'],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        "curly": ["error"],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        "max-depth": ["warn", 4],
        "id-length": ["warn", { "exceptions": ["i", "j"], "min": 2 }],
        "no-lonely-if": ["error"],
        "no-plusplus": ["error", {"allowForLoopAfterthoughts": true}],
        "no-restricted-syntax": "off",
        "class-methods-use-this": "off",
        "jsx-a11y/href-no-hash": ["off"],
        "jsx-a11y/anchor-is-valid": ["off"],
        "jsx-a11y/label-has-associated-control": [ "error", {
            "assert": "either"
        }],
        "react/state-in-constructor": ["off"],
        "react/jsx-props-no-spreading": ["off"],
        "react/static-property-placement": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }]
    },
};