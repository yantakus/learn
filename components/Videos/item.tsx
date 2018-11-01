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
        <Card
          className="overflow-hidden"
          style={{ width: '320px', height: '100%' }}
        >
          <div className="position-relative">
            <Image src={video.snippet.thumbnails.medium.url} />
            <Link href={`/video/${video.ytId}/edit`}>
              <a className="edit">
                <Icon
                  style={{ color: 'white', margin: 0 }}
                  name="edit outline"
                />
              </a>
            </Link>
          </div>

          <Card.Content>
            <Card.Meta className="mb-2">
              <span className="date capitalize">
                {video.complexity.toLowerCase()}
              </span>
            </Card.Meta>
            <Card.Header className="leading-none">
              <Link href={`/video/${video.ytId}`}>
                <a className="text-grey-darkest">{video.snippet.title}</a>
              </Link>
            </Card.Header>
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
        <style jsx>{`
          .edit {
            position: absolute;
            top: 10px;
            right: 10px;
            display: block;
            padding: 5px;
            background-color: rgba(0, 0, 0, 0.25);
            border-radius: 50%;
            &:hover {
              background-color: rgba(0, 0, 0, 0.75);
            }
          }
        `}</style>
      </Fragment>
    )
  }
}
