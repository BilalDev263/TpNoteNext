"use client";

import { createCourse, deleteCourse } from "@/server/actions/courses";
import { useState } from "react";

export default function CoursesPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Gestion des Cours</h1>

      {message && <p className="text-green-500">{message}</p>}

      {/* Formulaire d'ajout */}
      <form
        action={async (formData) => {
          const result = await createCourse(formData);
          if (result?.error) {
            setMessage(result.error);
          } else {
            setMessage("Cours ajouté !");
          }
        }}
        className="space-y-3"
      >
        <input type="text" name="title" placeholder="Titre du cours" className="border p-2 w-full" required />
        <input type="text" name="description" placeholder="Description" className="border p-2 w-full" required />
        <input type="text" name="instrument" placeholder="Instrument" className="border p-2 w-full" required />
        <input type="text" name="level" placeholder="Niveau" className="border p-2 w-full" required />
        <input type="text" name="schedule" placeholder="Horaires" className="border p-2 w-full" required />
        <input type="number" name="capacity" placeholder="Capacité" className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Ajouter</button>
      </form>

      {/* Liste des cours */}
      <ul className="mt-6">
        {/* Ici, tu devras récupérer et afficher les cours existants */}
      </ul>
    </div>
  );
}
