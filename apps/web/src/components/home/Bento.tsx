import { SiCloudflare, SiDrizzle, SiHono, SiReact, SiTailwindcss } from 'react-icons/si'
import { BentoCard } from './BentoCard'

export function Bento() {
  const features = [
    {
      title: 'Cloudflare Workers',
      description: 'Deploy globally with edge computing',
      icon: <SiCloudflare />,
    },
    {
      title: 'React 19',
      description: 'Modern React with latest features',
      icon: <SiReact />,
    },
    {
      title: 'Hono',
      description: 'Ultra-fast web framework',
      icon: <SiHono />,
    },
    {
      title: 'Drizzle + D1',
      description: 'Type-safe database with D1',
      icon: <SiDrizzle />,
    },
    {
      title: 'Tailwind CSS',
      description: 'Utility-first styling',
      icon: <SiTailwindcss />,
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral-950 dark:text-neutral-100">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <BentoCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
