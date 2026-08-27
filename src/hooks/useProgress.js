import { useCallback, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'cyberpath:progress:v1'

const EMPTY = { version: 1, modules: {} }

/* localStorage pode lançar (modo privado, cookies bloqueados). Toda leitura e
   escrita passa por aqui para o app nunca quebrar por causa da persistência. */
function readStore() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw)
    if (!parsed || parsed.version !== 1 || typeof parsed.modules !== 'object') return EMPTY
    return parsed
  } catch {
    return EMPTY
  }
}

function writeStore(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* sem persistência nesta sessão; o estado em memória continua válido */
  }
}

/* Estado de um módulo:
   { visited: bool, completed: bool, bestScore: 0..1, lastScore: 0..1,
     attempts: number, byDomain: { [dominio]: { correct, total } }, updatedAt } */
export function useProgress() {
  const [state, setState] = useState(readStore)

  useEffect(() => {
    writeStore(state)
  }, [state])

  /* Outra aba do mesmo navegador alterou o progresso. */
  useEffect(() => {
    function onStorage(event) {
      if (event.key === STORAGE_KEY) setState(readStore())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const patchModule = useCallback((id, patch) => {
    setState((prev) => {
      const current = prev.modules[id] ?? {}
      const next = { ...current, ...patch, updatedAt: new Date().toISOString() }
      return { ...prev, modules: { ...prev.modules, [id]: next } }
    })
  }, [])

  const markVisited = useCallback(
    (id) => {
      patchModule(id, { visited: true })
    },
    [patchModule],
  )

  const markCompleted = useCallback(
    (id) => {
      patchModule(id, { visited: true, completed: true })
    },
    [patchModule],
  )

  /* Guarda a melhor tentativa, não a última: o objetivo é registrar domínio do
     conteúdo. `lastScore` fica separado para a Home mostrar a tentativa recente. */
  const recordQuiz = useCallback(
    (id, { correct, total, byDomain }) => {
      const score = total > 0 ? correct / total : 0
      setState((prev) => {
        const current = prev.modules[id] ?? {}
        const bestScore = Math.max(current.bestScore ?? 0, score)
        const next = {
          ...current,
          visited: true,
          completed: true,
          lastScore: score,
          bestScore,
          attempts: (current.attempts ?? 0) + 1,
          byDomain: byDomain ?? current.byDomain,
          updatedAt: new Date().toISOString(),
        }
        return { ...prev, modules: { ...prev.modules, [id]: next } }
      })
    },
    [],
  )

  const resetAll = useCallback(() => {
    setState(EMPTY)
  }, [])

  const resetModule = useCallback((id) => {
    setState((prev) => {
      const modules = { ...prev.modules }
      delete modules[id]
      return { ...prev, modules }
    })
  }, [])

  return useMemo(
    () => ({
      progress: state.modules,
      markVisited,
      markCompleted,
      recordQuiz,
      resetAll,
      resetModule,
    }),
    [state.modules, markVisited, markCompleted, recordQuiz, resetAll, resetModule],
  )
}
