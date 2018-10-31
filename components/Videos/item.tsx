import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import { Card, Icon, Image } from 'semantic-ui-react'

export interface IVideo {
  ytId: string
  tags: [
    {
      text: string
      value: string
    }
  ]
  topics: [
    {
      text: string
      value: string
    }
  ]
  complexity: string
  snippet: {
    title: string
    thumbnails: {
      medium: {
        url: string
      }
    }
  }
}
interface Props {
  video: IVideo
}

export default class Video extends Component<Props> {
  public render() {
    const { video } = this.props
    return (
      <Fragment>
        <Card className="overflow-hidden" style={{ width: '320px' }}>
          <Link href={`/video/${video.ytId}`}>
            <a>
              <Image src={video.snippet.thumbnails.medium.url} />
            </a>
          </Link>
          <Card.Content>
            <Card.Header className="mb-3 leading-none">
              <Link href={`/video/${video.ytId}`}>
                <a className="text-grey-darkest">{video.snippet.title}</a>
              </Link>
            </Card.Header>

            <Card.Meta>
              <span className="date capitalize">
                {video.complexity.toLowerCase()}
              </span>
            </Card.Meta>
          </Card.Content>
          <Card.Content className="text-sm" extra>
            <div className="mb-2 leading-none">
              <Icon
                name="folder"
                alt={`Topic${video.topics.length > 1 && 's'}`}
              />
              {video.topics.map((item, i) => (
                <span key={item.value}>
                  <Link href={`/topic/${item.value}`} key={item.value}>
                    <a>{item.text}</a>
                  </Link>
                  {i < video.topics.length - 1 && ', '}
                </span>
              ))}
            </div>
            <div className="leading-none">
              <Icon name="tag" alt={`Tag${video.tags.length > 1 && 's'}`} />
              {video.tags.map((item, i) => (
                <span key={item.value}>
                  <Link href={`/topic/${item.value}`}>
                    <a>{item.text}</a>
                  </Link>
                  {i < video.tags.length - 1 && ', '}
                </span>
              ))}
            </div>
          </Card.Content>
        </Card>
      </Fragment>
    )
  }
}
