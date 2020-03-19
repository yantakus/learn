import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Form, Message } from 'semantic-ui-react'
import get from 'lodash/get'

import printError from '../../lib/printError'

export default class ResetPassword extends Component {
  state = { login: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { login } = this.state
    return (
      <Mutation mutation={mutation}>
        {(sendResetPasswordEmail, { data, loading, error }) => {
          const message = get(data, ['sendResetPasswordEmail', 'message'])
          return (
            <div className="ui stackable three column centered grid container">
              <div className="column">
                <h3 className="ui horizontal divider header">Reset password</h3>
                <Form
                  onSubmit={() =>
                    sendResetPasswordEmail({ variables: { login } })
                  }
                  error={Boolean(error)}
                  success={Boolean(message)}
                >
                  <div className="field">
                    <label>Login or email</label>
                    <Form.Input
                      type="text"
                      name="login"
                      value={login}
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
  mutation SendResetPasswordEmailMutation($login: String!) {
    sendResetPasswordEmail(login: $login) {
      message
    }
  }
`
