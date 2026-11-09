import type { MouseEvent } from 'react'

interface Props { label: string; sections: { id: string; label: string }[] }

export function NotesSectionNav({ label, sections }: Props) {
  if (!sections.length) return null
  function focusSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    // Native anchors own hash/history/scroll; add focus to their destination.
    document.getElementById(id)?.focus({ preventScroll: true })
  }
  return (
    <nav className="notes-index" aria-label={label}>
      <p>{label}</p>
      <ul>{sections.map((section) => (
        <li key={section.id}><a href={`#${section.id}`} onClick={(event) => focusSection(event, section.id)}>{section.label}</a></li>
      ))}</ul>
    </nav>
  )
}
