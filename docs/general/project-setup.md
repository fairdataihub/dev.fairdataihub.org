---
lang: en-US
title: Project setup
description: Snippets to quickly setup a project for FAIR Data Innovations Hub
head:
  - - meta
    - name: 'og:image'
      content: 'https://kalai.fairdataihub.org/api/generate?app=fairdataihub&title=Project%20setup&org=fairdataihub&description=Snippets%20to%20quickly%20setup%20a%20project%20for%20FAIR%20Data%20Innovations%20Hub'
---

# Overview

This page holds some quick little instructions for setting up a project for FAIR Data Innovations Hub. It gives you some snippets for setting up all the required dev tools. Feel free to modify these snippets to your needs.

:::warning
The following instructions assume that you are using pnpm.

Use mise to manage your Node.js and pnpm toolchain from the repository root:

```sh
mise install
```
:::

## Developer dependencies

Install the following dependencies for your project:

```sh
pnpm add -D @commitlint/cli @commitlint/config-conventional commitizen cz-conventional-changelog
pnpm add -D @fairdataihub/config megasanjay-devmoji
pnpm add -D @semantic-release/changelog @semantic-release/commit-analyzer @semantic-release/git @semantic-release/github @semantic-release/npm @semantic-release/release-notes-generator semantic-release
pnpm add -D eslint prettier eslint-config-prettier eslint-plugin-prettier prettier-plugin-tailwindcss
pnpm add -D eslint-config-next eslint-import-resolver-typescript
```

## Husky

Install the following dependencies for your project:

```sh
pnpm dlx husky-init
pnpm add run-script-os
pnpm install
```

Add the following hooks to your husky installation:

```sh
pnpm exec husky add .husky/commit-msg 'pnpm commitlint --edit $1'
pnpm exec husky add .husky/pre-commit 'pnpm lint-staged'
pnpm exec husky add .husky/prepare-commit-msg 'pnpm exec megasanjay-devmoji -e --lint'
pnpm exec husky add .husky/post-merge 'pnpm install'
```

## Lint staged

Run the following command to install the lint staged plugin:

```sh
pnpm add -D lint-staged
```

Add the following scripts to your `package.json` file:

```json
  "scripts": {
    "lint": "eslint --ignore-path .gitignore \"./**/*.+(ts|js|tsx)\"",
    "format": "prettier --ignore-path .gitignore \"./**/*.+(ts|js|tsx)\" --write",
    "prepare": "run-script-os",
    "prepare:win32": "husky install",
    "prepare:darwin:linux": "husky install && chmod ug+x .husky/*  && chmod ug+x .git/hooks/*"
    "commit": "cz",
    "semantic-release": "semantic-release",
  }
```

Also add the following keys to your `package.json` file:

```json
  "lint-staged": {
    "./**/*.{ts,js,jsx,tsx}": [
      "pnpm lint --fix",
      "pnpm format"
    ]
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
```

:::tip
You can update the path if you need something different for the commit hooks for linting.
:::

## Prettier

Refer to the [prettier section](/general/config.html#prettier) for more information on the options.

## Commitlint

Refer to the [commitlint section](/general/config.html#commitlint) for more information.

## Devmoji

Refer to the [devmoji section](/general/config.html#devmoji) for more information.

## Semantic releases

Refer to the [semantic releases section](/general/config.html#semantic-releases) for more information.

Also add the GitHub Release action for this to be fully compliant. See the [GitHub Release section](/git/workflows.html#create-a-release-on-github) for more information.
