import React, { Component } from 'react'
import cookie from 'cookie'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Menu } from 'semantic-ui-react'
import Link from 'next/link'

export const userQuery = gql`
  {
    currentUser @client {
      id
    }
  }
`

interface Props {
  router: {
    pathname: String
    asPath: String
  }
}

const defaultMenuItems = [{ name: 'All Meetups', url: '/' }]
let menuItems

export default class MenuComponent extends Component<Props> {
  signout = client => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1, // Expire the cookie immediately
    })
    client.writeData({ data: { currentUser: null } })
  }

  render() {
    const {
      router: { pathname, asPath },
    } = this.props
    return (
      <Query query={userQuery}>
        {({ data, client }) => {
          const user = data && data.currentUser
          if (user) {
            menuItems = [
              ...defaultMenuItems,
              {
                name: 'My Profile',
                url: '/me',
              },
              {
                name: 'My Meetups',
                url: '/my-meetups',
              },
              {
                name: "I'm going",
                url: '/meetups-going',
              },
              {
                name: 'Create Meetup',
                url: '/create',
              },
            ]
          } else {
            menuItems = [
              ...defaultMenuItems,
              {
                name: 'Sign In',
                url: `/signin?redirect=${asPath}`,
              },
              {
                name: 'Sign Up',
                url: '/signup',
              },
            ]
          }
          return (
            <Menu fluid vertical tabular="right">
              {menuItems.map(i => (
                <Menu.Item
                  key={i.name}
                  name={i.name}
                  active={
                    pathname === i.url || pathname.startsWith(`${i.url}/`)
                  }
                >
                  <Link prefetch href={i.url}>
                    <a>{i.name}</a>
                  </Link>
                </Menu.Item>
              ))}
              {user && (
                <Menu.Item key="Sign Out">
                  <a
                    onClick={() => this.signout(client)}
                    style={{ cursor: 'pointer' }}
                  >
                    Sign Out
                  </a>
                </Menu.Item>
              )}
            </Menu>
          )
        }}
      </Query>
    )
  }
}
