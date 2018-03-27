import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import RoundAvatar from '../RoundAvatar'
import FlatButton from 'material-ui/FlatButton'

class UserList extends Component {
  constructor(props) {
    super(props)
    
    this.state = { to: 10 }
  }
  
  showPrev = () => {
    this.setState({ to: this.state.to - 10 })
  }
  
  showNext = () => {
    this.setState({ to: this.state.to + 10 })
  }
  
  render() {
    const { users, showFullNames, hideButtons } = this.props
    const from = this.props.secondMode ? this.state.to - 10 : 0
    const usersToShow = users.slice(from, this.state.to)
    
    return (
      <List>
        <div>
          {
            this.props.secondMode
              ? <FlatButton
                  label="Show previous"
                  fullWidth={true}
                  onClick={this.showPrev}
                  disabled={from === 0}
                />
              : null
          }
        </div>
        <div>
          {usersToShow.map((user, i) => {
            return (
              <Link
                key={i}
                to={`/userpage/${user._id}`}
              >
                <ListItem
                  leftAvatar={
                    <div>
                      <RoundAvatar user={user} />
                    </div>
                  }
                >
                  {user.name} {showFullNames && user.secondName}
                </ListItem>
              </Link>
            )
          })}
        </div>
        <div>
          {
            hideButtons
              ? null
              : <FlatButton
                  label="Show next"
                  fullWidth={true}
                  onClick={this.showNext}
                  disabled={this.state.to > users.length}
                />
          }
        </div>
      </List>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  showFullNames: PropTypes.bool,
  hideButtons: PropTypes.bool,
  secondMode: PropTypes.bool
}

export default UserList
