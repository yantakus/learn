import React from 'react'

import Private from '../components/Private'
import Videos from '../components/Videos'

export default () => (
  <Private returnUser>
    {(user, loading) => {
      if (!user && !loading) {
        return 'You are not logged in'
      }
      return <Videos data={user.videosAdded} loading={loading} />
    }}
  </Private>
)
