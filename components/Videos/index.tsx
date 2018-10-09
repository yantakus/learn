import React, { Component, Fragment } from 'react'
import { Card } from 'semantic-ui-react'

import Video from './item'
import Preloader from '../Preloader'

interface Props {
  data?: [
    {
      ytId: string
    }
  ]
  loading: boolean
}

export default class Videos extends Component<Props> {
  render() {
    const { data, loading } = this.props
    if (loading) return <Preloader />
    if (!data) return null
    return (
      <Fragment>
        <h2 className="ui header">All Videos</h2>
        <Card.Group itemsPerRow={2}>
          {data.length
            ? data.map(video => <Video key={video.ytId} video={video} />)
            : 'No videos yet'}
        </Card.Group>
      </Fragment>
    )
  }
}
