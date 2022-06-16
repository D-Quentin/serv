import {
  AppShell,
  Navbar,
  Header,
  ThemeIcon,
  Group,
  Text,
  UnstyledButton,
  Button,
  Center
} from '@mantine/core'
import { Movie, CurrencyBitcoin, LayoutDashboard } from 'tabler-icons-react'
import { ButtonNavbar } from './MainLayout.style'
import { useAuth } from '@redwoodjs/auth'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainNavbar = () => {
  return (
    <>
      <Navbar width={{ sm: 200, lg: 250 }} p="xs">
        <UnstyledButton sx={(theme) => ButtonNavbar(theme)}>
          <Group spacing="lg">
            <ThemeIcon color="grey" variant="light" size="xl">
              <LayoutDashboard size={28} />
            </ThemeIcon>
            <Text size="md">Dashboard</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton sx={(theme) => ButtonNavbar(theme)}>
          <Group spacing="lg">
            <ThemeIcon color="yellow" variant="light" size="xl">
              <CurrencyBitcoin size={28} />
            </ThemeIcon>
            <Text size="md">Crypto</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton sx={(theme) => ButtonNavbar(theme)}>
          <Group spacing="lg">
            <ThemeIcon color="red" variant="light" size="xl">
              <Movie size={28} />
            </ThemeIcon>
            <Text size="md">Serie</Text>
          </Group>
        </UnstyledButton>
      </Navbar>
    </>
  )
}

const MainHeader = () => {
  const { logOut } = useAuth()

  return (
    <>
      <Header height={56} p="xs">
        <Group position="right">
          <Button onClick={logOut} variant="light" color="gray">Log out</Button>
        </Group>
      </Header>
    </>
  )
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <AppShell
        padding="md"
        navbar={<MainNavbar />}
        header={<MainHeader />}
        styles={(theme) => ({
          main: { backgroundColor: theme.colors.dark[8] },
        })}
      >
        <main>{children}</main>
      </AppShell>
    </>
  )
}

export default MainLayout
