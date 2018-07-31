import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import Link from 'next/link'
import { Grid, Segment } from 'semantic-ui-react'

import withApolloClient from '../lib/withApolloClient'

import Main from '../components/Main'
import Menu from '../components/Menu'

interface Props {
  apolloClient: ApolloClient<{}>
  loggedInUser?: Object
}

class MyApp extends App<Props> {
  render () {
    const { Component, pageProps, apolloClient, router: { pathname } } = this.props
    return <Container>
      <ApolloProvider client={apolloClient}>
        <Main>
          <div className="ui stackable relaxed container">
            <div className="header item">
              <h1>
                <Link href="/"><a className="navbar-item">Techies</a></Link>
              </h1>
            </div>
            <Grid>
              <Grid.Column stretched width={12}>
                <Segment>
                  <Component {...pageProps} />
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                <Menu pathname={pathname} />
              </Grid.Column>
            </Grid>
          </div>
        </Main>
      </ApolloProvider>
    </Container>
  }
}

export default withApolloClient(MyApp)
