function findActiveUserId() {
  return localStorage.NTactiveUserID || null
}

export const provideActiveUserId = () => {
  const userId = findActiveUserId()
  return userId ? userId : null
}

export const setActiveUserId = (userId) => {
  localStorage.setItem('NTactiveUserID', userId)
}

export const removeActiveUserId = () => {
  localStorage.removeItem('NTactiveUserID')
}
