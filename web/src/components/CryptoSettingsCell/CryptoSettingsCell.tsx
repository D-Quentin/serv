import type { CryptoSettingsQuery, UpdateUserMutation, UpdateUserMutationVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps, } from '@redwoodjs/web'
import { TextInput, Divider, Text, SimpleGrid, Button, Space } from '@mantine/core';
import { Key } from 'tabler-icons-react';
import { useMutation } from '@redwoodjs/web'
import { showNotification } from '@mantine/notifications'
import { useRef } from 'react'
import { useAuth } from '@redwoodjs/auth'

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
  mutation UpdateUserMutation($id: String!, $input: UpdateUserInput!) {
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
  const binanceApiKey = useRef<HTMLInputElement>()
  const binanceApiSecret = useRef<HTMLInputElement>()
  const binanceApiKeyTest = useRef<HTMLInputElement>()
  const binanceApiSecretTest = useRef<HTMLInputElement>()
  const { currentUser } = useAuth()

  const [update, { loading, error }] = useMutation
  <UpdateUserMutation, UpdateUserMutationVariables> (UPDATE_USER, {
    onCompleted: () => {
      showNotification({ title: 'Saved', message: 'Values successfully saved', color: 'teal', })
    },
  })

  const onSubmit = () => {
    update({ variables: {id: currentUser.id,input: {
      ApiKey: binanceApiKey.current.value,
      SecretKey: binanceApiSecret.current.value,
      TestApiKey: binanceApiKeyTest.current.value,
      TestSecretKey: binanceApiSecretTest.current.value,
    }}})
  }

  return (
    <>
      <Text size="xl" weight={500} >Binance API Keys</Text>
      <Divider size="xs" style={{ marginTop: "16px", marginBottom: "16px" }}/>
      <SimpleGrid cols={2}>
        <TextInput ref={binanceApiKey} icon={<Key size={14} />} label="API Key" placeholder="API Key" defaultValue={user.ApiKey} />
        <TextInput ref={binanceApiSecret} icon={<Key size={14} />} label="API Secret" placeholder="API Secret" defaultValue={user.SecretKey}/>
        <TextInput ref={binanceApiKeyTest} icon={<Key size={14} />} label="API Key Test" placeholder="API Key Test" defaultValue={user.TestApiKey}/>
        <TextInput ref={binanceApiSecretTest} icon={<Key size={14} />} label="API Secret Test" placeholder="API Secret Test" defaultValue={user.TestSecretKey}/>
      </SimpleGrid>
      <Space h="xl" />
      <Button disabled={loading} onClick={onSubmit}>Save</Button>
    </>
  )
}
