import { connect } from 'react-redux'
import WithRouterNotLoggedComponent from '../../../components/WithRouter/WithRouterNotLogged'

const WithRouterNotLogged = connect(state => ({
  activeUser: state.activeUser
}), {})(WithRouterNotLoggedComponent)

export default WithRouterNotLogged
