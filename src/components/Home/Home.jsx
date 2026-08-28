import { MODULES, TRACKS, moduleState } from '../../data/trilha.js'
import styles from './Home.module.css'

const STATE_LABEL = {
  done: 'Concluído',
  'in-progress': 'Em andamento',
  available: 'Disponível',
  locked: 'Bloqueado',
  soon: 'Em breve',
}

export function Home({ progress, onOpen, onReset }) {
  const ready = MODULES.filter((m) => m.status === 'ready')
  const doneCount = ready.filter((m) => progress[m.id]?.completed).length
  const overall = ready.length > 0 ? Math.round((doneCount / ready.length) * 100) : 0

  return (
    <div className="page">
      <header className={styles.hero}>
        <span className="kicker">CyberPath</span>
        <h1 className={styles.title}>Do cabo até o Security+</h1>
        <p className={styles.lead}>
          Uma trilha por vez, um módulo fechado por vez: aula visual, exercício e quiz com gabarito
          comentado. Conteúdo ancorado nos objetivos oficiais do Network+ N10-009 e do Security+
          SY0-701.
        </p>

        <div className={styles.overall}>
          <div className={styles.overallHead}>
            <span className="mono">
              {doneCount} de {ready.length} módulos disponíveis concluídos
            </span>
            <span className="mono">{overall}%</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.barFill} style={{ width: `${overall}%` }} />
          </div>
          {doneCount > 0 && (
            <button type="button" className={styles.reset} onClick={onReset}>
              Zerar progresso salvo
            </button>
          )}
        </div>
      </header>

      {Object.values(TRACKS).map((track) => {
        const trackModules = MODULES.filter((m) => m.track === track.id)
        return (
          <section key={track.id} className={styles.track} style={{ '--track-color': track.accent }}>
            <div className={styles.trackHead}>
              <span className="kicker">{track.kicker}</span>
              <h2 className={styles.trackTitle}>{track.label}</h2>
              <p className={styles.trackBlueprint}>
                Referência: <span className="mono">{track.blueprint}</span>
              </p>
            </div>

            <ol className={styles.path}>
              {trackModules.map((module) => {
                const state = moduleState(module, progress)
                const entry = progress[module.id]
                const clickable = state === 'done' || state === 'in-progress' || state === 'available'

                return (
                  <li key={module.id} className={styles.node}>
                    <span className={`${styles.marker} ${styles[`marker_${state}`]}`}>
                      {state === 'done' ? '✓' : module.code}
                    </span>

                    <button
                      type="button"
                      className={`${styles.card} ${styles[`card_${state}`]}`}
                      disabled={!clickable}
                      onClick={() => clickable && onOpen(module.id)}
                    >
                      <div className={styles.cardHead}>
                        <h3>{module.title}</h3>
                        <span className={`${styles.badge} ${styles[`badge_${state}`]}`}>
                          {STATE_LABEL[state]}
                        </span>
                      </div>
                      <p className={styles.cardSummary}>{module.summary}</p>
                      <div className={styles.cardMeta}>
                        <span className="mono">{module.objectives[0]}</span>
                        <span className="mono">~{module.minutes} min</span>
                        {entry?.bestScore != null && (
                          <span className={`${styles.score} mono`}>
                            melhor: {Math.round(entry.bestScore * 100)}%
                          </span>
                        )}
                      </div>
                      {state === 'locked' && (
                        <p className={styles.lockHint}>
                          Conclua o módulo anterior para liberar.
                        </p>
                      )}
                    </button>
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}

      <footer className={styles.footer}>
        <p>
          Os laboratórios são <strong>simulações didáticas</strong> — terminais e exercícios
          roteirizados, não ambiente real. Prática ofensiva de verdade fica para plataformas
          dedicadas.
        </p>
        <p className={styles.footerDim}>
          Progresso salvo apenas neste navegador (localStorage). Limpar os dados do site apaga a
          trilha.
        </p>
      </footer>
    </div>
  )
}
