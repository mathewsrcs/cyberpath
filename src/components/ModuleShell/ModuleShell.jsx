import styles from './ModuleShell.module.css'

/* Casca comum de qualquer módulo: cabeçalho com kicker + título grande,
   objetivos da certificação e a barra de abas (aula / interação / quiz).
   Todo módulo novo deve usar isto, para a trilha inteira ter a mesma moldura. */
export function ModuleShell({ kicker, title, summary, objectives = [], tabs, active, onTab, onBack, children }) {
  return (
    <div className="page">
      <button type="button" className={styles.back} onClick={onBack}>
        ← Trilha
      </button>

      <header className={styles.header}>
        <span className="kicker">{kicker}</span>
        <h1 className={styles.title}>{title}</h1>
        {summary && <p className={styles.summary}>{summary}</p>}
        {objectives.length > 0 && (
          <ul className={styles.objectives}>
            {objectives.map((o) => (
              <li key={o} className="mono">
                {o}
              </li>
            ))}
          </ul>
        )}
      </header>

      {tabs && (
        <nav className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab} ${active === tab.id ? styles.tabActive : ''}`}
              onClick={() => onTab(tab.id)}
              aria-current={active === tab.id}
            >
              <span className={styles.tabIndex}>{tab.index}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      )}

      <main className={styles.body}>{children}</main>
    </div>
  )
}
