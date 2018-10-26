import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Form, Message } from 'semantic-ui-react'
import get from 'lodash/get'

import printError from '../../lib/printError'

interface IProps {
  query: {
    id: String
  }
}

export default class ResetPasswordConfirm extends Component<IProps> {
  state = { password: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { password } = this.state
    return (
      <Mutation mutation={mutation}>
        {(resetPassword, { data, loading, error }) => {
          const message = get(data, ['resetPassword', 'message'])
          return (
            <div className="ui stackable three column centered grid container">
              <div className="column">
                <h3 className="ui horizontal divider header">
                  Choose new password
                </h3>
                <Form
                  onSubmit={() =>
                    resetPassword({
                      variables: {
                        passwordResetCode: this.props.query.id,
                        password,
                      },
                    })
                  }
                  error={Boolean(error)}
                  success={Boolean(message)}
                >
                  <div className="field">
                    <label>Password</label>
                    <Form.Input
                      type="password"
                      name="password"
                      value={password}
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <Form.Button
                    loading={loading}
                    primary
                    content="Reset password"
                  />
                  <Message error content={printError(error)} />
                  <Message success content={message} />
                </Form>
              </div>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

const mutation = gql`
  mutation ResetPasswordMutation(
    $passwordResetCode: String!
    $password: String!
  ) {
    resetPassword(passwordResetCode: $passwordResetCode, password: $password) {
      message
    }
  }
`
