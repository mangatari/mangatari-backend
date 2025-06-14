import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.users.findMany();
  console.log(users);
}

main()
  .catch((e) => {
    console.error('Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default prisma;