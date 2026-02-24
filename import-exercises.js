import { PrismaClient } from '@prisma/client';
import { readFile } from 'fs/promises';

const prisma = new PrismaClient();

async function main() {
  const data = await readFile('./exercises.json', 'utf-8');
  const exercises = JSON.parse(data);

  for (const ex of exercises) {
    await prisma.exercise.create({
      data: {
        name: ex.name,
        description: ex.description,
        muscleGroup: ex.muscle_group
      }
    });
  }

  console.log("Импорт завершён!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
