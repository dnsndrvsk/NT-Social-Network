import React from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import config from '../../../config'
import './Signpost.scss'

const Signpost = () => (
  <Paper  className="signpost" zDepth={2}>
    <div className="signpost__wrapper">
      <h1>Welcome to the <br/> {config.name}</h1>
      <div className="signpost__text">
        Would you like to
      </div>
      <div className="signpost__links">
        <Link to="/login">
          <RaisedButton
            label="Login"
            primary={true}
          />
        </Link>
        <div>or</div>
        <Link to="/registration">
          <RaisedButton 
            label="Register"
            secondary={true}
          />
        </Link>
      </div>
    </div>
  </Paper>
)

export default Signpost
