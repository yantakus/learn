import React, { Component } from 'react'
import Link from 'next/link'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Form } from 'semantic-ui-react'
import cookie from 'cookie'

import redirect from '../lib/redirect'
import { userQuery } from '../components/Menu'

interface Types {
  login: Function
}

export default class SignUp extends Component<Types> {
  state = { email: '', password: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { email, password } = this.state
    return (
      <Mutation
        mutation={mutation}
        variables={{ email, password }}
        onCompleted={() => redirect({}, '/')}
        update={(store, { data: { login: { token, user }} }) => {
          document.cookie = cookie.serialize('token', token, {
            maxAge: 30 * 24 * 60 * 60 // 30 days
          })
          store.writeQuery({
            query: userQuery,
            data: { user }
          })
        }}
      >
        {(login, { loading }) => (
          <div className="ui stackable three column centered grid container">
            <div className="column">
              <h3 className="ui horizontal divider header">Log In</h3>
              <Form onSubmit={() => login({ email, password })}>
                <div className="field">
                  <label>Email address</label>
                  <Form.Input type="email" name="email" value={email} required onChange={this.handleChange} />
                </div>
                <div className="field">
                  <label>Password</label>
                  <Form.Input type="password" name="password" value={password} required onChange={this.handleChange} />
                </div>
                <Form.Button loading={loading} primary content="Log In" />
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
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`
