import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  LogResolvers,
} from 'types/graphql'

export const logs: QueryResolvers['logs'] = () => {
  return db.log.findMany()
}

export const log: QueryResolvers['log'] = ({ id }) => {
  return db.log.findUnique({
    where: { id },
  })
}

export const createLog: MutationResolvers['createLog'] = ({ input }) => {
  return db.log.create({
    data: input,
  })
}

export const updateLog: MutationResolvers['updateLog'] = ({ id, input }) => {
  return db.log.update({
    data: input,
    where: { id },
  })
}

export const deleteLog: MutationResolvers['deleteLog'] = ({ id }) => {
  return db.log.delete({
    where: { id },
  })
}

export const Log: LogResolvers = {
  CryptoPosition: (_obj, { root }) =>
    db.log.findUnique({ where: { id: root.id } }).CryptoPosition(),
}
