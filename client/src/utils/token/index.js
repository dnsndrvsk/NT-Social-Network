function findToken() {
  return localStorage.NTactiveUserToken || null
}

export const provideToken = () => {
  const token = findToken()
  return token ? {"Authorization": 'Bearer ' + token} : {}
}

export const setToken = (token) => {
  localStorage.setItem('NTactiveUserToken', token)
}

export const removeToken = () => {
  localStorage.removeItem('NTactiveUserToken')
}
