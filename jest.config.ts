import type {Config} from 'jest';

const config: Config = {
  roots: ['<rooDir>/src'],
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: ['<rooDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  testEnvironment: 'node',
  transform:{
    '.+\\.ts$': 'ts-jest'
  },

};

export default config;
