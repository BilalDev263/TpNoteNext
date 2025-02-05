"use client";

import { useEffect, useState } from "react";
import { fetchCourses, fetchEnrollments } from "@/app/lib/data";
import { Course, Enrollment } from "@/app/lib/definitions";

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const coursesData = await fetchCourses();
        setCourses(coursesData || []);

        const enrollmentsData = await fetchEnrollments("student-id");
        setEnrollments(enrollmentsData || []);

        setLoading(false);
      } catch (error) {
        console.error("Erreur de chargement :", error);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Tableau de Bord</h1>

      <section>
        <h2 className="text-xl font-semibold mt-6">Cours Disponibles</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <strong>{course.title}</strong> - {course.instrument} ({course.level})
              <br />
              <em>Professeur :</em> {course.teacher?.name || "Non assigné"}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-6">Mes Inscriptions</h2>
        <ul>
          {enrollments.map((enroll) => (
            <li key={enroll.id}>
              <strong>{enroll.course.title}</strong> - {enroll.status}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
