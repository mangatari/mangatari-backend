import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());