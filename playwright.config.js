const {defineConfig, devices} = require('@playwright/test')

module.exports = defineConfig({
    testDir: './tests',
    projects:[
        {
            name: "chromium",
            use:{...devices['Desktop Chrome']},
        },
    ],
    reporter: 'html',
    // retries: process.env.CI ? 2:1,
    use: {
        actionTimeout: 5 * 1000,
        trace: 'on-first-retry',
        video: 'on-first-retry',
        screenshot: 'only-on-failure'
    }
})