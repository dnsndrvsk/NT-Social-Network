import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import PageLayout from '../../layouts/PageLayout'
import VideosList from '../VideosList'
import WithRouterNotLogged from '../../containers/WithRouter/WithRouterNotLogged'

const itemStyle = {
  float: 'left',
  width: '33.33333%',
  padding: '0 10px',
  marginBottom: '30px'
}


const VideosPage = (props) => (
  <WithRouterNotLogged>
    <PageLayout>
      <div>
        <Helmet>
          <title>NT SN | Videos</title>
        </Helmet>
        {
          props.viewableUser && props.viewableUser.videos
            &&  <VideosList
                  videos={props.viewableUser.videos}
                  itemStyle={itemStyle}
                />
        }
      </div>
    </PageLayout>
  </WithRouterNotLogged>
)

VideosPage.propTypes = {
  activeUser: PropTypes.object,
  viewableUser: PropTypes.object
}


export default VideosPage
