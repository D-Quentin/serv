import {
  AppShell,
  Navbar,
  Header,
  ThemeIcon,
  Group,
  Text,
  UnstyledButton,
  Button,
  Avatar,
  Title,
  Badge
} from '@mantine/core'
import { Movie, CurrencyBitcoin, LayoutDashboard } from 'tabler-icons-react'
import { ButtonNavbar } from './MainLayout.style'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router';

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainNavbar = () => {
  return (
    <>
      <Navbar width={{ sm: 200, lg: 250 }} p="xs">
        <UnstyledButton sx={(theme) => ButtonNavbar(theme)} component={Link} to={routes.home()}>
          <Group spacing="lg">
            <ThemeIcon color="grey" variant="light" size="xl">
              <LayoutDashboard size={28} />
            </ThemeIcon>
            <Text size="md">Dashboard</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton sx={(theme) => ButtonNavbar(theme)} component={Link} to={routes.crypto()}>
          <Group spacing="lg">
            <ThemeIcon color="yellow" variant="light" size="xl">
              <CurrencyBitcoin size={28} />
            </ThemeIcon>
            <Text size="md">Crypto</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton sx={(theme) => ButtonNavbar(theme)} component={Link} to={routes.series()}>
          <Group spacing="lg">
            <ThemeIcon color="red" variant="light" size="xl">
              <Movie size={28} />
            </ThemeIcon>
            <Text size="md">Series</Text>
          </Group>
        </UnstyledButton>
      </Navbar>
    </>
  )
}

const MainHeader = () => {
  const { logOut, currentUser } = useAuth()

  return (
    <>
      <Header height={58} p="xs">
        <Group grow style={{marginLeft: 25}}>
          <Group position="left">
            <UnstyledButton component={Link} to={routes.profil()}>
              <Badge size="xl" variant="gradient" gradient={{ from: 'orange', to: 'red' }}  style={{height: 36, cursor: 'pointer'}}>
              <Group spacing="sm" grow>
                <Avatar radius="md" color="orange"/>
                {currentUser.username}
              </Group>
                </Badge>
            </UnstyledButton>
          </Group>
          <Group position="right">
            <Button onClick={logOut} variant="light" color="gray">Log out</Button>
          </Group>
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
