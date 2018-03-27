import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const SpinnerComponent = (props) => (
  <div style={{textAlign: "center"}}>
    <CircularProgress
      size={props.size}
      thickness={props.thickness}
    />
  </div>
)

export default SpinnerComponent
