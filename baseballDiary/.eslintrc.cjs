module.exports = {
  root: true,
  // ESLint가 TypeScript 문법을 이해할 수 있게 설정
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint', // TypeScript ESLint 플러그인
    'prettier', // Prettier 플러그인 추가
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript 규칙
    'plugin:prettier/recommended', // Prettier 규칙과 ESLint 통합
  ],
  rules: {
    // 세미콜론이 없으면 에러 처리
    semi: 'error',
    // 사용되지 않는 변수에 대해 에러 표시
    '@typescript-eslint/no-unused-vars': 'error',
    // Prettier 규칙 위반 시 ESLint 에러로 처리
    'prettier/prettier': [
      'error',
      {
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
      },
    ],
  },
};
