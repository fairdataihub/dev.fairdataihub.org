---
lang: en-US
title: Fairdataihub developer documentation
description: How to use the documentation site
head:
  - - meta
    - name: 'og:image'
      content: 'https://kalai.fairdataihub.org/api/generate?app=fairdataihub&title=About%20the%20documentation&org=fairdataihub&description=How%20to%20use%20the%20documentation%20site'
---

# About the documentation

## Tech Stack

- [Vitepress](https://vitepress.vuejs.org/)

## Getting started

### ⚠️ Prerequisites

This project uses `Yarn` as package manager.

```sh
npm install --global yarn
```

If you already have a conda environment on your machine, you can install the dependencies with:

```sh
conda install -c conda-forge yarn nodejs
```

### Run locally

Clone the project

```sh
https://github.com/fairdataihub/dev.fairdataihub.org.git
```

Go to the project directory

```sh
cd dev.fairdataihub.org
```

Install dependencies

```sh
yarn install
```

Start the server

```sh
yarn dev
```

### Build locally

Use this step to build a local production version of the site. Use `serve` to preview the local build.

```sh
yarn docs:build
```

## Acknowledgements

A special thank you to Vercel for hosting our application documentation.

![](https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg)
