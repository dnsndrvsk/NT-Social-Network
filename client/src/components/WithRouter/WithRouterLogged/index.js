import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class WithRouterLogged extends Component {
  componentDidMount() {
    if (this.props.activeUser) {
      this.props.history.push(`/userpage/${this.props.activeUser._id}`)
    }
  }
  
  componentDidUpdate() {
    if (this.props.activeUser) {
      this.props.history.push(`/userpage/${this.props.activeUser._id}`)
    }
  }
  
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

WithRouterLogged.propTypes = {
  activeUser: PropTypes.object
}

export default withRouter(WithRouterLogged)
