"use client";

import { useEffect, useState } from "react";

// Définition du type Course
type Course = {
  id: string;
  title: string;
  description: string;
  instrument: string;
  level: string;
  teacher: {
    name: string;
  };
};

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null); // Type explicite pour course

  useEffect(() => {
    async function fetchCourse() {
      const response = await fetch(`/api/courses/${params.id}`); // Assure-toi que ton endpoint existe
      const data: Course = await response.json(); // Déclare le type des données
      setCourse(data);
    }
    fetchCourse();
  }, [params.id]);

  if (!course) return <p>Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">{course.title}</h1>
      <p>{course.description}</p>
      <p><strong>Instrument :</strong> {course.instrument}</p>
      <p><strong>Niveau :</strong> {course.level}</p>
      <p><strong>Professeur :</strong> {course.teacher.name}</p>
    </div>
  );
}
