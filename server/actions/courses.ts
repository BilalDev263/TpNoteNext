"use server";

import { prisma } from "@/app/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Schéma de validation des données
const CourseSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  instrument: z.string(),
  teacherId: z.string(),
  level: z.string(),
  schedule: z.string(),
  capacity: z.number().min(1),
});

// Action pour créer un cours
export async function createCourse(formData: FormData) {
  const parsed = CourseSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: "Données invalides." };
  }

  await prisma.course.create({ data: parsed.data });

  revalidatePath("/dashboard/teacher/courses");
  return { success: "Cours ajouté avec succès !" };
}

// Action pour supprimer un cours
export async function deleteCourse(id: string) {
  await prisma.course.delete({ where: { id } });

  revalidatePath("/dashboard/teacher/courses");
}


export async function getAllCourses() {
  return await prisma.course.findMany({
    include: {
      teacher: true,
    },
  });
}


export async function getCourseById(id: string) {
  return await prisma.course.findUnique({
    where: { id },
    include: {
      teacher: true,
    },
  });
}

