export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["<rootDir>/**/test/**/*.test.ts"],
    testPathIgnorePatterns: ["/node_modules/"],
    coverageDirectory: "./coverage",
    coveragePathIgnorePatterns: ["node_modules", "src/database", "src/test", "src/types"],
    reporters: ["default", "jest-junit"],
    transform: {
        "^.+\\.ts$": ["ts-jest", {
            diagnostics: false
        }]
    }
};
