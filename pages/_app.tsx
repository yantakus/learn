import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import Link from 'next/link'
import { Grid, Segment } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import withApolloClient from '../lib/withApolloClient'

import Main from '../components/Main'
import Menu from '../components/Menu'
import Head from '../components/Head'

const userQuery = gql`
  {
    currentUser {
      id
    }
  }
`
interface Props {
  apolloClient: ApolloClient<{}>
  loggedInUser?: Object
}

class MyApp extends App<Props> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  componentDidCatch() {
    this.setState({ hasError: true })
  }
  render() {
    const { Component, pageProps, apolloClient, router } = this.props
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <Container>
        <Head title="Reko food" />
        <ApolloProvider client={apolloClient}>
          <Query query={userQuery} errorPolicy="all" fetchPolicy="network-only">
            {() => (
              <Main>
                <div className="ui stackable relaxed container">
                  <div className="header item">
                    <h1>
                      <Link href="/">
                        <a className="navbar-item">Techies</a>
                      </Link>
                    </h1>
                  </div>
                  <Grid>
                    <Grid.Column stretched width={12}>
                      <Segment stacked>
                        <Component {...pageProps} />
                      </Segment>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Menu router={router} />
                    </Grid.Column>
                  </Grid>
                </div>
              </Main>
            )}
          </Query>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
