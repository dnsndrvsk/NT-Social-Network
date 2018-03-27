import { connect } from 'react-redux'
import LogoutComponent from '../../../../components/Navigation/Userbar/Logout'
import { logout } from '../../../../actions/auth/logout'

const mapDispatchToProps = dispatch => ({
  dispatch: () => {
    dispatch(logout())
  }
})

const Logout = connect(state => ({}), mapDispatchToProps)(LogoutComponent)

export default Logout
