import React, { Component, Fragment } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import Link from 'next/link'
import { Divider } from 'semantic-ui-react'
import get from 'lodash/get'

import User from '../../components/User'

class UserPage extends Component {
  render() {
    return (
      <Query query={query} fetchPolicy="cache-first">
        {({ data, loading }) => {
          const user = get(data, ['currentUser'])
          return (
            <Fragment>
              <User data={user} loading={loading} />
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
      </Query>
    )
  }
}

export const query = gql`
  {
    currentUser {
      id
      name
      login
      email
    }
  }
`

export default UserPage
