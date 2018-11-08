import React, { Component } from 'react'
import VideoPage from '../components/VideoPage'

interface IProps {
  router: {
    query: {
      complexity: string
    }
  }
}

class ComplexityPage extends Component<IProps> {
  render() {
    const { complexity } = this.props.router.query
    return (
      <VideoPage
        type="complexity"
        value={complexity}
        where={{ complexity: complexity.toUpperCase() }}
      />
    )
  }
}

export default ComplexityPage
