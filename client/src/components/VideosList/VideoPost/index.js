import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'
import PlayImage from 'material-ui/svg-icons/av/play-circle-filled'
import { getVideoThumb } from '../../../utils/videos'
import { getAllDateData } from '../../../utils/date'
import { trimText } from '../../../utils/text'
import './VideoPost.scss'

const imageStyle = {
  color: '#E91E63',
  width: '30%',
  height: '30%',
}


const VideoPost = (props) => {
  const { title, date, url } = props.data
  const { dayN, dayC, year } = getAllDateData(date)
  const thumbnail = getVideoThumb(url, 2)
  
  const openThing = () => {
    console.log('abc')
    props.openVideoPlayer()
  }
  
  return (
    <Card className="video-post">
      <div className="video-post__header">
        {props.shortTitle ? trimText(title, 15) : title}
      </div>
      <div className="video-post__date">
        {`${dayC} ${dayN} ${year}`}
      </div>
      <div
        className="video-post__image"
        onClick={openThing} 
      >
        <img src={thumbnail} alt={title} />
        <div className="video-post__overlay">
          <div className="video-post__table">
            <div className="video-post__cell">
              <PlayImage style={imageStyle} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

VideoPost.propTypes = {
  data: PropTypes.object.isRequired,
  shortTitle: PropTypes.bool,
  openVideoPlayer: PropTypes.func.isRequired
}


export default VideoPost



//src={this.props.url + '?autoplay=0'}
