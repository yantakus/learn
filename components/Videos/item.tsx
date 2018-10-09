import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

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
          <Card.Header>{video.ytId}</Card.Header>
        </Card.Content>
      </Card>
    )
  }
}
