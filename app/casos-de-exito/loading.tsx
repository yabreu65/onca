export default function CasosLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-12 w-64 bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-96 bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
        </div>
      </section>

      {/* Cards skeleton */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-6 animate-pulse">
                <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
