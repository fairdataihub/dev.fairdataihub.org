---
lang: en-US
title: GitHub actions
description: GitHub actions used by fairdataihub
head:
  - - meta
    - name: 'og:image'
      content: 'https://kalai.fairdataihub.org/api/generate?app=fairdataihub&title=Overview&org=fairdataihub&description=How%20to%20use%20fairdataihub%20developer%20documentation'
---

# GitHub Actions

Almost all the repositories we use in FAIR Data Innovations Hub are hosted on GitHub. To help with certain tasks, we use GitHub actions to automate some additional tasks related to our version control system. Actions like linting should be included in every repository we use.

If you are creating a new repository within the organization, please make sure to include the actions in the repository. You can decide which ones need to be included.

## Lint and format

An action to lint and format the code on every push to GitHub. This action is meant to be secondary guard for the lint-staged hook not being triggered.

Some additional info regarding this library can be found [here](https://github.com/wearerequired/lint-action).

You do not need access to the repository secrets to use this action. The current template should handle this for you. The account that will be used to format your application will be [@fairdataihub-bot](https://github.com/fairdataihub-bot).

:::warning
If a language is not supported or needs to be skipped, make sure to mark it as such in the action's yml file.
:::

```yaml
name: Lint

on:
  # Trigger the workflow on push to all branches,
  # but only on pull request for the main branch
  push:
    branches:
      - '**'
  pull_request:
    branches:
      - 'main'

jobs:
  run-linters:
    name: Run linters
    runs-on: ubuntu-latest

    steps:
      - name: Check out Git repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      # ESLint and Prettier must be in `package.json`
      - name: Install Node.js dependencies
        run: yarn install --frozen-lockfile

      - name: Run ESLint
        uses: wearerequired/lint-action@v2
        with:
          eslint: true

      - name: Run Prettier
        uses: wearerequired/lint-action@v2
        with:
          prettier: true
          prettier_extensions: 'css,html,js,json,jsx,md,sass,scss,ts,tsx,vue'
          commit_message: 'style: 🎨 code style issues with ${linter}'
          auto_fix: true
          github_token: ${{ secrets.GITHUB_TOKEN }}
          git_email: 'fairdataihub@gmail.com'
          git_name: 'fairdataihub-bot'

      - name: Set up Python
        uses: actions/setup-python@v3
        with:
          python-version: 3.10.4

      - name: Install Python dependencies
        run: pip install black flake8

      - name: Run Black
        uses: wearerequired/lint-action@v2
        with:
          black: true
          auto_fix: true
          commit_message: 'style: 🎨 fix code style issues with ${linter}'
          github_token: ${{ secrets.GITHUB_TOKEN }}
          git_email: 'fairdataihub@gmail.com'
          git_name: 'fairdataihub-bot'

      - name: Run Flake8
        uses: wearerequired/lint-action@v2
        with:
          flake8: true
          flake8_dir: './src/pyflask'
          flake8_args: '--max-line-length=88'
```

## Mispellings

Automatically find common misspellings in the code that you have committed. Any found errors will be fixed via a pull request you must approve.

You will need access to the repository secrets to use this action. Talk to [@megasanjay](https://github.com/megasanjay) to setup this value. The account that will be used to send this message will be [@fairdataihub-bot](https://github.com/fairdataihub-bot).

```yaml
name: misspell-fixer-action

on:
  push:
    branches: '**'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: sobolevn/misspell-fixer-action@master
      - uses: peter-evans/create-pull-request@main
        with:
          token: ${{ secrets.BOT_ACTIONS }}
          commit-message: 'fix(typo): 🐛 typo fixes by misspell-fixer'
          title: 'fix(typo): 🐛 typo fixes by misspell-fixer'
```

## Greetings

An action to greet a user who is submitting a issue for the first time.

You will need access to the repository secrets to use this action. Talk to [@megasanjay](https://github.com/megasanjay) to setup this value. The account that will be used to send this message will be [@fairdataihub-bot](https://github.com/fairdataihub-bot).

```yaml
name: Greetings

on: [pull_request, issues]

jobs:
  greeting:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
    steps:
      - uses: actions/first-interaction@v1
        with:
          repo-token: ${{ secrets.BOT_ACTIONS }}
          issue-message: 'Hey! Thank you for using FAIRshare and submitting an issue. Your feedback is extremely valuable to us! A maintainer will submit a response to your inquiry soon.'
          pr-message: 'Thank you for taking your time and effort for your contribution, we truly value it. :tada: A maintainer will soon be on this PR to provide some comments or merge your changes. In the meantime please ensure that your changes follow our [`Contrubuting Guidelines`](https://github.com/fairdataihub/FAIRshare/blob/main/CONTRIBUTING.md).'
```

## Stale issues and PRs

Automatically close stale issues and PRs. You will need access to the repository secrets to use this action. Talk to [@megasanjay](https://github.com/megasanjay) to setup this value. The account that will be used to send this message will be [@fairdataihub-bot](https://github.com/fairdataihub-bot).

```yaml
# This workflow warns and then closes issues and PRs that have had no activity for a specified amount of time.
name: Mark stale issues and pull requests

on:
  schedule:
    - cron: '32 19 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write

    steps:
      - uses: actions/stale@v5
        with:
          repo-token: ${{ secrets.BOT_ACTIONS }}
          days-before-issue-stale: 30
          days-before-issue-close: 14
          stale-pr-message: 'Stale pull request'
          stale-issue-label: 'no-issue-activity'
          stale-pr-label: 'no-pr-activity'
          stale-issue-message: 'This issue is stale because it has been open for 30 days with no activity.'
          close-issue-message: 'This issue was closed because it has been inactive for 14 days since being marked as stale.'
          days-before-pr-stale: -1
          days-before-pr-close: -1
```

## Cypress end to end tests

An action that you can use to trigger Cypress end to end tests. Only relevant for web apps at the moment. Three different jobs for Chrome, Firefox and Edge are included.

```yaml
name: End-to-end tests
on: [push]
jobs:
  chrome:
    runs-on: ubuntu-20.04

    name: E2E on Chrome

    steps:
      - name: Check out Git repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install Node.js dependencies
        run: yarn install --frozen-lockfile

      - name: Run Cypress tests on Chrome
        uses: cypress-io/github-action@v4
        with:
          start: yarn dev
          browser: chrome

  firefox:
    runs-on: ubuntu-latest

    name: E2E on Firefox

    container:
      image: cypress/browsers:node16.5.0-chrome97-ff96
      options: --user 1001

    steps:
      - name: Check out Git repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install Node.js dependencies
        run: yarn install --frozen-lockfile

      - name: Run Cypress tests on Firefox
        uses: cypress-io/github-action@v4
        with:
          start: yarn dev
          browser: firefox

  edge:
    runs-on: ubuntu-latest

    name: E2E on Edge

    container:
      image: cypress/browsers:node14.10.1-edge88

    steps:
      - name: Check out Git repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install Node.js dependencies
        run: yarn install --frozen-lockfile

      - name: Run Cypress tests on Edge
        uses: cypress-io/github-action@v4
        with:
          start: yarn dev
          browser: edge
```

## Create a release on GitHub

We use the `semantic-releases` for any repositories that are hosted on the web. This action will analyze the current version of the repository and create a release on GitHub if needed. Using conventional commits is required for this action to work. Your changelog will also be updated with the release notes.

```yaml
name: Create release on GitHub

on:
  push:
    branches:
      - main

jobs:
  release-version-on-github:
    runs-on: ubuntu-latest

    steps:
      - name: Check out Git repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install Node.js dependencies
        run: yarn install --frozen-lockfile

      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.BOT_ACTIONS }}
        run: yarn semantic-release
```

For this action to work a number of prerequisites must be met.

The following packages must be added to your repository:

```sh
yarn add -D @semantic-release/changelog @semantic-release/commit-analyzer @semantic-release/git @semantic-release/github @semantic-release/release-notes-generator semantic-release @semantic-release/npm
```

Add a `.releaserc.json` file to the root of your project. You can adjust these items as needed.

```json
{
  "branches": [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    "master",
    "next",
    "next-major",
    {
      "name": "beta",
      "prerelease": true
    },
    {
      "name": "alpha",
      "prerelease": true
    }
  ],
  "repositoryUrl": "https://github.com/fairdataihub/<repo-name>.git",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        "npmPublish": false
      }
    ],
    "@semantic-release/github",
    "@semantic-release/git"
  ]
}
```

Add this script to your package.json:

```json
    "scripts": {
      "semantic-release": "semantic-release"
    }
```

## Conventional commits

This one is just a reminder to use conventional commits. It will not block any commits so please be mindful of that. Currently this is a good tool to ensure commits in a PR are all in the same enforced style.

```yaml
name: Conventional Commits

on:
  push:
    branches:
      - '**'
  pull_request:
    branches:
      - '**'

jobs:
  build:
    name: Conventional Commits
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: webiny/action-conventional-commits@v1.0.3
```

## GitLab sync

As a secondary backup, we have setup a GitLab organization to sync all of our code with. This action should automatically mirror all pushes, commits, and PRs to the GitLab organization repository. You will need access to the repository secrets to use this action. Talk to [@megasanjay](https://github.com/megasanjay) to setup this value. The account that will be used to send this message will be [@fairdataihub-bot](https://gitlab.com/fairdataihub-bot).

```yaml
name: GitlabSync

on:
  push:
    branches:
      - '**'
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    name: Git Repo Sync
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: wangchucheng/git-repo-sync@v0.1.0
        with:
          target-url: https://gitlab.com/fairdataihub/SODA-for-SPARC.git
          target-username: fairdataihub-bot
          target-token: ${{ secrets.GITLAB_BOT }}
```

Replace `target-url` with the URL of the GitLab repository you want to sync.

## Code quality checks

This action will run code quality checks on the codebase. Currently this is a good tool to ensure that the codebase is clean and well-formatted. Provided and recommended by GitHub.

```yaml
# For most projects, this workflow file will not need changing; you simply need
# to commit it to your repository.
#
# You may wish to alter this file to override the set of languages analyzed,
# or to provide custom queries or build logic.
#
# ******** NOTE ********
# Please check the `language` matrix defined below to confirm you have the
# correct set of supported CodeQL languages.
#

name: 'CodeQL'

on:
  push:
    branches: '**'
  pull_request:
    # The branches below must be a subset of the branches above
    branches: '**'
  schedule:
    - cron: '21 1 * * 2'

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write

    strategy:
      fail-fast: false
      matrix:
        language: ['javascript', 'python']
        # CodeQL supports [ 'cpp', 'csharp', 'go', 'java', 'javascript', 'python' ]
        # Learn more:
        # https://docs.github.com/en/free-pro-team@latest/github/finding-security-vulnerabilities-and-errors-in-your-code/configuring-code-scanning#changing-the-languages-that-are-analyzed

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      # Initializes the CodeQL tools for scanning.
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: ${{ matrix.language }}
          # If you wish to specify custom queries, you can do so here or in a config file.
          # By default, queries listed here will override any specified in a config file.
          # Prefix the list here with "+" to use these queries and those in the config file.
          # queries: ./path/to/local/query, your-org/your-repo/queries@main

      # Autobuild attempts to build any compiled languages  (C/C++, C#, or Java).
      # If this step fails, then you should remove it and run the build manually (see below)
      - name: Autobuild
        uses: github/codeql-action/autobuild@v2

      # ℹ️ Command-line programs to run using the OS shell.
      # 📚 https://git.io/JvXDl

      # ✏️ If the Autobuild fails above, remove it and uncomment the following three lines
      #    and modify them (or add more) to build your code if your project
      #    uses a compiled language

      #- run: |
      #   make bootstrap
      #   make release

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2
```
