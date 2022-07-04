import { Link, navigate, routes } from '@redwoodjs/router'
import { useRef } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { useEffect } from 'react'
import { LoginSingUpWrapper } from './../style/Global.style'
import { Box, TextInput, PasswordInput, Stack, Center, Button, Badge } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const username = useRef(null)
  const password = useRef(null)

  const onSubmit = async () => {
    const response = await logIn({username: username.current.value , password: password.current.value })
    if (response.message) {
      showNotification({ title: 'Login failed', message: response.message, color: 'orange', })
    } else if (response.error) {
      showNotification({ title: 'Login error', message: response.error, color: 'red', })
    } else {
      showNotification({ title: 'Login success', message: 'Welcome!', color: 'teal', })
    }
  }

  const handleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit()
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <Center style={{ width: '100%', height: 400 }}>
        <Box sx={(theme) => LoginSingUpWrapper(theme)}>
        <Badge<typeof Link> component={Link} to="/signup" variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} style={{width: 100, cursor: 'pointer'}} >Sign Up</Badge>
          <Stack spacing="lg" style={{ width: 350 }}>
            <TextInput ref={username} placeholder='Username' label='Username'/>
            <PasswordInput ref={password} onKeyDown={(e) => handleInputEnter(e)} placeholder='Password' label='Password'/>
            <Button onClick={onSubmit} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Login</Button>
          </Stack>
        </Box>
      </Center>
    </>
  )
}

export default LoginPage
