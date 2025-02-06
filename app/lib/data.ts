"use server";

import { prisma } from "@/app/lib/prisma";

// ✅ Récupérer tous les cours
export async function fetchCourses() {
  try {
    return await prisma.course.findMany({
      include: {
        teacher: true,
      },
    });
  } catch (error) {
    console.error("Erreur de récupération des cours :", error);
    throw new Error("Impossible de récupérer les cours.");
  }
}

// ✅ Récupérer les inscriptions d'un élève
export async function fetchEnrollments(studentId: string) {
  try {
    return await prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: {
          include: { teacher: true },
        },
      },
    });
  } catch (error) {
    console.error("Erreur de récupération des inscriptions :", error);
    throw new Error("Impossible de récupérer les inscriptions.");
  }
}

// ✅ Inscrire un élève à un cours
export async function enrollStudent(studentId: string, courseId: string) {
  try {
    return await prisma.enrollment.create({
      data: {
        studentId,
        courseId,
        status: "inscrit",
      },
    });
  } catch (error) {
    console.error("Erreur d'inscription :", error);
    throw new Error("Impossible d'inscrire l'élève.");
  }
}

// ✅ Récupérer les utilisateurs par rôle
export async function fetchUsersByRole(role: "admin" | "professeur" | "eleve") {
  try {
    return await prisma.user.findMany({
      where: { role },
    });
  } catch (error) {
    console.error("Erreur de récupération des utilisateurs :", error);
    throw new Error("Impossible de récupérer les utilisateurs.");
  }
}
