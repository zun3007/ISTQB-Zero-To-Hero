import { Link } from 'react-router-dom'
import { termId } from '../../data/schema.js'

/*
  Minimal inline markdown → React. Supports:
    `code`   **bold**   *italic*   [[Term EN]] (glossary chip)
  Deliberately tiny: content authors get just enough expressivity without a
  heavyweight markdown dependency, and EN terms get first-class styling.
*/

function parseEmphasis(text, keyBase) {
  const nodes = []
  const re = /\[\[([^\]]+)\]\]|\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let last = 0
  let m
  let i = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    const key = `${keyBase}-e${i++}`
    if (m[1] !== undefined) {
      const term = m[1].trim()
      nodes.push(
        <Link
          key={key}
          to={`/glossary#${termId(term)}`}
          className="font-semibold text-brand-600 dark:text-brand-300 underline decoration-dotted decoration-brand-400/60 underline-offset-2 hover:decoration-solid"
        >
          {term}
        </Link>,
      )
    } else if (m[2] !== undefined) {
      nodes.push(
        <strong key={key} className="font-bold text-ink">
          {m[2]}
        </strong>,
      )
    } else {
      nodes.push(
        <em key={key} className="italic">
          {m[3]}
        </em>,
      )
    }
    last = re.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export function renderInline(text = '', keyBase = 'md') {
  const out = []
  const parts = String(text).split(/(`[^`]+`)/g)
  parts.forEach((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      out.push(
        <code
          key={`${keyBase}-c${idx}`}
          className="rounded-md bg-surface-3 px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
        >
          {part.slice(1, -1)}
        </code>,
      )
    } else if (part) {
      out.push(...parseEmphasis(part, `${keyBase}-${idx}`))
    }
  })
  return out
}

export default function MD({ text, as: As = 'span', className }) {
  return <As className={className}>{renderInline(text)}</As>
}
