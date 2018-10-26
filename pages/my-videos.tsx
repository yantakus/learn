import React from 'react'
import get from 'lodash/get'

import User from '../components/User'
import Videos from '../components/Videos'

export default () => (
  <User>
    {props => {
      const { data, loading } = props
      if (!get(data, ['me']) && !loading) {
        return 'You are not logged in'
      }
      return (
        <Videos data={get(data, ['me', 'videosAdded'])} loading={loading} />
      )
    }}
  </User>
)
