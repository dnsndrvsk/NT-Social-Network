import React from 'react'
import './CenteredLayout.scss'

const CenteredLayout = (props) => (
  <div className="centered-layout">
    <div className="centered-layout__table">
      <div className="centered-layout__cell">
        <div className="centered-layout__item">
          {props.children}
        </div>
      </div>
    </div>
  </div>
)

export default CenteredLayout
