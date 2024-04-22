import { PropsWithChildren } from 'react'

export function ChessBoardLabel({ children }: PropsWithChildren) {
  return <div className="aspect-square">{children}</div>
}
