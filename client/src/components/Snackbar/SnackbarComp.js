import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'

class Snackbar extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleTouchTap = () => {
    this.setState({ open: true })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <div>
        <RaisedButton
          onClick={this.handleTouchTap}
          label="Add to my calendar"
        />
        <Snackbar
          open={this.state.open}
          message="Event added to your calendar"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default Snackbar
