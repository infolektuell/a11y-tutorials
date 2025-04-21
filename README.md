# Accessible Dropdown menu

This demonstrates how to build an accessible dropdown menu from scratch.

## What is a dropdown?

When people talk about _dropdowns_, they often think of the [disclosure pattern] which is showing/hiding content and relatively easy to implement.
Please check if a disclosure might already suit your needs.
A native disclosure element is `details` and `summary`, but unfortunately, browser support for styling still has some limitations.
The same applies for the native `select`, that's why people want custom controls.

A dropdown menu has an associated popup that lets users choose from allowed options. It is composed of two patterns:

1. [Combobox pattern] for the popup behavior
2. [Listbox pattern] for selectable options

[combobox pattern]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
[disclosure pattern]: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
[listbox pattern]: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/

## What we build

We rebuild an [example] from APG as a Svelte component running Astro.
Declarative code facilitates highlighting the critical concepts for A11Y.

The Astro page contains the example data as a native select element.

- Clone this repo and check out this branch
- `npm i`
- `npm run dev`
- Press o and enter

The browser should open the page with the native select.

[example]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/

## View Model

First, a view model is created to describe the possible state of this control, and the actions a user can perform to change that state.
The view will bind to the state and trigger its actions by event handlers.

- State:
  - Open/closed
  - Options, label, placeholder
  - Current (focused) option,
  - Selected option
- Actions
  - Open/close
  - Select option,
  - Focus next/previous, first/last, or next/previous page
  - Focus an option by prefix search.

## View with Basic Markup

Next, the view is created with the following minimal setup:

1. Properties and initialized view model
2. Unique IDs necessary to connect HTML elements using ARIA attributes
3. HTML structure with required roles and ARIA attributes, bound to the view model

## Styles

The component needs some CSS to look like a select box.
This is crucial for A11Y, too.

- Indicate if the select is open or closed
- Indicate which option is focused, hovered, or selected
- A bit unusual: Use roles and ARIA attributes as CSS selector, if possible
