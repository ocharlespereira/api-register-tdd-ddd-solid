const config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,

  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
};

module.exports = config;
