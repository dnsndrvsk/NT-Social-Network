export const getYoutubeVideoId = (url) => {
  const re = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
  const match = url.match(re)
  return (match && match[7].length === 11) ? match[7] : false
}

export const getVideoThumb = (url, thumbNum) => {
  const videoId = getYoutubeVideoId(url)
  const thumbIndex = thumbNum && thumbNum < 4 ? thumbNum : 1
  return videoId ? `https://img.youtube.com/vi/${videoId}/${thumbIndex}.jpg` : null
}

export const getEmbedVideoUrl = (url) => {
  const videoId = getYoutubeVideoId(url)
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null
}
