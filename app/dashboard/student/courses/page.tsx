"use client";

import { enrollStudent } from "@/server/actions/enrollment";
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

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]); // Déclare un tableau de cours
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch("/api/courses"); // Assure-toi que ton endpoint existe
      const data: Course[] = await response.json(); // Déclare le type des données
      setCourses(data);
    }
    fetchCourses();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Cours Disponibles</h1>

      {message && <p className="text-green-500">{message}</p>}

      <ul className="space-y-4">
        {courses.map((course) => (
          <li key={course.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{course.title}</h2>
            <p>{course.description}</p>
            <p><strong>Instrument :</strong> {course.instrument}</p>
            <p><strong>Niveau :</strong> {course.level}</p>
            <p><strong>Professeur :</strong> {course.teacher.name}</p>
            <button
              onClick={async () => {
                const result = await enrollStudent(course.id, "student-id-placeholder");
                setMessage(result.success || result.error || "");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              S'inscrire
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
