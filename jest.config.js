module.exports = {
  testEnvironment: 'node',

  testMatch: [
    '**/test/**/*.test.ts',
  ],

  moduleFileExtensions: [
    'ts',
    'js',
  ],

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },

  collectCoverage: true,
  coverageDirectory: 'coverage',
};
