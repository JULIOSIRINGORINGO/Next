export default function Loading() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="h-6 w-32 bg-muted rounded animate-pulse mb-6" />
          <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
            <div className="text-center space-y-3">
              <div className="h-6 w-24 mx-auto bg-muted rounded-full" />
              <div className="h-12 w-3/4 mx-auto bg-muted rounded-lg" />
              <div className="h-6 w-2/3 mx-auto bg-muted rounded" />
            </div>
            <div className="aspect-video bg-muted rounded-xl" />
            <div className="flex justify-center gap-2">
              <div className="h-8 w-20 bg-muted rounded-full" />
              <div className="h-8 w-20 bg-muted rounded-full" />
              <div className="h-8 w-20 bg-muted rounded-full" />
            </div>
            <div className="flex justify-center gap-4">
              <div className="h-12 w-40 bg-muted rounded-lg" />
              <div className="h-12 w-40 bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
