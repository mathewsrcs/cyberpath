import { useMemo, useState } from 'react'
import styles from './Quiz.module.css'

/* Quiz reutilizável — usado pelo quiz de fim de módulo e pelo simulado.
   questions: [{ id, domain?, stem, options: string[], answer: index, explanation }]

   Fluxo por questão: escolher → Confirmar → gabarito comentado → Próxima.
   O gabarito aparece sempre logo após a resposta: o objetivo é aprender no erro,
   não medir prova. */
export function Quiz({
  questions,
  shuffle = false,
  showDomainBreakdown = false,
  onFinish,
  onExit,
  passMark = 0.7,
}) {
  const [seed, setSeed] = useState(0)

  const ordered = useMemo(() => {
    if (!shuffle) return questions
    const copy = [...questions]
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
    // `seed` força um novo embaralhamento a cada "Refazer".
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, shuffle, seed])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const question = ordered[index]
  const isLast = index === ordered.length - 1

  function confirm() {
    if (selected === null || confirmed) return
    setConfirmed(true)
    setAnswers((prev) => [
      ...prev,
      { question, chosen: selected, correct: selected === question.answer },
    ])
  }

  function next() {
    if (!confirmed) return
    if (isLast) {
      // `answers` já inclui a última questão: confirm() rodou em um render anterior.
      finish(answers)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setConfirmed(false)
  }

  function finish(finalAnswers) {
    const correct = finalAnswers.filter((a) => a.correct).length
    const byDomain = {}
    for (const entry of finalAnswers) {
      const domain = entry.question.domain
      if (!domain) continue
      byDomain[domain] ??= { correct: 0, total: 0 }
      byDomain[domain].total += 1
      if (entry.correct) byDomain[domain].correct += 1
    }
    setFinished(true)
    onFinish?.({ correct, total: finalAnswers.length, byDomain })
  }

  function restart() {
    setSeed((s) => s + 1)
    setIndex(0)
    setSelected(null)
    setConfirmed(false)
    setAnswers([])
    setFinished(false)
  }

  if (finished) {
    return (
      <Results
        answers={answers}
        showDomainBreakdown={showDomainBreakdown}
        passMark={passMark}
        onRestart={restart}
        onExit={onExit}
      />
    )
  }

  return (
    <div className={styles.quiz}>
      <div className={styles.progressRow}>
        <span className="mono">
          Questão {String(index + 1).padStart(2, '0')} / {String(ordered.length).padStart(2, '0')}
        </span>
        {question.domain && <span className={styles.domainTag}>{question.domain}</span>}
      </div>
      <div className={styles.bar}>
        <div className={styles.barFill} style={{ width: `${(index / ordered.length) * 100}%` }} />
      </div>

      <p className={styles.stem}>{question.stem}</p>

      <ul className={styles.options}>
        {question.options.map((option, i) => {
          const isAnswer = i === question.answer
          const isChosen = i === selected
          let tone = ''
          if (confirmed && isAnswer) tone = styles.right
          else if (confirmed && isChosen) tone = styles.wrong
          else if (isChosen) tone = styles.chosen

          return (
            <li key={i}>
              <button
                type="button"
                className={`${styles.option} ${tone}`}
                disabled={confirmed}
                onClick={() => setSelected(i)}
              >
                <span className={styles.letter}>{String.fromCharCode(65 + i)}</span>
                <span>{option}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {confirmed && (
        <div
          className={`${styles.feedback} ${
            selected === question.answer ? styles.feedbackRight : styles.feedbackWrong
          }`}
        >
          <strong>
            {selected === question.answer
              ? 'Correto.'
              : `Incorreto — a resposta é ${String.fromCharCode(65 + question.answer)}.`}
          </strong>
          <p>{question.explanation}</p>
        </div>
      )}

      <div className={styles.actions}>
        {onExit && (
          <button type="button" className={styles.ghost} onClick={onExit}>
            Sair
          </button>
        )}
        {!confirmed ? (
          <button
            type="button"
            className={styles.primary}
            disabled={selected === null}
            onClick={confirm}
          >
            Confirmar
          </button>
        ) : (
          <button type="button" className={styles.primary} onClick={next}>
            {isLast ? 'Ver resultado' : 'Próxima'}
          </button>
        )}
      </div>
    </div>
  )
}

function Results({ answers, showDomainBreakdown, passMark, onRestart, onExit }) {
  const total = answers.length
  const correct = answers.filter((a) => a.correct).length
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0
  const passed = total > 0 && correct / total >= passMark

  const byDomain = {}
  for (const entry of answers) {
    const domain = entry.question.domain
    if (!domain) continue
    byDomain[domain] ??= { correct: 0, total: 0 }
    byDomain[domain].total += 1
    if (entry.correct) byDomain[domain].correct += 1
  }
  const domains = Object.entries(byDomain).sort(([a], [b]) => a.localeCompare(b))

  const missed = answers.filter((a) => !a.correct)

  return (
    <div className={styles.results}>
      <div className={styles.scoreCard}>
        <span className="kicker">Resultado</span>
        <div className={`${styles.score} ${passed ? styles.scorePass : styles.scoreFail}`}>
          {pct}%
        </div>
        <p className={styles.scoreDetail}>
          <span className="mono">
            {correct} de {total}
          </span>{' '}
          {passed ? '— acima da linha de corte deste módulo.' : '— vale revisar a aula e refazer.'}
        </p>
      </div>

      {showDomainBreakdown && domains.length > 0 && (
        <section className={styles.breakdown}>
          <h3>Acerto por domínio</h3>
          {domains.map(([domain, stats]) => {
            const domainPct = Math.round((stats.correct / stats.total) * 100)
            return (
              <div key={domain} className={styles.domainRow}>
                <div className={styles.domainHead}>
                  <span>{domain}</span>
                  <span className="mono">
                    {stats.correct}/{stats.total} · {domainPct}%
                  </span>
                </div>
                <div className={styles.bar}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${domainPct}%`,
                      background:
                        domainPct >= 70 ? 'var(--green)' : domainPct >= 50 ? 'var(--amber)' : 'var(--red)',
                    }}
                  />
                </div>
              </div>
            )
          })}
        </section>
      )}

      {missed.length > 0 && (
        <section className={styles.review}>
          <h3>O que revisar</h3>
          {missed.map((entry, i) => (
            <div key={i} className={styles.reviewItem}>
              <p className={styles.reviewStem}>{entry.question.stem}</p>
              <p className={styles.reviewAnswer}>
                Resposta correta:{' '}
                <strong>
                  {String.fromCharCode(65 + entry.question.answer)}){' '}
                  {entry.question.options[entry.question.answer]}
                </strong>
              </p>
              <p className={styles.reviewWhy}>{entry.question.explanation}</p>
            </div>
          ))}
        </section>
      )}

      <div className={styles.actions}>
        {onExit && (
          <button type="button" className={styles.ghost} onClick={onExit}>
            Voltar à trilha
          </button>
        )}
        <button type="button" className={styles.primary} onClick={onRestart}>
          Refazer
        </button>
      </div>
    </div>
  )
}
