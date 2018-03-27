import React from 'react'
import { Helmet } from 'react-helmet'
import CenteredLayout from '../../layouts/CenteredLayout'
import Signpost from './Signpost'
import WithRouterLogged from '../../containers/WithRouter/WithRouterLogged'

const HomePage = (props) => (
  <WithRouterLogged>
    <CenteredLayout>
      <div>
      <Helmet>
        <title>NT SN | Home</title>
      </Helmet>
      
      <Signpost />
    </div>
    </CenteredLayout>
  </WithRouterLogged>
)

export default HomePage
