import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        username: 'String3477965',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
    two: {
      data: {
        username: 'String8798128',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
