const reactA11y = require('eslint-config-airbnb/rules/react-a11y');
const airbnbStyle = require('eslint-config-airbnb-base/rules/style');

module.exports = {
    extends: 'airbnb',
    plugins: [
        'react',
        'jsx-a11y',
        'import'
    ],
    env: {
        browser: true
    },
    rules: {
        'arrow-body-style': ['error', 'always'],
        'arrow-parens': ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        'indent': (() => {
            // Set indent to 4 spaces
            const rule = airbnbStyle.rules['indent'];
            rule[1] = 4;
            return rule;
        })(),
        'jsx-a11y/anchor-is-valid': (() => {
            // Delete Link component because it does not work with react-router
            const rule = reactA11y.rules['jsx-a11y/anchor-is-valid'];
            delete rule[1].components;
            return rule;
        })(),
        'linebreak-style': ['error', 'windows'],
        'max-len': ['error', 200],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-indent': ['error', 4],
    }
};
