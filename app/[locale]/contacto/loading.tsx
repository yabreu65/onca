export default function ContactoLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-12 w-64 bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-96 bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
        </div>
      </section>

      {/* Form skeleton */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
                <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-48 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 rounded-2xl p-8 animate-pulse">
            <div className="space-y-6">
              <div className="h-12 bg-gray-300 rounded"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
              <div className="h-32 bg-gray-300 rounded"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
