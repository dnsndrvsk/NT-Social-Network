import React from 'react'
import { Helmet } from 'react-helmet'
import CenteredLayout from '../../layouts/CenteredLayout'
import VerificationChecker from '../../containers/VerificationChecker'
import WithRouterLogged from '../../containers/WithRouter/WithRouterLogged'

const VerificationPage = (props) => (
  <WithRouterLogged>
    <CenteredLayout>
      <div>
        <Helmet>
          <title>NT SN | Verification</title>
        </Helmet>

        <VerificationChecker />
      </div>
    </CenteredLayout>
  </WithRouterLogged>
)

export default VerificationPage
