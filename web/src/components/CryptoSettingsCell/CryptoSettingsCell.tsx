import type { CreateContactMutation, CreateContactMutationVariables, } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { TextInput, Divider, Text, SimpleGrid, Button } from '@mantine/core';
import { Key } from 'tabler-icons-react';
import { useMutation } from '@redwoodjs/web'

export const QUERY = gql`
  query CryptoSettingsQuery($id: String!) {
    user(id: $id) {
      ApiKey
      SecretKey
      TestApiKey
      TestSecretKey
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUserMutation($input: UpdateUserMutation!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ user }: CellSuccessProps<CryptoSettingsQuery>) => {
  return (
    <>
      <Text size="xl" weight={500} >Binance API Keys</Text>
      <Divider size="xs" style={{ marginTop: "16px", marginBottom: "16px" }}/>
      <SimpleGrid cols={2}>
        <TextInput id="binanceApiKey" icon={<Key size={14} />} label="API Key" placeholder="API Key" defaultValue={user.ApiKey} />
        <TextInput id="binanceApiSecret" icon={<Key size={14} />} label="API Secret" placeholder="API Secret"  defaultValue={user.SecretKey}/>
        <TextInput id="binanceApiKeyTest" icon={<Key size={14} />} label="API Key Test" placeholder="API Key Test"  defaultValue={user.TestApiKey}/>
        <TextInput id="binanceApiSecretTest" icon={<Key size={14} />} label="API Secret Test" placeholder="API Secret Test"  defaultValue={user.TestSecretKey}/>
      </SimpleGrid>
      <Button >Save</Button>
    </>
  )
}
