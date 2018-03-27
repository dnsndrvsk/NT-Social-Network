import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import RoundAvatar from '../../../../../RoundAvatar'

const wrapStyle = {
  padding: '50px',
  textAlign: 'center'
}

const linkStyle = {
  display: 'inline-block',
  margin: '8px'
}


class LikeList extends Component {
  constructor(props) {
    super(props)
    
    this.state = { to: 14, amount: 14 }
  }
  
  componentDidMount() {
    this.setState({
      to: this.props.amount || 14,
      amount: this.props.amount || 14
    })
  }
  
  showPrev = () => {
    this.setState({ to: this.state.to - this.state.amount })
  }
  
  showNext = () => {
    this.setState({ to: this.state.to + this.state.amount })
  }
  
  render() {
    const { avatarlikes } = this.props.viewableUser
    const allLikes = avatarlikes.length
    const { to, amount } = this.state
    const likes = avatarlikes.slice(to - amount, to)
    
    return (
      <div style={wrapStyle}>
        <div>
          {
            allLikes > amount
              ? <FlatButton
                  label="Previous"
                  onClick={this.showPrev}
                  disabled={to <= amount}
                  fullWidth={true}
                />
              : null
          }
        </div>
        <div>
          {likes.map((user, i) => {
            return (
              <Link
                style={linkStyle}
                to={`/userpage/${user._id}`}
                title={`${user.name} ${user.secondName}`}
                key={i}
              >
                <RoundAvatar user={user} />
              </Link>
            )
          })}
        </div>
        <div>
          {
            allLikes > amount
              ? <FlatButton
                  label="Next"
                  onClick={this.showNext}
                  disabled={to > avatarlikes.length}
                  fullWidth={true}
                />
              : null
          }
        </div>
      </div>
    )
  }
}

LikeList.propTypes = {
  viewableUser: PropTypes.object.isRequired,
  amount: PropTypes.number
}

export default LikeList
