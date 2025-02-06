// app/403/page.tsx
export default function ForbiddenPage() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">403</h1>
          <p className="text-lg mt-4">Accès interdit : Vous n'êtes pas autorisé à accéder à cette page.</p>
          <a
            href="/dashboard"
            className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Retour au Tableau de Bord
          </a>
        </div>
      </div>
    );
  }
  