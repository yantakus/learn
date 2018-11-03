import React, { Component } from 'react'
import VideoForm from '../components/VideoForm'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

interface IProps {
  router: {
    query: {
      ytId: string
    }
  }
}

class AddVideo extends Component<IProps> {
  render() {
    return (
      <Query
        query={VIDEO_QUERY}
        variables={{ where: { ytId: this.props.router.query.ytId } }}
      >
        {({ data }) => <VideoForm currentData={data.videos[0]} />}
      </Query>
    )
  }
}

const VIDEO_QUERY = gql`
  query VIDEO_QUERY($where: VideoWhereInput) {
    videos(where: $where) {
      ytId
      complexity
      tags {
        text
        value
      }
      topics {
        text
        value
      }
    }
  }
`

export default AddVideo
