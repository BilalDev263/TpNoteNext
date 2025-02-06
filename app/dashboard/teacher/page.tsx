import { auth } from "@/auth";
import { getTeacherCourses, createCourse, updateCourse, deleteCourse } from "@/app/lib/data";
import { revalidatePath } from "next/cache";

export default async function TeacherDashboard() {
  const session = await auth();

  if (!session || session.user.role !== "professeur" || !session.user.id) {
    return <p className="text-red-500 text-center font-semibold">Accès non autorisé</p>;
  }

  const teacherId = session.user.id;
  const courses = await getTeacherCourses(teacherId);

  // Server Action pour créer un cours
  async function handleCreateCourse(formData: FormData) {
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const instrument = formData.get("instrument")?.toString() || "";
    const level = formData.get("level")?.toString() || "";
    const schedule = formData.get("schedule")?.toString() || "";
    const capacity = parseInt(formData.get("capacity")?.toString() || "0", 10);

    await createCourse({
      title,
      description,
      instrument,
      level,
      schedule,
      capacity,
      teacherId,
    });

    revalidatePath("/dashboard/teacher");
  }

  // Server Action pour mettre à jour un cours
  async function handleUpdateCourse(courseId: string, formData: FormData) {
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const instrument = formData.get("instrument")?.toString() || "";
    const level = formData.get("level")?.toString() || "";
    const schedule = formData.get("schedule")?.toString() || "";
    const capacity = parseInt(formData.get("capacity")?.toString() || "0", 10);

    await updateCourse(courseId, {
      title,
      description,
      instrument,
      level,
      schedule,
      capacity,
    });

    revalidatePath("/dashboard/teacher");
  }

  // Server Action pour supprimer un cours
  async function handleDeleteCourse(courseId: string) {
    await deleteCourse(courseId);
    revalidatePath("/dashboard/teacher");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Gestion des Cours</h1>

      {/* Formulaire pour créer un cours */}
      <form action={handleCreateCourse} method="POST" className="mb-6 space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Titre"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        ></textarea>
        <input
          type="text"
          name="instrument"
          placeholder="Instrument"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="level"
          placeholder="Niveau"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="schedule"
          placeholder="Horaires"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacité"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter un cours
        </button>
      </form>

      {/* Liste des cours */}
      <ul>
        {courses.map((course) => (
          <li key={course.id} className="border rounded p-4 mb-4">
            <h2 className="text-lg font-semibold">{course.title}</h2>
            <p>{course.description}</p>
            <p>
              <strong>Instrument :</strong> {course.instrument}
            </p>
            <p>
              <strong>Niveau :</strong> {course.level}
            </p>
            <p>
              <strong>Horaires :</strong> {course.schedule || "Non spécifié"}
            </p>
            <p>
              <strong>Capacité :</strong> {course.capacity || "Non spécifié"}
            </p>

            {/* Formulaire pour modifier un cours */}
            <form
              action={(formData) => handleUpdateCourse(course.id, formData)}
              method="POST"
              className="space-y-2 mt-4"
            >
              <input
                type="text"
                name="title"
                defaultValue={course.title}
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                defaultValue={course.description}
                className="w-full border p-2 rounded"
              ></textarea>
              <input
                type="text"
                name="instrument"
                defaultValue={course.instrument}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="level"
                defaultValue={course.level}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="schedule"
                defaultValue={course.schedule || ""}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="capacity"
                defaultValue={course.capacity || 0}
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Modifier
              </button>
            </form>

            {/* Bouton pour supprimer un cours */}
            <form
              action={() => handleDeleteCourse(course.id)}
              method="POST"
              className="mt-4"
            >
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
