export const validateName = name => {
  const re = /^[A-Za-z ,.'-]+$/
  return re.test(name)
}

export const validateEmail = email => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = password => {
  //Requires 6-20 characters including at least 1 upper or lower alpha, and 1 digit.
  //It should disallow just about everything else, inluding extended characters.
  const re = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{6,15}$/
  return re.test(password)
}
