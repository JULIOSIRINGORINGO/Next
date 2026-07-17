export default function Loading() {
  return (
    <div className="min-h-screen">
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="flex-1 space-y-4">
                <div className="h-8 w-48 bg-muted rounded-full animate-pulse" />
                <div className="h-4 w-64 bg-muted rounded animate-pulse" />
                <div className="space-y-2 mt-6">
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                </div>
              </div>
              <div className="w-48 h-48 bg-muted rounded-2xl animate-pulse flex-shrink-0" />
            </div>
            <div className="space-y-6">
              <div className="h-8 w-32 bg-muted rounded-full animate-pulse" />
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 w-full bg-muted rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
