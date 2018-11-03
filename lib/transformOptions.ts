const transformOptions = (options: Array<{ text: string; value: string }>) => {
  if (options) {
    return options.map(i => i.value)
  }
}

export default transformOptions
