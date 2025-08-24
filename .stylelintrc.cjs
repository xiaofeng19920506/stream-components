module.exports = {
  extends: ['stylelint-config-standard'],
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-order', 'stylelint-declaration-strict-value'],
  defaultSeverity: 'warning',
  rules: {
    'order/properties-alphabetical-order': true,
    'rule-empty-line-before': null,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'color-hex-length': 'short',
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'selector-class-pattern': null,
    'scale-unlimited/declaration-strict-value': [
      [
        '/color$/',
        'fill',
        'stroke',
        'background',
        'box-shadow',
        'border',
      ],
      {
        disableFix: false,
        ignoreValues: ['transparent', 'currentColor', 'inherit', 'initial'],
        expandShorthand: true,
        severity: 'warning',
      },
    ],
  },
  ignoreFiles: ['**/dist/**', '**/*.d.ts'],
};