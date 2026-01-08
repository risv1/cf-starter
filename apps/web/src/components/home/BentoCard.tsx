import type { ReactNode } from 'react'

interface BentoCardProps {
  title: string
  description: string
  icon: ReactNode
}

export function BentoCard({ title, description, icon }: BentoCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-950 dark:hover:border-neutral-100 transition-colors">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2 text-neutral-950 dark:text-neutral-100">{title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
    </div>
  )
}
