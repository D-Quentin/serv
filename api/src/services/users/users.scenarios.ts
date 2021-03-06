import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        username: 'String7386123',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
    two: {
      data: {
        username: 'String4289967',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
