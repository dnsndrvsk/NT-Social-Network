import React from 'react'
import { Helmet } from 'react-helmet'
import GolfImage from 'material-ui/svg-icons/places/golf-course'
import './404.scss'

const PageNotFound = () => {
  const golfImageStyle = {
    color: '#808080',
    height: '200px',
    width: '200px'
  }
  
  return (
    <div className="page-not-found">
      <Helmet>
        <title>404</title>
      </Helmet>
      <div className="page-not-found__table">
        <div className="page-not-found__cell">
          <GolfImage style={golfImageStyle} />
          <h1>Oops! <br/> There is no such page.</h1>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
