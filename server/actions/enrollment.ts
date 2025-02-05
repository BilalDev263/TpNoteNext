"use server";

import { prisma } from "@/app/lib/prisma";

export async function enrollStudent(courseId: string, studentId: string): Promise<{ error?: string; success?: string }> {
  try {
    await prisma.enrollment.create({
      data: {
        courseId,
        studentId,
        enrollmentDate: new Date(),
        status: "pending",
      },
    });

    return { success: "Inscription réussie !" };
  } catch (error) {
    return { error: "Une erreur est survenue lors de l'inscription." };
  }
}
