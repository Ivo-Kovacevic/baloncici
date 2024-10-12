import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/decorations')({
  component: () => <div>Hello /decorations!</div>,
})
