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
</script>
<div class="combo">
  <div
    class="combo-label"
    id={labelId}
  >{vm.label}</div>
  <div
    aria-activedescendant={vm.isOpen ? optionIds[vm.current] : null}
    aria-controls={menuId}
    aria-expanded={vm.isOpen}
    aria-haspopup="listbox"
    aria-labelledby={labelId}
    id={comboboxId}
    role="combobox"
    tabindex="0"
  >{vm.hasSelection ? vm.value : vm.placeholder}</div>
  <div
    aria-labelledby={labelId}
    hidden={!vm.isOpen}
    id={menuId}
    role="listbox"
    tabindex="-1"
  >
    {#each vm.options as option, index}
      <div
        aria-disabled={vm.selected === index}
        aria-selected={vm.selected === index}
        class:option-current={vm.current === index}
        id={optionIds[index]}
        role="option"
      >{option}</div>
    {/each}
  </div>
</div>
