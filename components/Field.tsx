// @flow

import React from 'react'
import { Field, Validator } from '@atlaskit/form'

interface Props {
  children: any
  isRequired?: Boolean
  validators?: Array<JSX.Element>
  label?: String
  validateOnChange?: Boolean
}

const CustomField = ({
  children,
  isRequired,
  validators = [],
  validateOnChange = true,
  ...otherProps
}: Props) => {
  if (isRequired) {
    validators.push(
      <Validator func={val => val} invalid="This field is required" />
    )
  }
  return (
    <Field
      validators={validators}
      validateOnChange={validateOnChange}
      isRequired={isRequired}
      {...otherProps}
    >
      {children}
    </Field>
  )
}

export default CustomField
