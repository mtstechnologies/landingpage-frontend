type AuthState = {
  username: string
  password: string
  isAuthenticated: boolean
}

let state: AuthState = {
  username: '',
  password: '',
  isAuthenticated: false,
}

export const authStore = {
  get: () => state,
  set: (username: string, password: string) => {
    state = { username, password, isAuthenticated: true }
  },
  clear: () => {
    state = { username: '', password: '', isAuthenticated: false }
  },
  getBasicAuth: () =>
    state.isAuthenticated
      ? `Basic ${btoa(`${state.username}:${state.password}`)}`
      : null,
}
