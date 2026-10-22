# How to Test an Electron App End-to-End



[![TestDriver running this test (sped up)](media/speedrun.gif)](https://console.testdriver.ai/replay/6ada1c18c2408c0c2459694d?share=AxudXvjetG3H6659wIU6w)

*Sped up: idle time removed. Click to watch the full replay with step-by-step logs.*

This repo is the complete, runnable example from the TestDriver tutorial **[How to Test an Electron App End-to-End](https://testdriver.ai/blog/test-electron-app)**. The post walks through every line.

## What the test does

Create a blank diagram, add a rectangle from the shape panel, type a label into it, assert the labeled shape is on the canvas.

It runs on a fresh cloud machine, installs the app the way a user would, and drives it from screenshots with plain-language steps. No selectors, test IDs or changes to the app.

## Run it

You need Node.js 20+ and a TestDriver API key (free to start at [console.testdriver.ai](https://console.testdriver.ai)).

```bash
git clone https://github.com/testdriverai/example-electron-app.git
cd example-electron-app
npm install
cp .env.example .env   # then paste your key into .env
npx vitest run
```

The run prints a link to its replay, so you can watch what happened.

## Run it in CI

[`.github/workflows/testdriver.yml`](.github/workflows/testdriver.yml) runs the test on every push and pull request using [`testdriverai/action`](https://github.com/testdriverai/action). Set up OIDC for your team, or add your key as a repository secret named `TD_API_KEY`. See [CI/CD](https://docs.testdriver.ai/ci-cd).

## Files

- [`tests/electron-app.test.mjs`](tests/electron-app.test.mjs): the test
- [`vitest.config.js`](vitest.config.js): Vitest with the TestDriver reporter
- [`.github/workflows/testdriver.yml`](.github/workflows/testdriver.yml): CI

## Learn more

- Tutorial: https://testdriver.ai/blog/test-electron-app
- Docs: https://docs.testdriver.ai/quickstart
- More examples: https://docs.testdriver.ai
