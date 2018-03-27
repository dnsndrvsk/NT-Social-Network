function findUnverifiedUserId() {
  return localStorage.NTunverifiedUserID || null
}

export const provideUnverifiedUserId = () => {
  const unverifiedUserId = findUnverifiedUserId()
  return unverifiedUserId ? unverifiedUserId : null
}

export const setUnverifiedUserId = (userId) => {
  localStorage.setItem('NTunverifiedUserID', userId)
}

export const removeUnverifiedUserId = () => {
  localStorage.removeItem('NTunverifiedUserID')
}
