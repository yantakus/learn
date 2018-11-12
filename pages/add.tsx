import React, { Component } from 'react'
import VideoForm from '../components/VideoForm'

interface IProps {
  router: {
    query: {
      v?: string
    }
  }
}

class AddVideo extends Component<IProps> {
  render() {
    return <VideoForm ytId={this.props.router.query.v} />
  }
}

export default AddVideo
