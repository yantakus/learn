import { Mutation } from 'react-apollo'

interface IProps {
  children?: Function
  mutation: string
  refetchQueries: Array<string>
}

const MutationWrapper = ({ children, mutation, ...props }: IProps) => (
  <Mutation mutation={mutation} {...props}>
    {(...args) => children(args)}
  </Mutation>
)

export default MutationWrapper
