import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { username: 'String3266836', hashedPassword: 'String', salt: 'String' },
    },
    two: {
      data: { username: 'String3060023', hashedPassword: 'String', salt: 'String' },
    },
  },
})

export type StandardScenario = typeof standard
