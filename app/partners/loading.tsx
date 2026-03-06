export default function PartnersLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-12 w-64 bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-96 bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
        </div>
      </section>

      {/* Partners grid skeleton */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse flex items-center justify-center">
                <div className="h-20 w-32 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
