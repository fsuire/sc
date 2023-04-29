export default {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  testMatch: ['**/src/**/?(*.)+(test).ts'],
  transform: {
      '^.+\\.ts?$': 'ts-jest',
  },
  preset: 'ts-jest',
}
