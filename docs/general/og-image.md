---
lang: en-US
title: OG Image
description: Generate open graph images for fairdataihub web apps
head:
  - - meta
    - name: 'og:image'
      content: 'https://kalai.fairdataihub.org/api/generate?app=fairdataihub&title=Open%20Graph%20Images&org=fairdataihub&description=Generate%20open%20graph%20images%20for%20fairdataihub%20web%20apps'
---

# Overview

To ensure that we follow a consistent online presence, an open graph image generation service, named kalai, has been setup at the domain kalai.fairdataihub.org. These images are meant to used in the `<head>` tag of any websites that need a thumbnail that will be visible when shared online. At the moment only three different style of backgrounds are used but this can be modified at any time.

The repository for this service can be found here: [@fairdataihub/kalai](https://github.com/fairdataihub/kalai)

## Technical details

This service is deployed on Vercel to take advantage of their caching platform. The functions are executed on Vercel Edge which means that the images are generated on the fly and cached for future use. This means that the first time an image is requested it will take a few seconds to generate but after that it will be served from the cache. The edge network is also global which means that the images will be served from the closest location to the user.

## How to use

To request an image from the og-image service, you can use query parameters in the URL for this purpose. The base url is https://kalai.fairdataihub.org/api/generate

```html
http://kalai.fairdataihub.org/api/generate?title=Hello!&description=Kalai%20is%20a%20thumbnail-generation%20service%20for%20fairdataihub&app=fairdataihub&org=fairdataihub
```

Three parameters are available where one is mandatory:

- `title` - **_Mandatory_** - Image title
- `description` - A short description that will be added under the title in the image
- `app` - The base style to use.
  - Allowed options: `fairdataihub` | `soda-for-sparc` | `fairshare` | `ai-readi` | `fair-biors`
  - Default: `fairdataihub`
  - Custom apps are also supported. The text you provide here will be added as is to the bottom left corner of the image. The default background will be used in this instance.
- `org` - The organization name to use (bottom right corner)
  - Allowed options: `fairdataihub` | `ai-readi` | `fair-biors`

:::tip
All images are generated on the fly so feel free to use this service for dynamically generated images. Ideally you would only use this for og-images but if another use case will benefit from this platform you can use this service for that as well.
:::

## Examples

:::warning
The URI encoded character for spaces '`%20`' is not visible on the docs. However this is required in the URL sent to this service.
:::

- Default style

```
https://kalai.fairdataihub.org/api/generate?app=fairdataihub&title=Open%20Graph%20Image%20Generation&org=fairdataihub&description=To%20ensure%20that%20we%20follow%20a%20consistent%20online%20presence%2C%20an%20open%20graph%20image%20generation%20service%20has%20been%20setup%20at%20the%20domain%20kalai.fairdataihub.org
```

![](https://kalai.fairdataihub.org/api/generate?app=fairdataihub&title=Open%20Graph%20Image%20Generation&org=fairdataihub&description=To%20ensure%20that%20we%20follow%20a%20consistent%20online%20presence%2C%20an%20open%20graph%20image%20generation%20service%20has%20been%20setup%20at%20the%20domain%20kalai.fairdataihub.org)

- SODA for SPARC style

```
https://kalai.fairdataihub.org/api/generate?app=soda-for-sparc&title=Storybook&org=fairdataihub&description=FAIR%20Data%20Innovations%20Hub%20uses%20Storybook%20to%20keep%20an%20index%20of%20all%20the%20components%20used%20within%20our%20applications
```

![](https://kalai.fairdataihub.org/api/generate?app=soda-for-sparc&title=Storybook&org=fairdataihub&description=FAIR%20Data%20Innovations%20Hub%20uses%20Storybook%20to%20keep%20an%20index%20of%20all%20the%20components%20used%20within%20our%20applications)

- FAIRshare style

```
https://kalai.fairdataihub.org/api/generate?app=fairshare&title=Release%20%7C%20FAIRshare&org=fairdataihub&description=How%20to%20release%20FAIRshare%20to%20the%20public
```

![](https://kalai.fairdataihub.org/api/generate?app=fairshare&title=Release%20%7C%20FAIRshare&org=fairdataihub&description=How%20to%20release%20FAIRshare%20to%20the%20public)

- AI-READI style

```html
https://kalai.fairdataihub.org/api/generate?app=ai-readi&title=AI-READI&org=ai-readi&description=AI-READI%20is%20a%20project%20that%20aims%20to%20develop%20a%20framework%20for%20responsible%20AI%20in%20the%20context%20of%20health%20and%20wellbeing%20research%20and%20innovation
```

![](https://kalai.fairdataihub.org/api/generate?app=ai-readi&title=AI-READI&org=ai-readi&description=AI-READI%20is%20a%20project%20that%20aims%20to%20develop%20a%20framework%20for%20responsible%20AI%20in%20the%20context%20of%20health%20and%20wellbeing%20research%20and%20innovation)

- FAIR-BioRS style

```html
https://kalai.fairdataihub.org/api/generate?app=fair-biors&title=FAIR-BioRS&org=fair-biors&description=FAIR-BioRS%20is%20a%20project%20that%20aims%20to%20develop%20a%20framework%20for%20responsible%20AI%20in%20the%20context%20of%20health%20and%20wellbeing%20research%20and%20innovation
```

![](https://kalai.fairdataihub.org/api/generate?app=fair-biors&title=FAIR-BioRS&org=fair-biors&description=FAIR-BioRS%20is%20a%20project%20that%20aims%20to%20develop%20a%20framework%20for%20responsible%20AI%20in%20the%20context%20of%20health%20and%20wellbeing%20research%20and%20innovation)

- Custom style

```html
https://kalai.fairdataihub.org/api/generate?app=My%20Custom%20App&title=Custom%20App&org=custom&description=This%20is%20a%20custom%20app%20that%20uses%20the%20default%20background
```

![](https://kalai.fairdataihub.org/api/generate?app=My%20Custom%20App&title=Custom%20App&org=custom&description=This%20is%20a%20custom%20app%20that%20uses%20the%20default%20background)

:::tip
If you want to play around with the images generated by this service or generate some image URLs you can use the simple editor provided at kalai.fairdataihub.org
:::
