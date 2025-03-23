import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';


export default function AuthenticatedLayout({ children }: { children?: React.ReactNode }) {
    const { auth } = usePage<SharedData>().props; // Obtiene los datos de autenticación

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar */}
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold">
                    {auth?.user ? `Bienvenido, ${auth.user.name}` : 'Bienvenido'}
                </h1>
                {auth?.user && (
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Cerrar sesión
                    </Link>
                )}
            </header>

            {/* Contenido */}
            <main className="flex-grow p-6">
                {children ?? <p>Cargando...</p>}
            </main>
        </div>
    );
}
