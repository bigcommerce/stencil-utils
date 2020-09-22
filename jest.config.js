module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        'src/**',
    ],
    verbose: true,
    coverageDirectory: '.coverage',
    testMatch: [
        '<rootDir>/spec/**',
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
};
