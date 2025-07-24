import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pokemon-detail')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pokemon-detail"!</div>
}
