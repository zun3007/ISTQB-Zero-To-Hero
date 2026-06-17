import { renderInline } from './MD.jsx'
import {
  Analogy,
  Callout,
  Example,
  Flashcards,
  KeyTerm,
  ListBlock,
  Quote,
  TableBlock,
} from './blocks.jsx'
import Diagram from './Diagrams.jsx'
import Interactive from './Interactive.jsx'
import { CheckpointQuiz } from '../quiz/Quiz.jsx'

function Block({ block, onCheckpoint }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="mt-10 mb-3 scroll-mt-24 text-2xl font-bold text-ink first:mt-0">
          {renderInline(block.text)}
        </h2>
      )
    case 'h3':
      return <h3 className="mt-7 mb-2 text-xl font-bold text-ink">{renderInline(block.text)}</h3>
    case 'lead':
      return (
        <p className="my-4 text-lg leading-relaxed text-ink-soft">{renderInline(block.md)}</p>
      )
    case 'p':
      return <p className="my-4 leading-relaxed text-ink-soft">{renderInline(block.md)}</p>
    case 'list':
      return <ListBlock ordered={block.ordered} items={block.items} />
    case 'callout':
      return <Callout variant={block.variant} title={block.title} md={block.md} />
    case 'analogy':
      return <Analogy emoji={block.emoji} title={block.title} md={block.md} />
    case 'keyterm':
      return <KeyTerm en={block.en} vn={block.vn} def={block.def} />
    case 'example':
      return <Example title={block.title} md={block.md} />
    case 'quote':
      return <Quote md={block.md} who={block.who} />
    case 'table':
      return <TableBlock headers={block.headers} rows={block.rows} caption={block.caption} />
    case 'flashcards':
      return <Flashcards cards={block.cards} />
    case 'diagram':
      return <Diagram kind={block.kind} caption={block.caption} />
    case 'interactive':
      return <Interactive {...block} />
    case 'checkpoint':
      return <CheckpointQuiz questions={block.questions} onComplete={onCheckpoint} />
    default:
      return null
  }
}

export default function LessonRenderer({ blocks = [], onCheckpoint }) {
  return (
    <div className="lesson-prose">
      {blocks.map((b, i) => (
        <Block key={i} block={b} onCheckpoint={onCheckpoint} />
      ))}
    </div>
  )
}
