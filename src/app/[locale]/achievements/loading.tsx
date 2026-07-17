export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="h-6 w-32 mx-auto bg-muted rounded-full animate-pulse" />
            <div className="h-12 w-56 mx-auto bg-muted rounded-lg animate-pulse" />
            <div className="h-6 w-72 mx-auto bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl border overflow-hidden animate-pulse">
                <div className="h-40 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="flex gap-2">
                    <div className="h-5 w-20 bg-muted rounded-full" />
                  </div>
                  <div className="h-5 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-1/2 bg-muted rounded" />
                  <div className="h-3 w-24 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
