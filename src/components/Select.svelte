<script lang="ts">
  import { SelectViewModel } from './SelectViewModel.svelte.ts'
  type Props = {
    label: string
    placeholder: string
    options: string[]
    pageSize?: number
    value?: string
  }
  let { label, placeholder, options, pageSize = 10, value = $bindable('') }: Props = $props()
  const vm = new SelectViewModel({
    label: () => label,
    options: () => options,
    placeholder: () => placeholder,
    pageSize: () => pageSize,
    value: [() => value, (val: string) => { value = val }],
  })
  const uid = $props.id()
  const labelId = uid + '-label'
  const comboboxId = uid + '-combobox'
  const menuId = uid + '-menu'
  let optionIds = $derived(vm.options.map((_, i) => uid + '-option-' + i))
  let comboBox: HTMLElement
  let listBox: HTMLElement
  const onclick = function () {
    vm.toggle()
  }
  const onOptionClick = function (ev: Event, index: number) {
    ev.stopPropagation()
    const closed = vm.select(index)
    if (closed && document.activeElement !== comboBox) { comboBox.focus() }
  }
  const onmousedown = function (ev: MouseEvent) {
    if (!ev.target) { return }
    ev.target.ignoreBlur = true
  }
  const onblur = function (ev: FocusEvent) {
    if (ev.relatedTarget && listBox.contains(ev.relatedTarget as Node)) { return }
    vm.close()
  }
  const onkeydown = function (ev: KeyboardEvent) {
    const { key } = ev
    if (vm.isOpen) {
      switch (key) {
        case 'Home':
          vm.goToFirst()
          ev.preventDefault()
          break
        case 'End':
          vm.goToLast()
          ev.preventDefault()
          break
        case 'PageUp':
          vm.goToPreviousSet()
          ev.preventDefault()
          break
        case 'PageDown':
          vm.goToNextSet()
          ev.preventDefault()
          break
        case 'ArrowUp':
          vm.goToPrevious()
          ev.preventDefault()
          break
        case 'ArrowDown':
          vm.goToNext()
          ev.preventDefault()
          break
        case ' ':
        case 'Enter':
          vm.select()
          ev.preventDefault()
          break
        case 'Escape':
          vm.close()
          ev.preventDefault()
      }
    } else {
      switch (key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'Enter':
        case ' ':
          vm.open()
          ev.preventDefault()
      }
    }
  }
</script>
<div class="combo">
  <div
    class="combo-label"
    id={labelId}
    {onclick}
  >{vm.label}</div>
  <div
    aria-activedescendant={vm.isOpen ? optionIds[vm.current] : null}
    aria-controls={menuId}
    aria-expanded={vm.isOpen}
    aria-haspopup="listbox"
    aria-labelledby={labelId}
    bind:this={comboBox}
    id={comboboxId}
    {onblur}
    {onclick}
    {onkeydown}
    role="combobox"
    tabindex="0"
  >{vm.hasSelection ? vm.value : vm.placeholder}</div>
  <div
    aria-labelledby={labelId}
    bind:this={listBox}
    hidden={!vm.isOpen}
    id={menuId}
    onfocusout={onblur}
    role="listbox"
    tabindex="-1"
  >
    {#each vm.options as option, index}
      <div
        aria-disabled={vm.selected === index}
        aria-selected={vm.selected === index}
        class:option-current={vm.current === index}
        id={optionIds[index]}
        onclick={(ev) => onOptionClick(ev, index)}
        {onmousedown}
        role="option"
      >{option}</div>
    {/each}
  </div>
</div>
<style>
  .combo *,
  .combo *::before,
  .combo *::after {
    box-sizing: border-box;
  }

  .combo {
    display: block;
    margin-bottom: 1.5em;
    max-width: 400px;
    position: relative;
  }

  .combo::after {
    border-bottom: 2px solid rgb(0 0 0 / 75%);
    border-right: 2px solid rgb(0 0 0 / 75%);
    content: '';
    display: block;
    height: 12px;
    pointer-events: none;
    position: absolute;
    right: 16px;
    top: 65%;
    transform: translate(0, -65%) rotate(45deg);
    width: 12px;
  }

  [role='combobox'] {
    background-color: #f5f5f5;
    border: 2px solid rgb(0 0 0 / 75%);
    border-radius: 4px;
    display: block;
    font-size: 1em;
    min-height: calc(1.4em + 26px);
    padding: 12px 16px 14px;
    text-align: left;
    width: 100%;
  }

  [aria-expanded='true'] {
    border-radius: 4px 4px 0 0;
  }

  [role='combobox']:focus {
    border-color: #0067b8;
    box-shadow: 0 0 4px 2px #0067b8;
    outline: 4px solid transparent;
  }

  .combo-label {
    display: block;
    font-weight: 100;
    margin-bottom: 0.25em;
    font-size: 1.2em;
  }

  [role='listbox'] {
    background-color: #f5f5f5;
    border: 1px solid rgb(0 0 0 / 75%);
    border-radius: 0 0 4px 4px;
    max-height: 300px;
    overflow-y: scroll;
    left: 0;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 100;
  }

  [role='option'] {
    padding: 10px 12px 12px;
  }

  [role='option']:hover {
    background-color: rgb(0 0 0 / 10%);
  }

  [role='option'].option-current {
    outline: 3px solid #0067b8;
    outline-offset: -3px;
  }

  [aria-selected='true'] {
    padding-right: 30px;
    position: relative;
  }

  [aria-selected='true']::after {
    border-bottom: 2px solid #000;
    border-right: 2px solid #000;
    content: '';
    height: 16px;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translate(0, -50%) rotate(45deg);
    width: 8px;
  }
</style>
