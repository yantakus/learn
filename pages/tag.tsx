import React, { Component } from 'react'
import VideoPage from '../components/VideoPage'

interface IProps {
  router: {
    query: {
      tag: string
    }
  }
}

class TagPage extends Component<IProps> {
  render() {
    const { tag } = this.props.router.query
    return (
      <VideoPage type="tag" value={tag} where={{ tags_some: { value: tag } }} />
    )
  }
}

export default TagPage
