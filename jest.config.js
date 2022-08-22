module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        'src/**',
    ],
    verbose: true,
    coverageDirectory: '.coverage',
    testMatch: [
        '<rootDir>/spec/**/*.spec.js',
    ],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    coverageThreshold: {
        global: {
            branches: 30,
            functions: 30,
            lines: 30,
            statements: 30,
        },
    },
    setupFiles: [
        '<rootDir>/spec/setup.js',
    ],
};
