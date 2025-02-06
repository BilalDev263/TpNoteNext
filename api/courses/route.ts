import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Create a new course
export async function POST(req: Request) {
  const body = await req.json();
  const course = await prisma.course.create({
    data: body,
  });
  return NextResponse.json(course);
}

// Read all courses
export async function GET() {
  const courses = await prisma.course.findMany();
  return NextResponse.json(courses);
}

// Update a course
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...data } = body;
  const updatedCourse = await prisma.course.update({
    where: { id },
    data,
  });
  return NextResponse.json(updatedCourse);
}

// Delete a course
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.course.delete({
    where: { id },
  });
  return NextResponse.json({ message: "Course deleted successfully" });
}
