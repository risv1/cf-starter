export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Made by{' '}
          <a
            href="https://github.com/risv1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-950 dark:text-neutral-100 hover:underline"
          >
            @risv1
          </a>
        </p>
      </div>
    </footer>
  )
}
