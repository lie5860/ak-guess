module.exports = {
    extends: [
        'plugin:@typescript-eslint/recommended',
        "plugin:react-hooks/recommended"
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "prefer-const": "off"
    },
};

