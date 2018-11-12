import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Table } from 'semantic-ui-react'
import Link from 'next/link'

import PageTitle from '../components/PageTitle'

class UserPage extends Component {
  render() {
    return (
      <Query query={USERS_QUERY}>
        {({ data: { users } }) => (
          <Fragment>
            <PageTitle>Top ranked users</PageTitle>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width="1">#</Table.HeaderCell>
                  <Table.HeaderCell>User</Table.HeaderCell>
                  <Table.HeaderCell width="1">Rank</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((item, i) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{i + 1}</Table.Cell>
                    <Table.Cell>
                      {item.name} aka{' '}
                      <Link href={`/user/${item.login}`}>
                        <a>{item.login}</a>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <strong>{item.rank}</strong>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Fragment>
        )}
      </Query>
    )
  }
}

const USERS_QUERY = gql`
  query USERS_QUERY {
    users(orderBy: "rank_DESC") {
      id
      login
      name
      rank
    }
  }
`

export default UserPage
