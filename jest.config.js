module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  roots: ['<rootDir>/__tests__'],
  testMatch: [
    '**/__tests__/**/*.+(js|jsx|ts|tsx)',
    '**/?(*.)+(spec|test).+(js|jsx|ts|tsx)'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
  testEnvironment: 'jsdom'
}
