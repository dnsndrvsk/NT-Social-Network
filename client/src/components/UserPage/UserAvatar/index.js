import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import AvatarPreview from '../../../containers/UserPage/UserAvatar/AvatarPreview'
import Editor from './Editor'
import './UserAvatar.scss'

/******** Image upload ********/
import SArequest from 'superagent'
const CLOUDINARY_UPLOAD_PRESET = 'd6ktjbwt'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dirjd0hre/upload'

class UserAvatar extends Component {
  constructor(props) {
    super(props)
    
    this.state = { isPreviewOpen: false }
  }
  
  handleImageChange = (e) => {
    if (e.target.files[0]) {
      this.handleImageUpload(e.target.files[0])
    }
  }
  
  openPreview = () => {
    if(this.props.viewableUser.avatar === "/static/media/default_user.09963f26.jpg") {
      return
    }
    this.setState({ isPreviewOpen: true })
  }
  
  closePreview = () => {
    this.setState({ isPreviewOpen: false })
  }
  
  handleImageUpload(file) {
    let upload = SArequest.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', file)

    upload.end((error, response) => {
      if (response.body.secure_url !== '') {
        this.props.dispatch(response.body.secure_url)
      }
      if (error) {
        console.log(error)
      }
    })
  }
  
  render() {
    const isOwnPage = this.props.activeUser && (this.props.activeUser._id === this.props.viewableUser._id)
    const user = this.props.viewableUser
    
    return (
      <div className="user-avatar">
        {
          user
            ? <Paper zDepth={1}>
                <img
                  className="user-avatar__image"
                  src={user.avatar}
                  alt={user.name}
                  onClick={this.openPreview}
                />
                {
                  isOwnPage
                    ? <div className="user-avatar__btns">
                        <RaisedButton
                          containerElement='label'
                          label="Change"
                          primary={true}
                          fullWidth={false}
                        >
                          <input
                            type="file"
                            onChange={this.handleImageChange}
                          />
                        </RaisedButton>
                        <Editor
                          image={user.avatar}
                        />
                      </div>
                    : null
                }
                <Dialog
                  modal={false}
                  open={this.state.isPreviewOpen}
                  onRequestClose={this.closePreview}
                >
                  <AvatarPreview />
                </Dialog>
              </Paper>
            : null
        }
      </div>
    )
  }
}

UserAvatar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  viewableUser: PropTypes.object.isRequired,
  activeUser: PropTypes.object
}

export default UserAvatar
