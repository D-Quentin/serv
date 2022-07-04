import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  CryptoPositionResolvers,
} from 'types/graphql'

export const cryptoPositions: QueryResolvers['cryptoPositions'] = () => {
  return db.cryptoPosition.findMany()
}

export const cryptoPosition: QueryResolvers['cryptoPosition'] = ({ id }) => {
  return db.cryptoPosition.findUnique({
    where: { id },
  })
}

export const createCryptoPosition: MutationResolvers['createCryptoPosition'] =
  ({ input }) => {
    return db.cryptoPosition.create({
      data: input,
    })
  }

export const updateCryptoPosition: MutationResolvers['updateCryptoPosition'] =
  ({ id, input }) => {
    return db.cryptoPosition.update({
      data: input,
      where: { id },
    })
  }

export const deleteCryptoPosition: MutationResolvers['deleteCryptoPosition'] =
  ({ id }) => {
    return db.cryptoPosition.delete({
      where: { id },
    })
  }

export const CryptoPosition: CryptoPositionResolvers = {
  user: (_obj, { root }) =>
    db.cryptoPosition.findUnique({ where: { id: root.id } }).user(),
  logs: (_obj, { root }) =>
    db.cryptoPosition.findUnique({ where: { id: root.id } }).logs(),
}
