import React, { Component, Fragment } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Header, Breadcrumb } from 'semantic-ui-react'
import Link from 'next/link'

import PageTitle from '../components/PageTitle'
import Videos from '../components/Videos'

interface IProps {
  value: string
  type: string
  where: Object
}

class VideoPage extends Component<IProps> {
  handleChange = (_e, { id, value }) => this.setState({ [id]: value } as any)

  render() {
    const { value, type, where } = this.props
    return (
      <Query
        query={VIDEOS_QUERY}
        variables={{
          where,
        }}
      >
        {({ data, loading }) => {
          const title = `Videos with "${value}" ${type}`
          return (
            <Fragment>
              <Breadcrumb>
                <Link href="/">
                  <a>Home</a>
                </Link>
                <Breadcrumb.Divider />
                <Breadcrumb.Section className="capitalize">
                  {type}
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>{value}</Breadcrumb.Section>
              </Breadcrumb>
              <PageTitle>{title}</PageTitle>
              <Header >
                {title}
              </Header>
              <Videos data={data.videos} loading={loading} />
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

const VIDEOS_QUERY = gql`
  query VIDEOS_QUERY($where: VideoWhereInput = {}) {
    videos(where: $where) {
      ytId
      complexity
      language {
        text
        value
      }
      tags {
        text
        value
      }
      topics {
        text
        value
      }
      snippet
    }
  }
`

export default VideoPage
