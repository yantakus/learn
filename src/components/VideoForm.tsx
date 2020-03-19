import React, { Component, Fragment } from 'react'
import { Mutation, graphql } from 'react-apollo'
import { getOperationName } from 'apollo-utilities'
import { gql, ApolloError } from 'apollo-boost'
import { Message } from 'semantic-ui-react'
import { Form, Input, Dropdown } from 'formsy-semantic-ui-react'
import { paramCase } from 'change-case'
import cx from 'classnames'
import fetch from 'isomorphic-unfetch'
import qs from 'qs'

import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import get from 'lodash/get'

import { VIDEOS_QUERY } from '../pages/index'
import transformOptions from '../lib/transformOptions'
import printError from '../lib/printError'
import redirect from '../lib/redirect'

import Youtube from '../components/Youtube'
import Private from '../components/Private'

export const complexities = [
  {
    text: 'Elementary',
    value: 'ELEMENTARY',
  },
  {
    text: 'Basic',
    value: 'BASIC',
  },
  {
    text: 'Advanced',
    value: 'ADVANCED',
  },
  {
    text: 'Expert',
    value: 'EXPERT',
  },
]

type Options = Array<{ text: string; value: string }>

interface IProps {
  ytId?: string | string[]
  currentData?: {
    ytId: string
    complexity: string
    language: string
    topics: Options
    tags: Options
  }
  data?: any
}

interface IState {
  ytId: string
  ytIdError: string
  ytValue: string
  language: string
  languageOptions: Options
  tags: Options
  tagsOptions: Options
  tagsValue: Array<string>
  topics: Options
  topicsOptions: Options
  topicsValue: Array<string>
  complexity?: string
  isValidYtId: boolean
}

const errorLabel = <label />

const createInput = ({ __typename, ...rest }) => {
  return __typename ? { connect: rest } : { create: rest }
}

const createManyInput = data => {
  const result: { connect?: []; create?: [] } = {}
  const create = data.filter(i => !i.__typename)
  const connect = data
    .filter(i => i.__typename)
    .map(({ text, value }) => ({ text, value }))
  if (!isEmpty(create)) {
    result.create = create
  }
  if (!isEmpty(connect)) {
    result.connect = connect
  }
  return isEmpty(result) ? undefined : result
}

type MutationProps = {
  loading: boolean
  error?: ApolloError
}

class VideoForm extends Component<IProps, IState> {
  static getDerivedStateFromProps(newProps, oldState) {
    if (!oldState.tagsOptions && newProps.data.tags) {
      return {
        languageOptions: newProps.data.languages,
        tagsOptions: newProps.data.tags,
        topicsOptions: newProps.data.topics,
      }
    }
    return null
  }

  constructor(props: IProps) {
    super(props)

    const { currentData } = props

    const ytId = get(currentData, 'ytId') || this.props.ytId
    const tags = get(currentData, 'tags')
    const topics = get(currentData, 'topics')
    const language = get(currentData, ['language', 'value'])

    this.state = {
      ytId: ytId || '',
      ytValue: ytId || '',
      ytIdError: '',
      language: language || '',
      languageOptions: null,
      tags: tags || [],
      tagsOptions: null,
      tagsValue: transformOptions(tags) || [],
      topics: topics || [],
      topicsOptions: null,
      topicsValue: transformOptions(topics) || [],
      complexity: get(currentData, 'complexity') || null,
      isValidYtId: false,
    }
  }

  validate = (_e, { name, value: initialValue }) => {
    const validLength = 11
    const trimmedValue = initialValue.trim()
    let value = trimmedValue
    if (value.startsWith('http')) {
      const queryString = value.substring(value.indexOf('?') + 1)
      const ytId = qs.parse(queryString).v
      if (ytId.length === 11) {
        value = ytId
      }
    }
    this.handleChange(null, { name, value: trimmedValue })
    if (value.length === validLength) {
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyBePvxlAhMnv2j8YaZ3zDdULjL0AV88yGQ&id=${value}`
      )
        .then(response => response.json())
        .then(json => {
          if (!json.pageInfo.totalResults) {
            this.setState({
              ytIdError: 'Invalid youtube video id or url',
              ytId: '',
            })
          } else {
            this.setState({
              ytIdError: '',
              ytId: value,
            })
          }
        })
    } else {
      this.setState({
        ytIdError: 'Invalid youtube video id or url',
        ytId: '',
      })
    }
  }

  handleChange = (_e, { name, value }) => {
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  handleMultipleChange = (_e, { name, options, value }) => {
    this.setState(prevState => ({
      ...prevState,
      [`${name}Value`]: value.map(i => paramCase(i)),
      [`${name}`]: value.map(i => {
        const existing = find(options, o => o.value === i)
        return existing || { text: i, value: paramCase(i) }
      }),
    }))
  }

  handleAddition = (_e, { name, value }) => {
    this.setState(prevState => ({
      ...prevState,
      [`${name}Options`]: [
        { text: value, value: paramCase(value) },
        ...this.state[`${name}Options`],
      ],
    }))
  }

  render() {
    const {
      ytIdError,
      ytId,
      ytValue,
      complexity,
      language,
      languageOptions,
      tags,
      tagsValue,
      tagsOptions,
      topics,
      topicsValue,
      topicsOptions,
    } = this.state

    const updateMode = !!this.props.currentData

    return (
      <Private>
        <Mutation
          mutation={UPSERT_VIDEO_MUTATION}
          onCompleted={() => {
            redirect({}, '/')
          }}
          refetchQueries={[getOperationName(VIDEOS_QUERY)]}
        >
          {(upsertVideo, { loading, error }: MutationProps) => {
            return (
              <Fragment>
                {ytId && <Youtube className="mb-10" id={ytId} />}
                <div className="ui stackable two column centered grid container">
                  <div className="column">
                    <h3 className="ui horizontal divider header">
                      {updateMode ? 'Update' : 'Add'} video
                    </h3>
                    <Form
                      onValidSubmit={() => {
                        if (!ytIdError) {
                          upsertVideo({
                            variables: {
                              update: updateMode,
                              ytId,
                              complexity,
                              language: createInput(
                                find(languageOptions, o => o.value === language)
                              ),
                              tags: createManyInput(tags),
                              topics: createManyInput(topics),
                            },
                          })
                        }
                      }}
                    >
                      <Form.Field>
                        <label>Youtube video url or id</label>
                        <Input
                          className={cx({ 'error mb-0': ytIdError })}
                          type="text"
                          name="ytValue"
                          value={ytValue}
                          onChange={this.validate}
                          required
                          validationErrors={{
                            isDefaultRequiredValue: 'This field is required',
                          }}
                          errorLabel={errorLabel}
                        />
                        {ytIdError && (
                          <div className="field error">
                            <label>{ytIdError}</label>
                          </div>
                        )}
                      </Form.Field>

                      <Form.Field>
                        <label>Complexity</label>
                        <Dropdown
                          name="complexity"
                          fluid
                          selection
                          options={complexities}
                          value={this.state.complexity}
                          onChange={this.handleChange}
                          required
                          validationErrors={{
                            isDefaultRequiredValue: 'This field is required',
                          }}
                          errorLabel={errorLabel}
                        />
                      </Form.Field>

                      <Form.Field>
                        <label>Language</label>
                        <Dropdown
                          name="language"
                          options={languageOptions}
                          search
                          selection
                          fluid
                          allowAdditions
                          value={language}
                          onAddItem={this.handleAddition}
                          onChange={this.handleChange}
                          required
                          validationErrors={{
                            isDefaultRequiredValue: 'This field is required',
                          }}
                          errorLabel={errorLabel}
                        />
                      </Form.Field>

                      <Form.Field>
                        <label>Topics</label>
                        <Dropdown
                          name="topics"
                          options={topicsOptions}
                          search
                          selection
                          fluid
                          multiple
                          allowAdditions
                          value={topicsValue}
                          onAddItem={this.handleAddition}
                          onChange={this.handleMultipleChange}
                          required
                          validations="minLength:1"
                          validationErrors={{
                            minLength: 'This field is required',
                          }}
                          errorLabel={errorLabel}
                        />
                      </Form.Field>

                      <Form.Field>
                        <label>Tags</label>
                        <Dropdown
                          name="tags"
                          options={tagsOptions}
                          search
                          selection
                          fluid
                          multiple
                          allowAdditions
                          value={tagsValue}
                          onAddItem={this.handleAddition}
                          onChange={this.handleMultipleChange}
                          required
                          validations="minLength:1"
                          validationErrors={{
                            minLength: 'This field is required',
                          }}
                          errorLabel={errorLabel}
                        />
                      </Form.Field>

                      <Form.Button
                        loading={loading}
                        primary
                        content={`${updateMode ? 'Update' : 'Add'} Video`}
                      />
                    </Form>
                    {error && <Message error>{printError(error)}</Message>}
                  </div>
                </div>
              </Fragment>
            )
          }}
        </Mutation>
      </Private>
    )
  }
}

const VIDEO_META_QUERY = gql`
  query {
    topics {
      text
      value
    }
    tags {
      text
      value
    }
    languages {
      text
      value
    }
  }
`

const UPSERT_VIDEO_MUTATION = gql`
  mutation(
    $update: Boolean
    $ytId: String!
    $complexity: Complexity!
    $language: LanguageCreateOneWithoutParentInput!
    $topics: TopicCreateManyWithoutParentInput!
    $tags: TagCreateManyWithoutParentInput!
  ) {
    upsertVideo(
      update: $update
      ytId: $ytId
      complexity: $complexity
      language: $language
      topics: $topics
      tags: $tags
    ) {
      ytId
    }
  }
`

export default graphql<IProps>(VIDEO_META_QUERY)(VideoForm)
