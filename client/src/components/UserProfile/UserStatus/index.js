import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import EditImage from 'material-ui/svg-icons/editor/mode-edit'
import './UserStatus.scss'

const MAX_LENGTH = 30

class UserStatus extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isFormOpen: false,
      value: ''
    }
  }
  
  toggleChangeForm = () => {
    this.setState({
      isFormOpen: !this.state.isFormOpen,
      value: ''
    })
  }
  
  onValueChange = (e) => {
    this.setState({ value: e.target.value })
  }
  
  submitStatus = () => {
    this.props.dispatch(this.state.value)
    this.setState({ isFormOpen: false })
  }
  
  render() {
    const isOwnPage = this.props.activeUser && (this.props.activeUser._id === this.props.viewableUser._id)
    
    const editIconStyle = {
      position: 'absolute',
      right: '23px',
      top: '-23px',
      backgroundColor: '#fff'
    }
    
    return (
      <div className='user-status'>
        {
          this.state.isFormOpen 
            ? <Paper zDepth={1}>
                <div className="user-status__notifier">
                  {`${MAX_LENGTH - this.state.value.length} characters left...`}
                </div>
                <TextField 
                  hintText={"Type here..."}
                  underlineShow={false}
                  fullWidth={true}
                  maxLength={MAX_LENGTH}
                  onChange={this.onValueChange}
                  style={{margin: "10px"}}
                />
                <div className="row">
                  <div className="col s6">
                    <FlatButton 
                      label={"Set Status"}
                      primary={true}
                      fullWidth={true}
                      onClick={this.submitStatus}
                    />
                  </div>
                  <div className="col s6">
                    <FlatButton 
                      label="Cancel"
                      secondary={true}
                      fullWidth={true}
                      onClick={this.toggleChangeForm}
                    />
                  </div>
                </div>
              </Paper>
            : <div className="user-status__status">
                <i>{this.props.viewableUser.status}</i>
                {
                  isOwnPage
                    ? <IconButton
                        tooltip="Change status"
                        onClick={this.toggleChangeForm}
                        style={editIconStyle}
                      >
                        <EditImage color="#00bcd4" />
                      </IconButton>
                    : null
                }
              </div>
        }
      </div>
    )
  }
}

UserStatus.propTypes = {
  dispatch: PropTypes.func.isRequired,
  viewableUser: PropTypes.object.isRequired,
  activeUser: PropTypes.object
}

export default UserStatus
