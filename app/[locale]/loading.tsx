export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-onca-orange rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-gray-600 font-medium">Cargando...</p>
      </div>
    </div>
  );
}
