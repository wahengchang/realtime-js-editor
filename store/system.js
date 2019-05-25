export const state = () => ({
  isLoading: false
})

export const mutations = {
  setIsLoading(state, isOn = false) {
    state.isLoading = isOn
  }
}
