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

// Récupération des cours d'un professeur
export async function getTeacherCourses(teacherId: string) {
  return await prisma.course.findMany({
    where: { teacherId },
  });
}

// Création d'un cours

export async function createCourse(courseData: {
  title: string;
  description: string;
  instrument: string;
  level: string;
  schedule?: string;
  capacity?: number;
  teacherId: string;
}) {
  // Fournir des valeurs par défaut si les champs sont optionnels
  const sanitizedData = {
    ...courseData,
    schedule: courseData.schedule || "Non spécifié", // Défaut pour les chaînes
    capacity: courseData.capacity ?? 0, // Défaut pour les nombres
  };

  return await prisma.course.create({
    data: {
      title: sanitizedData.title,
      description: sanitizedData.description,
      instrument: sanitizedData.instrument,
      level: sanitizedData.level,
      schedule: sanitizedData.schedule,
      capacity: sanitizedData.capacity,
      teacher: {
        connect: { id: sanitizedData.teacherId }, // Relation avec le professeur
      },
    },
  });
}



// Mise à jour d'un cours
export async function updateCourse(
  courseId: string,
  courseData: {
    title?: string;
    description?: string;
    instrument?: string;
    level?: string;
    schedule?: string;
    capacity?: number;
  }
) {
  return await prisma.course.update({
    where: { id: courseId },
    data: courseData,
  });
}

// Suppression d'un cours
export async function deleteCourse(courseId: string) {
  return await prisma.course.delete({
    where: { id: courseId },
  });
}
