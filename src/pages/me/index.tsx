import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import { Divider } from 'semantic-ui-react'

import Private from '../../components/Private'
import UserProfile from '../../components/UserProfile'

class UserPage extends Component {
  render() {
    return (
      <Private returnUser>
        {(user, loading) => {
          return (
            <Fragment>
              <UserProfile data={user} loading={loading} />
              {user && (
                <Fragment>
                  <Divider />
                  <Link href="/me/edit">
                    <a>Edit profile</a>
                  </Link>
                </Fragment>
              )}
            </Fragment>
          )
        }}
      </Private>
    )
  }
}

export default UserPage
