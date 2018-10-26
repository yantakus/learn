import React, { Component } from 'react'
import get from 'lodash/get'

import Preloader from '../../components/Preloader'
import User from '../../components/User'
import EditProfile from '../../components/EditProfile'

export default class Signin extends Component {
  render() {
    return (
      <User>
        {({ data, loading }) => {
          if (loading) {
            return <Preloader />
          } else {
            return <EditProfile data={get(data, ['me'])} />
          }
        }}
      </User>
    )
  }
}
