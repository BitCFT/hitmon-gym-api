import { prismaClient } from "../prismaClient";
import { v4 as uuid } from 'uuid';

(async () => {
  const [studentRole, adminRole, instructorRole] = await Promise.all([
    prismaClient.role.upsert({
      where: {type: 'STUDENT'},
      update: {},
      create: {
        id: uuid(),
        type: 'STUDENT',
        description: 'student permissions'
      }
    }),
    prismaClient.role.upsert({
      where: {type: 'ADMIN'},
      update: {},
      create: {
        id: uuid(),
        type: 'ADMIN',
        description: 'admin permissions'
      }
    }),
    prismaClient.role.upsert({
      where: {type: 'INSTRUCTOR'},
      update: {},
      create: {
        id: uuid(),
        type: 'INSTRUCTOR',
        description: 'instructor permissions'
      }
    })
  ])
})()
