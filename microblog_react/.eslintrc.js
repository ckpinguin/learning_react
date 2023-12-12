module.exports = {
    "extends": [
        "react-app",
        "eslint:recommended"
    ],
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "parser": "babel-eslint",
    "ecmaFeatures": {
        "jsx": true,
        "modules": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": ["react"],
    "rules": {
        "complexity": ["warn", 3],
        "no-multi-spaces": 1,
        "array-bracket-spacing": 1,
        "block-spacing": 1,
        "brace-style": [
            1,
            "1tbs",
            {
                "allowSingleLine": true
            }
        ],
        "no-mixed-spaces-and-tabs": 1,
        "no-class-assign": 1, // react w/decorators!
        "spaced-comment": 1,
        "object-curly-spacing": 0,
        "no-var": 1,
        "prefer-arrow-callback": 1,
        "prefer-const": 1,
        "no-console": 0,
        "no-unused-vars": 1,
        "no-unexpected-multilines": 0,
        "no-case-declarations": 0,
        "indent": [
            "warn", 4
        ],
        "linebreak-style": [
            "error", "unix"
        ],
        "quotes": [
            "error", "single"
        ],
        "semi": [
            "warn", "always"
        ],
        "react/jsx-boolean-value": 0,
        "jsx-quotes": 1,
        "react/jsx-no-undef": 1,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/no-did-mount-set-state": 0,
        "react/no-did-update-set-state": 2,
        "react/no-multi-comp": 1,
        "react/no-unknown-property": 1,
        "react/self-closing-comp": 1
    }
};
