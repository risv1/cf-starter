export function InfoCard() {
  return (
    <div className="flex-1 h-screen bg-neutral-950 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-950 flex items-center justify-center p-12">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold mb-6">Welcome to CF Starter</h1>
        <p className="text-lg opacity-90">
          Build full-stack applications with Cloudflare's edge platform. Sign up to get started.
        </p>
      </div>
    </div>
  )
}
