import React, { Component } from 'react'

import Preloader from '../../components/Preloader'
import Private from '../../components/Private'
import EditProfile from '../../components/EditProfile'

export default class Signin extends Component {
  render() {
    return (
      <Private returnUser>
        {(user, loading) => {
          if (loading) {
            return <Preloader />
          } else {
            return <EditProfile data={user} />
          }
        }}
      </Private>
    )
  }
}
