import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class WithRouterNotLogged extends Component {
  componentDidMount() {
    if (!this.props.activeUser) {
      this.props.history.push('/home')
    }
  }
  
  componentDidUpdate() {
    if (!this.props.activeUser) {
      this.props.history.push('/home')
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

WithRouterNotLogged.propTypes = {
  activeUser: PropTypes.object
}

export default withRouter(WithRouterNotLogged)
