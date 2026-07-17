export default function Loading() {
  return (
    <div className="min-h-screen">
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="h-8 w-48 mx-auto bg-muted rounded-full animate-pulse" />
            <div className="h-12 w-3/4 mx-auto bg-muted rounded-lg animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-28 bg-muted rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
