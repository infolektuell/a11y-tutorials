export type Inputs = {
  label: () => string
  placeholder: () => string
  options: () => string[]
  pageSize: () => number
  value: [() => string, (val: string) => void]
}

export class SelectViewModel {
  isOpen = $state(false)
  current = $state(-1)
  constructor(public inputs: Inputs) {}
  get label() {
    return this.inputs.label()
  }
  get options() {
    return this.inputs.options()
  }
  get isEmpty() {
    return this.options.length === 0
  }
  get maxIndex() {
    return this.options.length - 1
  }
  get placeholder() {
    return this.inputs.placeholder()
  }
  get pageSize() {
    return this.inputs.pageSize()
  }
  get value() {
    const val = this.inputs.value[0]()
    return this.options.includes(val) ? val : ''
  }
  set value(value: string) {
    if (this.options.includes(value)) {
      this.inputs.value[1](value)
    }
  }
  get hasSelection() {
    return this.value !== ''
  }
  get selected() {
    return this.options.indexOf(this.value)
  }
  set selected(index: number) {
    if (index >= 0 && index <= this.maxIndex) {
      this.value = this.options[index]
    }
  }
  open() {
    if (this.isEmpty || this.isOpen) {
      return false
    }
    this.current = this.hasSelection ? $state.snapshot(this.selected) : 0
    this.isOpen = true
    return true
  }
  close() {
    if (!this.isOpen) {
      return false
    }
    this.isOpen = false
    this.current = -1
    return true
  }
  toggle() {
    return this.isOpen ? this.close() : this.open()
  }
  select(index?: number): boolean {
    if (this.isEmpty || !this.isOpen) {
      return false
    }
    const selection = index ?? $state.snapshot(this.current)
    if (selection < 0 || selection > this.maxIndex || selection === this.selected) {
      return false
    }
    if (selection !== this.current) {
      this.current = selection
    }
    this.selected = selection
    return this.close()
  }
  goToFirst() {
    if (this.isEmpty) {
      return false
    }
    this.current = 0
    return true
  }
  goToLast() {
    if (this.isEmpty) {
      return false
    }
    this.current = this.maxIndex
    return true
  }
  goToPrevious() {
    if (this.isEmpty) {
      return false
    }
    this.current = Math.max(0, this.current - 1)
    return true
  }
  goToNext() {
    if (this.isEmpty) {
      return false
    }
    this.current = Math.min(this.current + 1, this.maxIndex)
    return true
  }
  goToPreviousSet() {
    if (this.isEmpty) {
      return false
    }
    this.current = Math.max(0, this.current - this.pageSize)
    return true
  }
  goToNextSet() {
    if (this.isEmpty) {
      return false
    }
    this.current = Math.min(this.current + this.pageSize, this.maxIndex)
    return true
  }
  search(query: string): boolean {
    let index: number = -1
    const orderedOptions = [...this.options.slice(this.current + 1), ...this.options.slice(0, this.current)]
    const chars = query.split('')
    const firstMatch = this.filterOptions(orderedOptions, query)[0]

    // first check if there is an exact match for the typed string
    if (firstMatch) {
      index = this.options.indexOf(firstMatch)
    }

    // if the same letter is being repeated, cycle through first-letter matches
    else if (this.allSameLetter(chars)) {
      const matches = this.filterOptions(orderedOptions, query[0])
      const match = matches[Math.max(0, matches.length - 1)]
      index = this.options.indexOf(match)
    }

    if (index > -1) {
      this.current = index
      return true
    }
    return false
  }
  private filterOptions(options: string[], filter: string, exclude: string[] = []) {
    const filterString = filter.toLowerCase()
    return options.filter((option) => {
      const matches = option.toLowerCase().startsWith(filterString)
      return matches && !exclude.includes(option)
    })
  }
  private allSameLetter(array: string[]) {
    return array.every((letter) => letter === array[0])
  }
}
