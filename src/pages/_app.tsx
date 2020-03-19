import App from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'

import withData from '../lib/withData.js'

import Main from '../components/Main'
import Menu from '../components/Menu'
import Head from '../components/Head'

import 'semantic-ui-css/semantic.min.css'
import '../tailwind.css'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})

Router.events.on('routeChangeError', () => {
  NProgress.done()
})

interface Props {
  apollo: ApolloClient<{}>
  loggedInUser?: Object
  Component: React.FunctionComponent<any>
}

interface State {
  hasError: boolean
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
    const { Component, apollo, router } = this.props
    const { hasError } = this.state as State
    if (hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <>
        <Head title="With apollo app" />
        <ApolloProvider client={apollo}>
          <Main>
            <div className="ui stackable relaxed container">
              <div className="header item">
                <h1 className="mb-8">
                  <Link href="/">
                    <a className="navbar-item">Learn</a>
                  </Link>
                </h1>
              </div>
              <div className="flex -mx-4">
                <div className="flex-1 px-4">
                  <Component router={router} />
                </div>
                <div className="flex-initial px-4">
                  <Menu />
                </div>
              </div>
            </div>
          </Main>
        </ApolloProvider>
      </>
    )
  }
}

export default withData(MyApp)
