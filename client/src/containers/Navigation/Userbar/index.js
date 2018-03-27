import { connect } from 'react-redux'
import UserbarComponent from '../../../components/Navigation/Userbar'
import { updateUserData } from '../../../actions/user/updateUserData'

const mapDispatchToProps = dispatch => ({
  dispatch: () => {
    dispatch(updateUserData())
  }
})

const Userbar = connect(state => ({
  activeUser: state.activeUser
}), mapDispatchToProps)(UserbarComponent)

export default Userbar
