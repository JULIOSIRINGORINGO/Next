export default function Loading() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="h-6 w-32 bg-muted rounded animate-pulse mb-6" />
          <div className="max-w-3xl mx-auto space-y-4 animate-pulse">
            <div className="text-center space-y-3">
              <div className="h-6 w-28 mx-auto bg-muted rounded-full" />
              <div className="h-12 w-3/4 mx-auto bg-muted rounded-lg" />
              <div className="h-5 w-48 mx-auto bg-muted rounded" />
              <div className="h-5 w-40 mx-auto bg-muted rounded" />
            </div>
            <div className="mt-8 space-y-3">
              <div className="h-5 w-full bg-muted rounded" />
              <div className="h-5 w-5/6 bg-muted rounded" />
              <div className="h-5 w-2/3 bg-muted rounded" />
            </div>
            <div className="flex justify-center mt-8">
              <div className="h-12 w-48 bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
