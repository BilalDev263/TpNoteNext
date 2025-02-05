// Types pour les utilisateurs
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "eleve" | "professeur" | "admin"; // ✅ Rôles spécifiques
};

// Types pour les cours
export type Course = {
  id: string;
  title: string;
  description: string;
  instrument: string;
  level: string;
  teacher?: {
    id: string;
    name: string;
  };
};

// Types pour les inscriptions
export type Enrollment = {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: Date;
  status: string;
  course: Course; // Associer une inscription avec un cours
};
