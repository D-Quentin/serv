import { MantineTheme } from '@mantine/core'

export const LoginSingUpWrapper = (theme: MantineTheme) => {
  return {
    display: 'flex',
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    color: theme.colors.dark[0],
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'column',
    backgroundColor: theme.colors.dark[9],
  }
}
