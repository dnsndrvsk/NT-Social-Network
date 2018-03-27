import React from 'react'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-component'
import VideoPost from '../../containers/VideosList/VideoPost'

const styles = {
  wrapper: {
    padding: '20px'
  },
  item: {
    float: 'left',
    width: '25%',
    padding: '0 5px'
  }
}

const VideosList = (props) => (
  <div
    className="clearfix"
    style={styles.wrapper}
  >
    <Masonry>
      {props.videos.map((video, i) => {
        return (
          <div
            style={props.itemStyle ? props.itemStyle : styles.item}
            key={i} 
          >
            <VideoPost
              data={video}
              shortTitle={props.shortTitles && true}
            />
          </div>
        )
      })}
    </Masonry>
  </div>
)

VideosList.propTypes = {
  videos: PropTypes.array.isRequired,
  itemStyle: PropTypes.object,
  shortTitles: PropTypes.bool
}

export default VideosList
