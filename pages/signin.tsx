import React, { Component } from 'react'
import Link from 'next/link'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Form, Message } from 'semantic-ui-react'
import cookie from 'cookie'

import redirect from '../lib/redirect'
import { userQuery } from '../components/Menu'

interface Types {
  signin: Function
}

export default class Signin extends Component<Types> {
  state = { login: '', password: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { login, password } = this.state
    return (
      <Mutation
        mutation={mutation}
        variables={{ login, password }}
        onCompleted={() => redirect({}, '/')}
        update={(store, { data: { signin: { token, user }} }) => {
          document.cookie = cookie.serialize('token', token, {
            maxAge: 30 * 24 * 60 * 60 // 30 days
          })
          store.writeQuery({
            query: userQuery,
            data: { user }
          })
        }}
      >
        {(signin, { loading, error }) => (
          <div className="ui stackable three column centered grid container">
            <div className="column">
              <h3 className="ui horizontal divider header">Sign In</h3>
              <Form onSubmit={() => signin({ login, password })} error={Boolean(error)}>
                <div className="field">
                  <label>Login or email</label>
                  <Form.Input type="text" name="login" value={login} required onChange={this.handleChange} />
                </div>
                <div className="field">
                  <label>Password</label>
                  <Form.Input type="password" name="password" value={password} required onChange={this.handleChange} />
                </div>
                <Form.Button loading={loading} primary content="Sign In" />
                <Message
                  error
                  content={String(error)}
                />
              </Form>
              <div className="ui divider"></div>
              <div className="ui column grid">
                <div className="center aligned column">
                Don't have an account? <Link href="/signup"><a>Sign Up</a></Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    )
  }
}

const mutation = gql`
  mutation SigninMutation($login: String!, $password: String!) {
    signin(login: $login, password: $password) {
      token
      user {
        id
      }
    }
  }
`
