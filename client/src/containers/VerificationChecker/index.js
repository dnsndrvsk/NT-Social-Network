import { connect } from 'react-redux'
import VerificationCheckerComponent from '../../components/VerificationPage/VerificationChecker'
import { verify } from '../../actions/auth/verify'

const mapDispatchToProps = dispatch => ({
  dispatch: (history) => {
    dispatch(verify(history))
  }
})

const VerificationChecker = connect(state => ({}), mapDispatchToProps)(VerificationCheckerComponent)

export default VerificationChecker
