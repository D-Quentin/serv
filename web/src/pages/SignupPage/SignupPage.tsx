import { Link, navigate, routes } from '@redwoodjs/router'
import { useRef } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { useEffect } from 'react'
import { LoginSingUpWrapper } from './../style/Global.style'
import { Box, TextInput, PasswordInput, Stack, Center, Button, Badge } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const username = useRef(null)
  const password = useRef(null)
  const confirmPassword = useRef(null)

  const onSubmit = async () => {
    if (password.current.value !== confirmPassword.current.value) {
      showNotification({ title: 'The 2 passwords do not match', message: 'Please try again', color: 'red', })
      return
    }
    const response = await signUp({username: username.current.value , password: password.current.value })
    if (response.message) {
      showNotification({ title: 'Signup failed', message: response.message, color: 'orange', })
    } else if (response.error) {
      showNotification({ title: 'Signup error', message: response.error, color: 'red', })
    } else {
      showNotification({ title: 'Signup success', message: 'Welcome!', color: 'teal', })
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

      <Center style={{ width: '100%', height: 484 }}>
        <Box sx={(theme) => LoginSingUpWrapper(theme)}>
          <Badge<typeof Link> component={Link} to="/login" variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} style={{width: 100, cursor: 'pointer'}} >Login</Badge>
          <Stack spacing="lg" style={{ width: 350 }}>
            <TextInput ref={username} placeholder='Username' label='Username' required/>
            <PasswordInput ref={password} placeholder='Password' label='Password' required/>
            <PasswordInput ref={confirmPassword} onKeyDown={(e) => handleInputEnter(e)} placeholder='Confirm password' label='Confirm Password' required/>
            <Button onClick={onSubmit} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Sign Up</Button>
          </Stack>
        </Box>
      </Center>
    </>
  )
}

export default SignupPage
