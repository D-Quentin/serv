import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.LogCreateArgs>({
  log: {
    one: {
      data: {
        status: 4850031,
        message: 'String',
        CryptoPosition: {
          create: {
            symbol: 'String',
            algorithm: 'String',
            amount: 444121.15173417144,
            user: {
              create: {
                username: 'String3433067',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        status: 4243530,
        message: 'String',
        CryptoPosition: {
          create: {
            symbol: 'String',
            algorithm: 'String',
            amount: 9755409.01014168,
            user: {
              create: {
                username: 'String9997101',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
