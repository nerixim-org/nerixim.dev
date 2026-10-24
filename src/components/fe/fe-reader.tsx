"use client"

import { X } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import type { Segment } from "@/lib/fe/parse"
import type { Kana, Question } from "@/lib/fe/questions"
import { cn } from "@/lib/utils"

type Props = {
  questions: Question[]
}

type Opener = HTMLButtonElement | null

function JapaneseText({
  segments,
  activeId,
  idPrefix,
  onPick,
}: {
  segments: Segment[]
  activeId: string | null
  idPrefix: string
  onPick: (segment: Segment, id: string, opener: HTMLButtonElement) => void
}) {
  return (
    <span lang="ja">
      {segments.map((segment, index) => {
        const id = `${idPrefix}-${index}`
        if (segment.gloss === undefined) {
          return <span key={id}>{segment.text}</span>
        }
        return (
          <button
            key={id}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={activeId === id}
            onClick={(event) => onPick(segment, id, event.currentTarget)}
            className={cn(
              "inline cursor-pointer rounded-sm px-px text-left align-baseline underline decoration-muted-foreground decoration-dotted underline-offset-[6px] [font:inherit] [line-height:inherit]",
              "hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
              activeId === id && "bg-accent decoration-primary decoration-solid",
            )}
          >
            {segment.text}
          </button>
        )
      })}
    </span>
  )
}

function QuestionCard({
  question,
  index,
  answer,
  onAnswer,
  activeId,
  onPick,
}: {
  question: Question
  index: number
  answer: Kana | undefined
  onAnswer: (kana: Kana) => void
  activeId: string | null
  onPick: (segment: Segment, id: string, opener: HTMLButtonElement) => void
}) {
  const answered = answer !== undefined
  const correct = answer === question.key

  return (
    <article
      id={question.id}
      aria-labelledby={`${question.id}-title`}
      className="scroll-mt-24 rounded-xl border border-border bg-card p-4 text-card-foreground sm:p-6"
    >
      <header className="mb-3 flex flex-wrap items-center gap-2">
        <h2 id={`${question.id}-title`} className="font-heading font-semibold text-lg">
          Question {index + 1}
        </h2>
        <Badge variant="secondary">{question.topic}</Badge>
        <span className="text-muted-foreground text-sm">Tap a dotted word for its reading and meaning.</span>
      </header>

      <p className="text-lg leading-[1.9] sm:text-xl">
        <JapaneseText
          segments={question.stem.segments}
          activeId={activeId}
          idPrefix={`${question.id}-stem`}
          onPick={onPick}
        />
      </p>

      <ul className="mt-4 space-y-2">
        {question.choices.map((choice, i) => {
          const isKey = answered && choice.kana === question.key
          const isWrongPick = answered && choice.kana === answer && !correct
          return (
            <li
              key={choice.kana}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-2 sm:p-3",
                isKey ? "border-primary bg-accent" : isWrongPick ? "border-destructive" : "border-border",
              )}
            >
              <button
                type="button"
                onClick={() => onAnswer(choice.kana)}
                aria-label={`Choose ${choice.kana}`}
                aria-pressed={answer === choice.kana}
                disabled={answered}
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-full border border-border font-semibold",
                  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 enabled:hover:bg-accent",
                  answer === choice.kana && "bg-primary text-primary-foreground",
                )}
              >
                <span lang="ja">{choice.kana}</span>
              </button>
              <div className="min-w-0 flex-1 py-1.5 text-base leading-[1.9] sm:text-lg">
                <JapaneseText
                  segments={choice.segments}
                  activeId={activeId}
                  idPrefix={`${question.id}-c${i}`}
                  onPick={onPick}
                />
                {isKey ? <span className="ml-2 font-medium text-primary text-sm">Key</span> : null}
                {isWrongPick ? <span className="ml-2 font-medium text-destructive text-sm">Your choice</span> : null}
              </div>
            </li>
          )
        })}
      </ul>

      {answered ? (
        <output className="mt-4 block rounded-lg bg-muted p-4">
          <p className="font-semibold">
            {correct ? "Correct." : "Not this one."} The key is <span lang="ja">{question.key}</span>.
          </p>
          <p className="mt-2 text-base leading-relaxed">{question.explanation}</p>
        </output>
      ) : null}

      <dl className="mt-4 grid gap-x-4 gap-y-1 text-sm sm:grid-cols-[auto_1fr]">
        {question.terms.map((term) => (
          <div key={term.ja} className="contents">
            <dt lang="ja" className="font-medium">
              {term.ja}
            </dt>
            <dd className="text-muted-foreground">= {term.en}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-3 text-sm">
        <span className="text-muted-foreground">Sentence pattern: </span>
        <span lang="ja" className="font-medium">
          {question.pattern.ja}
        </span>{" "}
        <span className="text-muted-foreground">= {question.pattern.en}</span>
      </p>

      <details className="mt-4 rounded-lg border border-border p-3">
        <summary className="min-h-6 cursor-pointer font-medium text-sm">English translation (ours)</summary>
        <p className="mt-2">{question.stem.en}</p>
        <ol className="mt-2 space-y-1 text-sm">
          {question.choices.map((choice) => (
            <li key={choice.kana}>
              <span lang="ja" className="font-medium">
                {choice.kana}
              </span>{" "}
              {choice.en}
            </li>
          ))}
        </ol>
        <p className="mt-2 text-muted-foreground text-xs">Our own translation of the Japanese original, not IPA's.</p>
      </details>

      {question.official ? (
        <details className="mt-2 rounded-lg border border-border p-3">
          <summary className="min-h-6 cursor-pointer font-medium text-sm">Official English wording (ITPEC)</summary>
          <p className="mt-2">{question.official.stem}</p>
          <ol className="mt-2 space-y-1 text-sm">
            {question.official.choices.map((choice) => (
              <li key={choice.label}>
                <span className="font-medium">{choice.label})</span> {choice.text}{" "}
                <span className="text-muted-foreground">
                  = <span lang="ja">{choice.kana}</span> above
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-2 text-muted-foreground text-xs">
            Source: ITPEC {question.official.source}, https://itpec.org/pastexamqa/fe.html. English text copied
            unmodified; the choices appear in a different order than in the Japanese question.
          </p>
        </details>
      ) : null}

      <p className="mt-4 text-muted-foreground text-xs">
        <span lang="ja">{question.sourceLine}</span>. © IPA.
      </p>
    </article>
  )
}

export function FeReader({ questions }: Props) {
  const [answers, setAnswers] = useState<Record<string, Kana>>({})
  const [active, setActive] = useState<{ id: string; segment: Segment } | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<Opener>(null)

  const close = useCallback(() => {
    dialogRef.current?.close()
    setActive(null)
    openerRef.current?.focus()
    openerRef.current = null
  }, [])

  const pick = useCallback((segment: Segment, id: string, opener: HTMLButtonElement) => {
    openerRef.current = opener
    setActive({ id, segment })
    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      dialog.show()
    }
  }, [])

  useEffect(() => {
    if (!active) {
      return
    }
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [active, close])

  return (
    <>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            answer={answers[question.id]}
            onAnswer={(kana) => setAnswers((prev) => ({ ...prev, [question.id]: kana }))}
            activeId={active?.id ?? null}
            onPick={pick}
          />
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Reading and meaning"
        onClose={() => setActive(null)}
        className="fixed inset-x-0 top-auto bottom-0 z-50 m-0 mx-auto w-full max-w-2xl rounded-t-xl border border-border border-b-0 bg-popover p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-popover-foreground shadow-surface"
      >
        {active ? (
          <div>
            <div className="flex items-baseline gap-3">
              <p lang="ja" className="font-bold text-2xl">
                {active.segment.text}
              </p>
              {active.segment.reading ? (
                <p lang="ja" className="text-lg text-muted-foreground">
                  {active.segment.reading}
                </p>
              ) : null}
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="ml-auto inline-grid size-11 place-items-center rounded-full text-muted-foreground hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <p className="mt-2 text-lg leading-snug">{active.segment.gloss}</p>
            <p className="mt-2 text-muted-foreground text-xs">
              Meaning in this sentence. Machine-drafted, not yet reviewed by a human.
            </p>
          </div>
        ) : null}
      </dialog>
    </>
  )
}
