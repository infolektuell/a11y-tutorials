import type { Action } from 'svelte/action'
type Param = { duration: number; submit: (val: string) => boolean }
export const findByLetter: Action<HTMLElement, Param> = function (el, { duration = 300, submit }) {
  let searchTimeout: number | null = null
  let searchInput = ''
  function update(char: string) {
    destroy()
    searchTimeout = window.setTimeout(() => {
      searchInput = ''
    }, duration)
    searchInput += char
    const isValid = submit(searchInput)
    if (!isValid) {
      searchInput = ''
    }
  }
  function destroy() {
    if (typeof searchTimeout === 'number') {
      window.clearTimeout(searchTimeout)
    }
  }
  el.addEventListener('keydown', (ev: KeyboardEvent) => {
    const { key, altKey, ctrlKey, metaKey } = ev
    const hasModifier = altKey || ctrlKey || metaKey
    const isTypeKey = (!hasModifier && key.length === 1 && key !== ' ') || key === 'Clear' || key === 'Backspace'
    if (isTypeKey) {
      update(key)
      ev.preventDefault()
    }
  })
  return { destroy }
}
