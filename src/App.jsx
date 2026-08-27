import { useCallback, useState } from 'react'
import { Home } from './components/Home/Home.jsx'
import { getModule } from './data/trilha.js'
import { useProgress } from './hooks/useProgress.js'
import { R1Osi } from './modules/R1Osi/R1Osi.jsx'
import { SimuladoSecurityPlus } from './modules/SimuladoSecurityPlus/SimuladoSecurityPlus.jsx'

/* Roteamento por estado: a rota é o id do módulo aberto, ou null para a Home.
   Sem router enquanto não houver deep link — README §3 ("nada de framework até
   precisar de fato"). Ao trocar de tela, sobe o scroll. */
const SCREENS = {
  r1: R1Osi,
  'sim-secplus': SimuladoSecurityPlus,
}

export default function App() {
  const [route, setRoute] = useState(null)
  const { progress, markVisited, recordQuiz, resetAll } = useProgress()

  const open = useCallback((id) => {
    setRoute(id)
    window.scrollTo({ top: 0 })
  }, [])

  const back = useCallback(() => {
    setRoute(null)
    window.scrollTo({ top: 0 })
  }, [])

  const handleQuizFinish = useCallback(
    (id, result) => {
      recordQuiz(id, result)
    },
    [recordQuiz],
  )

  if (!route) {
    return (
      <Home
        progress={progress}
        onOpen={open}
        onReset={() => {
          if (window.confirm('Apagar todo o progresso salvo neste navegador?')) resetAll()
        }}
      />
    )
  }

  const module = getModule(route)
  const Screen = SCREENS[route]

  /* Rota inválida ou módulo ainda sem tela: volta para a trilha em vez de
     renderizar em branco. */
  if (!module || !Screen) {
    return <Home progress={progress} onOpen={open} onReset={resetAll} />
  }

  return (
    <Screen
      module={module}
      progress={progress}
      onBack={back}
      onVisit={markVisited}
      onQuizFinish={handleQuizFinish}
    />
  )
}
