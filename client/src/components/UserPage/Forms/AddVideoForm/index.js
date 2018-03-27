import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { orange500 } from 'material-ui/styles/colors'
import './AddVideoForm.scss'


class AddVideoForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isFormOpen: false,
      url: ''
    }
  }
  
  toggleForm = () => {
    this.setState({ isFormOpen: !this.state.isFormOpen })
  }
  
  onUrlChange = (e) => {
    this.setState({ url: e.target.value })
    this.props.validateVideoUrl(e.target.value)
  }
  
  submitVideo = () => {
    this.props.addVideo(this.state.url, this.props.videoTitle)
    this.setState({ url: '' })
  }
  
  render() {
    return (
      <div className="video-form">
        {
          this.state.isFormOpen
            ? <div style={{padding: '10px 30px'}}>
                <div className="video-form__fields">
                  <TextField
                    id="video-form-link"
                    floatingLabelText="Youtube Video Url"
                    floatingLabelStyle={{color: orange500}}
                    errorText={this.props.invalidVideoUrl && this.state.url && 'Video with such url does not exist'}
                    fullWidth={true}
                    value={this.state.url}
                    onChange={this.onUrlChange}
                  />
                </div>
                <div className="video-form__preview">
                  {
                    !this.props.invalidVideoUrl && this.state.url
                      &&  <Card>
                            <CardHeader
                              title={this.props.videoTitle}
                            />
                            <CardMedia>
                              <img src={this.props.videoThumbnail} alt={this.props.videoTitle} />
                            </CardMedia>
                          </Card>
                  }
                </div>
                <div className="video-form__btns">
                  {
                    !this.props.invalidVideoUrl && this.state.url
                      &&  <div>
                            <FlatButton
                              label="Add Video"
                              primary={true}
                              fullWidth={true}
                              onClick={this.submitVideo}
                            />
                          </div>
                  }
                  <div>
                    <FlatButton
                      label="Close"
                      secondary={true}
                      fullWidth={true}
                      onClick={this.toggleForm}
                    />
                  </div>
                </div>
              </div>
            : <FlatButton
                label="Add Video"
                primary={true}
                fullWidth={true}
                onClick={this.toggleForm}
              />
        }
      </div>
    )
  }
}

AddVideoForm.propTypes = {
  validateVideoUrl: PropTypes.func.isRequired,
  addVideo: PropTypes.func.isRequired,
  activeUser: PropTypes.object.isRequired,
  invalidVideoUrl: PropTypes.bool,
  videoTitle: PropTypes.string,
  videoThumbnail: PropTypes.string
}


export default AddVideoForm
