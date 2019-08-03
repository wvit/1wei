export const change = (data = {}) => {
  return {
    type: 'change',
    ...data
  }
}

