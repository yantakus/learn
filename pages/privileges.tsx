import React, { Component, Fragment } from 'react'
import { Table, Icon } from 'semantic-ui-react'
import {
  SemanticICONS,
  SemanticCOLORS,
} from 'semantic-ui-react/dist/commonjs/generic'
import get from 'lodash/get'

import PageTitle from '../components/PageTitle'
import User from '../components/User'

interface IPrivilege {
  rank: number
  privilege: string
  description: string
  icon: SemanticICONS
  color?: SemanticCOLORS
}

const privileges: IPrivilege[] = [
  {
    rank: 500,
    privilege: 'vote down',
    description: 'Indicate when video is not useful',
    icon: 'chevron down',
    color: 'red',
  },
  {
    rank: 300,
    privilege: 'edit videos',
    description: 'Edit videos added by other users',
    icon: 'pencil',
    color: 'yellow',
  },
  {
    rank: 50,
    privilege: 'vote up',
    description: 'Indicate when video is useful',
    icon: 'chevron up',
    color: 'green',
  },
]

class UserPage extends Component {
  render() {
    return (
      <User>
        {user => {
          const rank = get(user, 'rank')
          return (
            <Fragment>
              <PageTitle>Privileges</PageTitle>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width="1">Rank</Table.HeaderCell>
                    <Table.HeaderCell>Privilege</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {privileges.map(i => {
                    const hasRank = rank >= i.rank
                    return (
                      <Table.Row
                        key={i.rank}
                        style={{ opacity: hasRank ? 0.5 : 1 }}
                      >
                        <Table.Cell>
                          {hasRank && (
                            <Icon
                              name="checkmark"
                              color="green"
                              style={{ display: 'inline' }}
                            />
                          )}
                          {i.rank}
                        </Table.Cell>
                        <Table.Cell>
                          <Icon name={i.icon} color={i.color} />
                          {i.privilege}
                        </Table.Cell>
                        <Table.Cell>{i.description}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Fragment>
          )
        }}
      </User>
    )
  }
}

export default UserPage
