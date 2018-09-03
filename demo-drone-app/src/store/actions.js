export const actions = {
    changeAccessToken ({commit}) {
        commit('setAccessToken')
      },
    init(store) {
        store.commit('setAccessToken', localStorage.getItem('access_token'))
    }
}