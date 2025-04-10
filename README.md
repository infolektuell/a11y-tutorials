# Inspecting the Web Accessibility Tree

This is the accompanying code for my video on testing via [accessibility tree] in the browser.

## What I did

- Created a fresh astro project
- Inserted an example from the [hero docs][bulma-hero] of the Bulma  CSS framework
- Run the project in dev mode
- Open in browser and view accessibility properties in dev tools (quite sad and boring)
- Made additions to enhance the A11Y tree
- Watched the tree in dev tools becoming happier with each commit

## Enhancements

- Added [banner] landmark via header element, because hero head contains site navigation
- Added better alt text to logo (company name or alike, **not logo**)
- Added href attributes to a elements, these are needed to get the link role
- Added label to link with icon
- Indicates links to current page via `aria-current` attribute
- Turned hamburger into an accessible disclosure button
- Implemented [disclosure pattern] for mobile menu
- Use more semantic elements for hero content

[accessibility tree]: https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree
[bulma-hero]: https://bulma.io/documentation/layout/hero/
[banner]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/banner_role
[disclosure pattern]: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
