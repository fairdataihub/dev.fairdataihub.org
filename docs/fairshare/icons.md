---
lang: en-US
title: Icons
description: How to generate icons for FAIRshare
head:
  - - meta
    - name: 'og:image'
      content: 'https://kalai.fairdataihub.org/api/generate?app=fairshare&title=Icons%7C%20FAIRshare&org=fairdataihub&description=How%20to%20generate%20icons%20for%20FAIRshare'
---

# App icons

## Windows

To generate the .ico files needed for windows applications, we will need to use either Linux or macOS to generate these files. The `inkscape` and `imagemagick` packages are required to do this.

::: warning Source files
All source image files should be in the SVG format.
:::

Install the required packages.

```bash
# Ubuntu
sudo apt-get install inkscape imagemagick
```

```bash
# macOS
brew update && brew install imagemagick
brew install --cask inkscape
```

Generate all the variants needed for the ico file.

```bash
inkscape -w 16 -h 16 -e 16.png icon.svg
inkscape -w 32 -h 32 -e 32.png icon.svg
inkscape -w 48 -h 48 -e 48.png icon.svg
inkscape -w 72 -h 72 -e 72.png icon.svg
inkscape -w 96 -h 96 -e 96.png icon.svg
inkscape -w 144 -h 144 -e 144.png icon.svg
inkscape -w 192 -h 192 -e 192.png icon.svg
inkscape -w 256 -h 256 -e 256.png icon.svg
inkscape -w 512 -h 512 -e 512.png icon.svg
```

:::tip
Use `-o` instead of `-e` if these lines are being run on macOS.
:::

Bundle the png files into the .ico format with the following commands:

```bash
convert 16.png 32.png 48.png 72.png 96.png 144.png 192.png 256.png 512.png icon.ico
```

Verify that all the files are generated and included correctly.

```bash
identify icon.ico
```

## macOS/Linux

Generate the PNG files directly from the SVG files. Use Adobe Illustrator/Inkscape if possible.

:::tip
If the suggested tools are not available, you can generate these files using online tools.
One suggested website is [svgtopng](https://svgtopng.com).
:::

::: warning Transparency
Always check the generated PNG files for transparency in their backgrounds.
:::

We will be using PNGs instead of ICNS files for better color depth on macOS.

## In app icons

Within FAIRshare, we use the same icon library for all platforms. All icons used within FAIRshare can be found on the [iconify](https://iconify.design/) platform.

To use the icon within the application you need to import the library into your component.

```js
import { Icon } from '@iconify/vue';
```

```html
<Icon icon="ic:round-navigate-next" />
```

:::tip
To use Tailwind's heroicon library, filter the library to `heroicon` directly in iconify.design.
:::

Also consider using [Element Plus icons](https://element-plus.org/en-US/component/icon.html#icon-collection) for better compatibility with the rest of the UI.
