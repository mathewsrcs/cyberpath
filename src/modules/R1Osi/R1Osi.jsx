import { useEffect, useState } from 'react'
import { ModuleShell } from '../../components/ModuleShell/ModuleShell.jsx'
import { Quiz } from '../../components/Quiz/Quiz.jsx'
import { R1_QUIZ } from '../../data/r1-osi.js'
import { LayerExplorer } from './LayerExplorer.jsx'
import { EncapsulationLab } from './EncapsulationLab.jsx'

const TABS = [
  { id: 'aula', index: '01', label: 'Aula visual' },
  { id: 'lab', index: '02', label: 'Encapsulamento' },
  { id: 'quiz', index: '03', label: 'Quiz' },
]

export function R1Osi({ module, onBack, onVisit, onQuizFinish }) {
  const [tab, setTab] = useState('aula')

  useEffect(() => {
    onVisit?.(module.id)
  }, [module.id, onVisit])

  return (
    <ModuleShell
      kicker="R1 · Fundamentos de Redes"
      title="Modelo OSI e TCP/IP"
      summary="Sete camadas, uma pergunta por camada: de que esse pedaço da rede é responsável? Quem sabe responder isso resolve chamado mais rápido — e acerta a prova."
      objectives={module.objectives}
      tabs={TABS}
      active={tab}
      onTab={setTab}
      onBack={onBack}
    >
      {tab === 'aula' && <LayerExplorer />}
      {tab === 'lab' && <EncapsulationLab />}
      {tab === 'quiz' && (
        <Quiz
          questions={R1_QUIZ}
          onFinish={(result) => onQuizFinish?.(module.id, result)}
          onExit={onBack}
        />
      )}
    </ModuleShell>
  )
}
