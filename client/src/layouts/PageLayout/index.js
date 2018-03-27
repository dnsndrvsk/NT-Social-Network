import React from 'react'
import './PageLayout.scss'

const PageLayout = (props) => (
  <div className="page-layout">
    <div className="container">
      <div className="row">
        {props.children}
      </div>
    </div>
  </div>
)

export default PageLayout
