// @flow

import React, { Fragment } from 'react'
import Head from 'next/head'
import { Header } from 'semantic-ui-react'
import { PROJECT_NAME } from '../constants'

interface Props {
  children: any
}

const PageTitle = ({ children }: Props) => {
  return (
    <Fragment>
      <Head>
        <title>
          {children} | {PROJECT_NAME}
        </title>
      </Head>
      <Header className="mb-10" as="h2" dividing>
        {children}
      </Header>
    </Fragment>
  )
}

export default PageTitle
