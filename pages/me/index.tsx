import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import { Divider } from 'semantic-ui-react'
import get from 'lodash/get'

import User from '../../components/User'
import UserProfile from '../../components/UserProfile'

class UserPage extends Component {
  render() {
    return (
      <User>
        {({ data, loading }) => {
          const user = get(data, ['me'])
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
      </User>
    )
  }
}

export default UserPage
