import React, { Component } from 'react'
import cookie from 'cookie'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Menu } from 'semantic-ui-react'
import Link from 'next/link'

export const userQuery = gql`
  {
    user {
      id
    }
  }
`

interface Props {
  pathname: string
}

const defaultMenuItems = [{ name: 'All Meetups', url: '/' }];
let menuItems

export default class MenuComponent extends Component<Props> {
  logout = client => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })
    client.writeData({ data: { user: null } })
  }

  render () {
    const { pathname } = this.props
    return (
      <Query
        query={userQuery}
        errorPolicy="all"
      >
        {({ data, client }) => {
          const user = data && data.user
          if (user) {
            menuItems = [
              ...defaultMenuItems,
              {
                name: 'My Meetups',
                url: '/my-meetups'
              },
              {
                name: "I'm going",
                url: '/meetups-going'
              },
              {
                name: 'Create Meetup',
                url: '/create'
              },
            ]
          } else {
            menuItems = [
              ...defaultMenuItems,
              {
                name: 'Login',
                url: '/login'
              },
              {
                name: 'Signup',
                url: '/signup'
              }
            ]
          }
          return (
            <Menu fluid vertical tabular='right'>
              {menuItems.map(i => (
                <Menu.Item
                  key={i.name}
                  name={i.name}
                  active={pathname === i.url}
                >
                  <Link prefetch href={i.url}>
                    <a>{i.name}</a>
                  </Link>
                </Menu.Item>
              ))}
              {user && (
                <Menu.Item key="Logout"><a onClick={() => this.logout(client)} style={{ cursor: 'pointer' }}>Logout</a></Menu.Item>
              )}
            </Menu>
          )}}
      </Query>
    )
  }
}
