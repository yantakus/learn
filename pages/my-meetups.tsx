import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import get from 'lodash/get'

import Meetups from '../components/Meetups'

export default () => (
  <Query query={query}>
    {props => {
      const { data, loading } = props
      if (!get(data, ['currentUser']) && !loading) {
        return 'You are not logged in'
      }
      return (
        <Meetups
          data={get(data, ['currentUser', 'myMeetups'])}
          loading={loading}
        />
      )
    }}
  </Query>
)

export const query = gql`
  {
    currentUser {
      id
      myMeetups {
        id
        title
        date
        location
        organizer {
          name
        }
        attendees {
          id
        }
      }
    }
  }
`
