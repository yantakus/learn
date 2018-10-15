import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import YouTube from '@u-wave/react-youtube'

interface Props {
  video: {
    ytId: string
  }
}

export default class Video extends Component<Props> {
  public render() {
    const { video } = this.props
    return (
      <Card>
        <Card.Content>
          <YouTube video={video.ytId} />
          <Card.Header>{video.ytId}</Card.Header>
        </Card.Content>
      </Card>
    )
  }
}
