import { useEffect, useMemo, useState } from 'react'
import { ModuleShell } from '../../components/ModuleShell/ModuleShell.jsx'
import { Quiz } from '../../components/Quiz/Quiz.jsx'
import { DOMAINS, SECPLUS_QUESTIONS } from '../../data/securityplus-questions.js'
import styles from './SimuladoSecurityPlus.module.css'

const ALL = 'todos'

export function SimuladoSecurityPlus({ module, progress, onBack, onVisit, onQuizFinish }) {
  const [filter, setFilter] = useState(ALL)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    onVisit?.(module.id)
  }, [module.id, onVisit])

  const questions = useMemo(
    () =>
      filter === ALL
        ? SECPLUS_QUESTIONS
        : SECPLUS_QUESTIONS.filter((q) => q.domain === filter),
    [filter],
  )

  /* O quiz recebe o rótulo completo do domínio: o gráfico do resultado fica
     legível sem precisar traduzir "D4" de novo. */
  const labelled = useMemo(
    () =>
      questions.map((q) => ({
        ...q,
        domain: DOMAINS.find((d) => d.id === q.domain)?.label ?? q.domain,
      })),
    [questions],
  )

  if (running) {
    const domain = DOMAINS.find((d) => d.id === filter)
    return (
      <ModuleShell
        kicker="Simulado · Security+ SY0-701"
        title={filter === ALL ? 'Simulado completo' : domain.label}
        objectives={
          filter === ALL
            ? module.objectives
            : [`SY0-701 · Domínio ${filter.slice(1)} (${domain.weight}%)`]
        }
        onBack={() => setRunning(false)}
      >
        <Quiz
          questions={labelled}
          shuffle
          showDomainBreakdown
          passMark={0.75}
          onFinish={(result) => onQuizFinish?.(module.id, result)}
          onExit={() => setRunning(false)}
        />
      </ModuleShell>
    )
  }

  const last = progress?.[module.id]

  return (
    <ModuleShell
      kicker="Simulado · Security+ SY0-701"
      title="Simulado Security+"
      summary="25 questões originais em estilo cenário, distribuídas pelo peso oficial dos domínios. O resultado mostra o acerto por domínio — é assim que se descobre onde estudar."
      objectives={module.objectives}
      onBack={onBack}
    >
      <div className={styles.setup}>
        <section className={styles.card}>
          <h3>Escolha o escopo</h3>
          <p className={styles.dim}>
            O simulado completo respeita a distribuição da prova. Filtrar por domínio serve para
            treino dirigido depois de identificar um buraco.
          </p>

          <div className={styles.filters}>
            <button
              type="button"
              className={`${styles.filter} ${filter === ALL ? styles.filterActive : ''}`}
              onClick={() => setFilter(ALL)}
            >
              <span className={styles.filterLabel}>Simulado completo</span>
              <span className="mono">{SECPLUS_QUESTIONS.length} questões · 100%</span>
            </button>

            {DOMAINS.map((d) => {
              const count = SECPLUS_QUESTIONS.filter((q) => q.domain === d.id).length
              return (
                <button
                  key={d.id}
                  type="button"
                  className={`${styles.filter} ${filter === d.id ? styles.filterActive : ''}`}
                  style={{ '--domain-color': d.color }}
                  onClick={() => setFilter(d.id)}
                >
                  <span className={styles.filterLabel}>{d.label}</span>
                  <span className="mono">
                    {count} {count === 1 ? 'questão' : 'questões'} · {d.weight}% da prova
                  </span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            className={styles.start}
            onClick={() => setRunning(true)}
            disabled={questions.length === 0}
          >
            Iniciar · {questions.length} {questions.length === 1 ? 'questão' : 'questões'}
          </button>
          <p className={styles.note}>
            Questões embaralhadas a cada tentativa. Linha de corte deste simulado: 75%.
          </p>
        </section>

        <aside className={styles.card}>
          <h3>Sua última tentativa</h3>
          {last?.attempts ? (
            <>
              <div className={styles.lastScore}>
                <span className="mono">{Math.round((last.lastScore ?? 0) * 100)}%</span>
                <span className={styles.dim}>
                  melhor: {Math.round((last.bestScore ?? 0) * 100)}% ·{' '}
                  {last.attempts} {last.attempts === 1 ? 'tentativa' : 'tentativas'}
                </span>
              </div>
              {last.byDomain && (
                <ul className={styles.lastDomains}>
                  {Object.entries(last.byDomain).map(([domain, stats]) => {
                    const pct = Math.round((stats.correct / stats.total) * 100)
                    return (
                      <li key={domain}>
                        <span>{domain}</span>
                        <span
                          className="mono"
                          style={{
                            color:
                              pct >= 70 ? 'var(--green)' : pct >= 50 ? 'var(--amber)' : 'var(--red)',
                          }}
                        >
                          {pct}%
                        </span>
                      </li>
                    )
                  })}
                </ul>
              )}
            </>
          ) : (
            <p className={styles.dim}>
              Nenhuma tentativa registrada ainda. Depois da primeira, o acerto por domínio aparece
              aqui e fica salvo neste navegador.
            </p>
          )}
        </aside>
      </div>
    </ModuleShell>
  )
}
