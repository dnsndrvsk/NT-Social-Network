import React from 'react'
import { Helmet } from 'react-helmet'
import SpinnerComponent from '../SpinnerComponent'
import './SpinnerPage.scss'

const SpinnerPage = () => (
  <div className="spinner-page">
    <Helmet>
      <title>NT SN | Loading...</title>
    </Helmet>
    <div className="spinner-page__table">
      <div className="spinner-page__cell">
        <SpinnerComponent size={120} thickness={10} />
      </div>
    </div>
  </div>
)

export default SpinnerPage