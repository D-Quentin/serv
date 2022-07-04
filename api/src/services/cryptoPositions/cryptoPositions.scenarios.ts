import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CryptoPositionCreateArgs>({
  cryptoPosition: {
    one: {
      data: {
        symbol: 'String',
        algorithm: 'String',
        amount: 6923168.327450686,
        user: {
          create: {
            username: 'String4097072',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        symbol: 'String',
        algorithm: 'String',
        amount: 200858.94420622586,
        user: {
          create: {
            username: 'String3349536',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
