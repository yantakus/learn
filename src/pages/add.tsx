import React, { Component } from 'react'
import VideoForm from '../components/VideoForm'
import { withRouter, NextRouter } from 'next/router'

type Props = {
  router: NextRouter
}

class AddVideo extends Component<Props> {
  render() {
    return <VideoForm ytId={this.props.router.query.v} />
  }
}

export default withRouter(AddVideo)
