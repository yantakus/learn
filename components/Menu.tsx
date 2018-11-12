import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Menu, Icon } from 'semantic-ui-react'
import Link from 'next/link'

import { CURRENT_USER_QUERY } from '../components/User'
import User from '../components/User'

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

interface Props {
  router: {
    pathname: String
    asPath: String
  }
}

const defaultMenuItems = [
  { name: 'All Videos', url: '/', icon: 'home' },
  { name: 'Top users', url: '/top-users', icon: 'users' },
]
let menuItems

export default class MenuComponent extends Component<Props> {
  render() {
    const {
      router: { pathname },
    } = this.props
    return (
      <User>
        {user => {
          if (user) {
            menuItems = [
              ...defaultMenuItems,
              {
                name: 'My Profile',
                url: '/me',
                icon: 'user',
              },
              {
                name: 'My Videos',
                url: '/my-videos',
                icon: 'caret square right',
              },
              {
                name: 'Bookmarked Videos',
                url: '/bookmarked-videos',
                icon: 'bookmark',
              },
              {
                name: 'Add Video',
                url: '/add',
                icon: 'plus square',
              },
            ]
          } else {
            menuItems = [
              ...defaultMenuItems,
              {
                name: 'Sign In',
                url: `/signin`,
              },
              {
                name: 'Sign Up',
                url: '/signup',
              },
            ]
          }
          return (
            <Mutation
              mutation={SIGN_OUT_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {signout => (
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
                        <a>
                          <Icon className="text-grey-darker" name={i.icon} />{' '}
                          {i.name}
                        </a>
                      </Link>
                    </Menu.Item>
                  ))}
                  {user && (
                    <Menu.Item key="Sign Out">
                      <a
                        onClick={() => signout()}
                        style={{ cursor: 'pointer' }}
                      >
                        <Icon className="text-grey-darker" name="sign out" />{' '}
                        Sign Out
                      </a>
                    </Menu.Item>
                  )}
                </Menu>
              )}
            </Mutation>
          )
        }}
      </User>
    )
  }
}
