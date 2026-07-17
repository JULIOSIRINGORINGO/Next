export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="h-8 w-48 mx-auto bg-muted rounded-full animate-pulse" />
            <div className="h-16 w-3/4 mx-auto bg-muted rounded-lg animate-pulse" />
            <div className="h-16 w-1/2 mx-auto bg-muted rounded-lg animate-pulse" />
            <div className="h-8 w-2/3 mx-auto bg-muted rounded-lg animate-pulse" />
            <div className="flex gap-4 justify-center pt-4">
              <div className="h-12 w-40 bg-muted rounded-lg animate-pulse" />
              <div className="h-12 w-32 bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
