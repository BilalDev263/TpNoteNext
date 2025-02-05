const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.course.deleteMany();
  await prisma.enrollment.deleteMany();

  const professeur = await prisma.user.create({
    data: {
      name: "Professeur X",
      email: "prof@example.com",
      password: "hashed_password",
      role: "professeur",
    },
  });

  const cours1 = await prisma.course.create({
    data: {
      title: "Guitare Débutant",
      description: "Cours pour débutants en guitare",
      instrument: "Guitare",
      teacherId: professeur.id,
      level: "débutant",
      schedule: "Mardi 18h",
      capacity: 10,
    },
  });

  const eleve = await prisma.user.create({
    data: {
      name: "Élève Y",
      email: "eleve@example.com",
      password: "hashed_password",
      role: "eleve",
    },
  });

  await prisma.enrollment.create({
    data: {
      studentId: eleve.id,
      courseId: cours1.id,
      status: "inscrit",
    },
  });

  console.log("Données insérées !");
}

main().finally(async () => {
  await prisma.$disconnect();
});
