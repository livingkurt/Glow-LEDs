module.exports = {
  rootDir: process.cwd(),
  collectCoverage: false,
  collectCoverageFrom: ["server/**/*.{js,jsx}", "client/src/**/*.{js,jsx}"],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["lcov"],
  setupFiles: ["jest-canvas-mock"],
  setupFilesAfterEnv: ["<rootDir>/client/src/setupTests.js"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {},
  globals: {},
  roots: ["<rootDir>/server", "<rootDir>/client/src"],
  testRegex: "(/__tests__/.*|\\.test)\\.jsx?$",
  moduleNameMapper: {
    "^react$": "<rootDir>/node_modules/react",
    "^react-dom$": "<rootDir>/node_modules/react-dom",
    "\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules", "<rootDir>/server", "<rootDir>/client/src"],
  modulePathIgnorePatterns: ["<rootDir>/client/src/.*/__mocks__", "<rootDir>/server/.*/__mocks__"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
