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

## Minimal Event Handling

Next, some minimal event handlers are connected, so we can trigger some actions in the view model from the view:

- Clicking the combobox opens and closes it, so the options can be viewed.
- Clicking an option selects it.

This makes it rudimentarily “usable,” but there's still some work left.

## Focus Management

Closing the select after selecting an option triggers some focus issues.
We have to attach some focus checks and blur handlers to maintain focus in these situations.

- Selecting an option should bring back focus to the select after closing.
- Focusing away should close the select and leave focus alone, no focus trap.

## Keyboard Navigation

This important feature is still missing in our select.
A keyboard event handler has to listen for navigation keys, so keyboard users can focus and select options without having to use a mouse.

- Focus previous/next option: Arrow up/down
- Focus first/last option: Home/End
- Focus previous/next page: Page up/down
- Select the currently focused option: Space/Enter
- Close: Escape

## Find by Typing

It should be possible to focus an option by typing prefix characters.
This is achieved by creating a Svelte action and attaching it to the select.
Actions add behavior to DOM elements and abstract out the behavior from the component.

If the select is open, typing some chars searches for a matching option.
It forgets your typed chars after you stopped typing for 300 ms.

## Keeping Focused Option Visible

Last, we have to ensure that an option remains visible when it is focused.
We attach an action to the listbox that scrolls focused invisible options into view.

## Work done

Finally, we have a working and accessible select component written in Svelte.
Styling and behavior could further be adapted to meet certain requirements.
