import { Mutation } from 'react-apollo'
import { DocumentNode } from 'graphql'

interface IProps {
  children?: Function
  mutation: DocumentNode
  refetchQueries: Array<string>
}

const MutationWrapper = ({ children, mutation, ...props }: IProps) => (
  <Mutation mutation={mutation} {...props}>
    {(...args) => children(args)}
  </Mutation>
)

export default MutationWrapper
