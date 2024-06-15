export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/lib/**/*.ts",
    "<rootDir>/src/server/**/*.ts"
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/lib/blockInfo.ts",
    "/src/lib/transactionType.ts",
    "/src/lib/transactionSearch.ts"
  ],
  coverageProvider: "v8",
  coverageReporters: ["text", "lcov"],
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  testMatch: ["**/__tests__/**/*.ts"],
};
