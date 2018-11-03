import React, { Component, Fragment } from 'react'

import Video, { IVideo } from './Item'
import Preloader from '../Preloader'

interface Props {
  data?: [IVideo]
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
        <div className="flex flex-wrap -mx-2">
          {data.length
            ? data.map(video => (
                <div className="w-1/3 px-2 mb-4" key={video.ytId}>
                  <Video video={video} />
                </div>
              ))
            : 'No videos yet'}
        </div>
      </Fragment>
    )
  }
}
