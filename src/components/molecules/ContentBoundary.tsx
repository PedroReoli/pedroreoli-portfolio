import React from "react"

interface ContentBoundaryProps {
  children: React.ReactNode
  fallback: React.ReactNode
}

/** Isola falhas de renderização/importação sem remover o conteúdo independente. */
export default class ContentBoundary extends React.Component<
  ContentBoundaryProps,
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
