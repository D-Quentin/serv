import type { FindCryptoCreateBotQuery, FindCryptoCreateBotQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindCryptoCreateBotQuery($id: Int!) {
    cryptoCreateBot: cryptoCreateBot(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindCryptoCreateBotQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  cryptoCreateBot,
}: CellSuccessProps<FindCryptoCreateBotQuery, FindCryptoCreateBotQueryVariables>) => {
  return <div>{JSON.stringify(cryptoCreateBot)}</div>
}
