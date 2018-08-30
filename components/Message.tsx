import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

interface IProps {
  content: String
  error: Boolean
}

class User extends Component<IProps> {
  render() {
    return this.props.content ? <Message {...this.props} /> : null
  }
}

export default User
