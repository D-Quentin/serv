import { MantineTheme } from '@mantine/core'

export const ButtonNavbar = (theme: MantineTheme) => {
  return {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    color: theme.colors.dark[0],
    '&:hover': {
      backgroundColor: theme.colors.dark[6],
    },
  }
}
