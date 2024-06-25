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

SODA employs a custom React architecture to dynamically render components into designated "component slots," which are simply div elements in the base HTML. The state of these components is managed by the state-management library Zustand, allowing state updates from both React components and external JavaScript files. SODA utilizes [Mantine](https://mantine.dev/) as its primary UI library, offering a comprehensive range of pre-built components used throughout the application.

# Adding React Components to SODA

This tutorial will guide you through creating a component without state, and then we'll extend it to include state in the second part of the tutorial.

## Step 1: Define the Component Slot in HTML

To render a React component, you need to define a slot in your existing HTML. This slot is an empty div element with the appropriate data-component-type attribute (this will make sense later...). Here's an example:

```html
<div
  data-component-type="custom-button"
  data-button-text="Hello, I am a button!"
  data-button-id="guided-button-example"
></div>
```

## Step 2: Create the React Component

Next, create a React component that takes the data-button-text and data-button-id attributes from the HTML as props.

```jsx
import { Button } from '@mantine/core';

const CustonButton = ({buttonId, buttonText}}) => {

  return (
    <Button id={buttonId}>{buttonText}</Button>
  )
}
export default CustonButton;
```

## Step 3: Add the Component to the Renderer

Now that you have a CustomButton component and the HTML slot where it will be rendered, you need to update the componentTypeRenderers object in ReactComponentRenderer.jsx to include your new component type.

```js

import CustomButton from './path-to/button'
// Mapping of component types to their render functions
const componentTypeRenderers = {
  ...,
  "custom-button": (componentSlot) => {
    // Extract props from the HTML
    const props = {
      buttonId: componentSlot.getAttribute("data-button-id"),
      buttonText: componentSlot.getAttribute("data-button-text")
    }
    /* Use renderComponent function used by all other renderers to mount the component to the DOM */
    renderComponent(componentSlot, <CustomButton {...props}>)
  }
}
```

# Adding State Management with Zustand

Now let's extend this example to include state management using Zustand.

## Step 4: Add a Zustand Store state slice

Create a Zustand store to manage the state. Let's say you want to manage a simple counter.

```js
import useGlobalStore from '../globalStore'; // Import the global state store
import { produce } from 'immer'; // produce makes working with nested state modifications easier

export const counterSlice = (set) => ({
  counterVariable: 0,
});

// State modification methods are defined outside of the slice for easier use in non-React js files
export const incrementCount = () => {
  useGlobalStore.setState(
    produce((state) => {
      state.counterVariable = state.counterVariable + 1;
    }),
  );
};

export const decrementCount = () => {
  useGlobalStore.setState(
    produce((state) => {
      state.counterVariable = state.counterVariable - 1;
    }),
  );
};
```

## Step 5: Integrate the Slice into the Global Store

```js
import { counterSlice } from './slices/counterSlice';

const useGlobalStore = create(
  immer((...a) => ({
    ...guidedModeSlice(...a),
    ...counterSlice(...a), // Add the slice to the global store
  })),
);
```

## Step 6: Update the Component to Use Zustand

Update your CustomButton component to use Zustand for managing and updating the counter state.

```jsx
import { Text, Button } from '@mantine/core';
import useGlobalStore from '../globalStore';
import { incrementCounter, decrementCounter } from '../counterSlice'

const CustonButton = ({buttonId, buttonText}}) => {
  // Extract the counterVariable from the state store.
  // Note: When this value changes from either hitting the increment/decrement buttons or from
  // an external js file, the component will be re-rendered.
  const counterVariable = useGlobalStore((state) => state.counterVariable)
  return (
    <div>
      <Button id={buttonId}>{buttonText}</Button>
      <Button onClick={incrementCounter}>Increment</Button>
      <Button onClick={decrementCounter}>Decrement</Button>
      <Text>{counterVariable}</Text>
    </div>
  )
}
export default CustonButton;
```

# Modifying the global store state values outside of React

Example of accessing and modifying Zustand store values in a vanilla JavaScript file.

```js
import useGlobalStore from '../../stores/globalStore'; // Import global store to retrieve state
import {
  incrementCounter,
  decrementCounter,
} from '../../stores/slices/counterSlice';

// To get the state value in a js file, call the getState method on the store
const counterValue = useGlobalStore.getState()['counterVariable'];

// You can also call the store methods in vanilla js files
if (counterValue === 5) {
  incrementCounter(); // Adds one to the counter and re-renders the react components that use it
} else {
  decrementCounter();
}
```
