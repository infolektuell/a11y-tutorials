# Accessible Dropdown menu

This demonstrates how to build an accessible dropdown menu from scratch.

## What is a dropdown?

When people talk about _dropdowns_, they often think of the [disclosure pattern] which is showing/hiding content and relatively easy to implement.
Please check if your use-case is covered by disclosure.
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

For reference, a native select containing the example data is added to the single Astro page.

- Clone this repo and checkout this branch
- `npm i`
- `npm run dev`
- Press o and enter

The browser should open the page with the native select.

[example]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
