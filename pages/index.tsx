import React, { Component, Fragment } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Dropdown, Form } from 'semantic-ui-react'
import find from 'lodash/find'
import { complexities } from '../components/VideoForm'

import Videos from '../components/Videos'

interface IState {
  skip: boolean
  fetchMore: boolean
  language: string
  tags_some: string
  topics_some: string
  complexity: string
}

const createWhereInput = (data: Array<Object>) => {
  const where = {}
  data.map(obj => {
    for (const key in obj) {
      const value = obj[key]
      if (value) {
        where[key] = { value }
      }
    }
  })
  return where
}

class HomePage extends Component<{}, IState> {
  state = {
    skip: true,
    fetchMore: true,
    language: '',
    tags_some: '',
    topics_some: '',
    complexity: '',
  }

  handleChange = (_e, { id, value }) => this.setState({ [id]: value } as any)

  render() {
    const { language, tags_some, topics_some, complexity } = this.state
    const where = createWhereInput([{ language, tags_some, topics_some }])
    return (
      <Query
        query={VIDEOS_QUERY}
        variables={{
          where: complexity ? { ...where, complexity } : where,
        }}
      >
        {({ data, loading }) => {
          return (
            <Fragment>
              <div className="border-b pb-4 mb-4">
                <Form className="flex -mx-2">
                  <div className="px-2">
                    <Form.Field>
                      <label htmlFor="language">Language</label>
                      <Dropdown
                        selection
                        clearable
                        id="language"
                        options={data.languages}
                        onChange={this.handleChange}
                        search
                        placeholder="Select..."
                        text={
                          language &&
                          find(data.languages, o => o.value === language).text
                        }
                      />
                    </Form.Field>
                  </div>
                  <div className="px-2">
                    <Form.Field>
                      <label htmlFor="tags_some">Topic</label>
                      <Dropdown
                        selection
                        clearable
                        id="topics_some"
                        options={data.topics}
                        onChange={this.handleChange}
                        search
                        placeholder="Select..."
                        text={
                          topics_some &&
                          find(data.topics, o => o.value === topics_some).text
                        }
                      />
                    </Form.Field>
                  </div>
                  <div className="px-2">
                    <Form.Field>
                      <label htmlFor="tags_some">Tag</label>
                      <Dropdown
                        selection
                        clearable
                        id="tags_some"
                        options={data.tags}
                        onChange={this.handleChange}
                        search
                        placeholder="Select..."
                        text={
                          tags_some &&
                          find(data.tags, o => o.value === tags_some).text
                        }
                      />
                    </Form.Field>
                  </div>
                  <div className="px-2">
                    <Form.Field>
                      <label htmlFor="tags_some">Complexity</label>
                      <Dropdown
                        selection
                        clearable
                        id="complexity"
                        options={complexities}
                        onChange={this.handleChange}
                        search
                        placeholder="Select..."
                        text={
                          complexity &&
                          find(complexities, o => o.value === complexity).text
                        }
                      />
                    </Form.Field>
                  </div>
                </Form>
              </div>
              <Videos data={data.videos} loading={loading} />
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export const VIDEOS_QUERY = gql`
  query VIDEOS_QUERY(
    $skip: Int = 0
    $first: Int = 20
    $orderBy: String = "createdAt_DESC"
    $where: VideoWhereInput = {}
  ) {
    videos(skip: $skip, first: $first, orderBy: $orderBy, where: $where) {
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
    languages {
      text
      value
    }
    topics {
      text
      value
    }
    tags {
      text
      value
    }
  }
`

export default HomePage
