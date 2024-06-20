---
lang: en-US
title: Using React in SODA
description: Guide on how to render React components and mange global state with Zustand
head:
  - - meta
    - name: 'og:image'
      content: 'https://kalai.fairdataihub.org/api/generate?title=Using%20React%20in%20SODA&description=A%20guide%20on%20how%20to%20render%20React%20components%20and%20manage%20global%20state%20with%20Zustand&app=soda-for-sparc&org=fairdataihub'
---

# SODA React Overview

SODA employs a custom React architecture to render components into designated "component slots," which are simply divs in the base HTML. The state of these components is managed by the state-management library Zustand, allowing state updates from both React components and external JavaScript files. SODA utilizes [Mantine](https://mantine.dev/) as its primary UI library, offering a comprehensive range of pre-built components used throughout the application.

# Creating a React Component

For this example, we will create a basic text input.

First, we will create a React Component that

First, add an empty div anywhere in the existing HTML that has a data-component-type attribute of the component you would like to create, for example 'example-text-input'

```html
<div
  data-component-type="example-text-input"
  data-initial-text="Hello SODA developer!"
></div>
```

Next we will want to

## How to raise requests errors to the error handler

From within any API endpoint code simply use the requests library 'raise_for_status()' method. There is no need to catch this or re-raise it unless you need to do some processing / procedure at the time of an error's occurrence before re-raising. For example, in the upload function main_curate_function we catch any errors that are raised so that we can change the curation status before the error is then re-raised to the central error handler.

In some instances you may want to build out a longer error message. For example, if you are scanning for invalid files in a user's dataset. In these instances catch the errors to prevent them from raising and build out the message.

## Handling Pennsieve errors

Any Pennsieve error may be a 5xx error. If doing any of the above processing be sure to make sure the error was nit a 5xx. If it is reraise the error without modifying it so it can be processed by the error handler in the most appropriate manner.

::: tip
There are functions for checking if the pennsieve response is a 5xx or some other 4xx. These can be found in the pennsieveUnexpectedError.py file.
There is also functions for checking if the pennsieve servce is down. In these cases raise the error to the central error handler.
:::

# Handling werkzeug errors

Create werkzeug errors using abort whenever sending a custom error. The error handler will send these up to the user as is.

# Handling python exceptions

Any python exception raised to the error handler is essentially an unexpected error. This will be handled by sending back a 500 the the client.
