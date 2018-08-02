import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Form, Message, Input } from 'semantic-ui-react'

interface Types {
  data: {
    login: String
    name: String
    email: string
  }
}

export default class Signin extends Component<Types> {
  state = { login: '', name: '' }

  componentDidMount() {
    const { data: { login, name }} = this.props
    this.setState({
      login,
      name
    })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { login, name } = this.state
    const { data: { email }} = this.props
    return <Fragment>
      <Mutation
        mutation={mutation}
        variables={{ login, name }}
      >
        {(editProfile, { loading, called, error }) => (
          <Fragment>
            <h1>Update profile</h1>
            <Form
              onSubmit={() => editProfile({ login, name })}
              error={Boolean(error)}
              success={Boolean(called && !error)}
            >
              <Form.Field inline>
                <label>Login:</label>
                <Input type="text" name="login" value={login} required onChange={this.handleChange} />
              </Form.Field>
              <Form.Field inline>
                <label>Name:</label>
                <Input type="text" name="name" value={name} required onChange={this.handleChange} />
              </Form.Field>
              <Form.Field inline>
                <label>Email:</label>
                <strong>{email}</strong>
              </Form.Field>
              <Form.Button loading={loading} primary content="Edit Profile" />
              <Message
                error
                content={String(error)}
              />
              <Message
                success
                content="Your profile has been successfully updated."
              />
            </Form>
          </Fragment>
        )}
      </Mutation>
      <style jsx>{`
        label {
          min-width: 50px
        }
      `}</style>
    </Fragment>
  }
}

const mutation = gql`
  mutation EditProfileMutation($login: String, $name: String) {
    editProfile(login: $login, name: $name) {
      id,
      login,
      email,
      name
    }
  }
`
