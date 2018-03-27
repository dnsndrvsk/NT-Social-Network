import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.locale(en)

const timeAgo = new TimeAgo('en-US')

export const getPassedTime = (rDate) => {
  const date = new Date(rDate)
  return timeAgo.format(date)
}

// rDate should be like 2018-03-21T09:24:45.150Z
export const getAllDateData = (rDate) => {
  const bDate = new Date(rDate).toString()
  
  const dayN = bDate.split(' ')[2]
  const dayC = bDate.split(' ')[1]
  const time = bDate.split(' ')[4]
  const year = bDate.split(' ')[3]
  
  return { dayN, dayC, time, year }
}
