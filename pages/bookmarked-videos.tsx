import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import get from 'lodash/get'

import Videos from '../components/Videos'

export default () => (
  <Query query={query}>
    {props => {
      const { data, loading } = props
      if (!get(data, ['user']) && !loading) {
        return 'You are not logged in'
      }
      return (
        <Videos
          data={get(data, ['user', 'videosAttending'])}
          loading={loading}
        />
      )
    }}
  </Query>
)

export const query = gql`
  {
    user {
      id
      bookmarkedVideos {
        id
        title
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
