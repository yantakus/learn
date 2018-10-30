import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import { Card, Icon, Image } from 'semantic-ui-react'

interface Props {
  video: {
    ytId: string
    tags: [
      {
        text: String
        value: String
      }
    ]
    topics: [
      {
        text: String
        value: String
      }
    ]
    complexity: String
    snippet: {
      title: String
      thumbnails: {
        medium: {
          url: String
        }
      }
    }
  }
}

export default class Video extends Component<Props> {
  public render() {
    const { video } = this.props
    console.log(this.props)
    return (
      <Fragment>
        <Link href={`/video/${video.ytId}`}>
          <a>
            <Card style={{ width: '320px' }}>
              <Image src={video.snippet.thumbnails.medium.url} />
              <Card.Content>
                <Card.Header>{video.snippet.title}</Card.Header>
                <Card.Meta>
                  <span className="date capitalize">
                    {video.complexity.toLowerCase()}
                  </span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <div>
                  <Icon name="folder" />
                  <strong>
                    Topic
                    {video.topics.length > 1 && 's'}:
                  </strong>
                  {video.topics.map(i => (
                    <Link href={`/topic/${i.value}`}>
                      <a>{i.text}</a>
                    </Link>
                  ))}
                </div>
                <div>
                  <Icon name="tag" />
                  <strong>
                    Tag
                    {video.tags.length > 1 && 's'}:
                  </strong>
                  {video.tags.map(i => (
                    <Link href={`/topic/${i.value}`}>
                      <a>{i.text}</a>
                    </Link>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </a>
        </Link>
      </Fragment>
    )
  }
}
