import { PrismaClient } from "@prisma/client";
import seedData from "./seed-data.json";
import { Group } from "@/models/group.model";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const data: Omit<Group, "id">[] = Array.from({ length: 100 }).map((_, i) => {
    const date = new Date(2023, 10, Math.trunc(Math.random() * 30));
    return {
      createdAt: date,
      updatedAt: date,
      description: faker.lorem.paragraph(),
    };
  });

  await prisma.group.createMany({
    data,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
