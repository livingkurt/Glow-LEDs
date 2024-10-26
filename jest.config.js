export default {
  rootDir: process.cwd(),
  collectCoverage: false,
  collectCoverageFrom: ["server/**/*.{js}"], // Only collect coverage from server
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["lcov"],
  setupFiles: [],
  setupFilesAfterEnv: [],
  testEnvironment: "node", // Use node environment for backend
  testEnvironmentOptions: {},
  globals: {},
  roots: ["<rootDir>/server"], // Only test files inside server
  testRegex: "(/__tests__/.*|\\.test)\\.js?$",
  moduleNameMapper: {},
  moduleDirectories: ["node_modules", "<rootDir>/server"],
  modulePathIgnorePatterns: ["<rootDir>/server/.*/__mocks__"],
  transform: {
    "^.+\\.(js|)$": "babel-jest",
  },
};
