import React, { Component } from 'react'

import VideoPage from 'components/VideoPage'

interface IProps {
  router: {
    query: {
      topic: string
    }
  }
}

class TopicPage extends Component<IProps> {
  render() {
    const { topic } = this.props.router.query
    return (
      <VideoPage
        type="topic"
        value={topic}
        where={{ topics_some: { value: topic } }}
      />
    )
  }
}

export default TopicPage
