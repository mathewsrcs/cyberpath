import { useMemo, useState } from 'react'
import { ENCAPSULATION_STEPS } from '../../data/r1-osi.js'
import styles from './R1Osi.module.css'

/* Exercício de encapsulamento. A cada passo o usuário escolhe o que a camada
   acrescenta; só a resposta certa avança e dispara a animação do cabeçalho
   entrando na pilha. Errar não pune — mostra o porquê e deixa tentar de novo.

   Simulação didática: nenhum pacote real é gerado (README §6). */
export function EncapsulationLab() {
  const [step, setStep] = useState(0)
  const [wrong, setWrong] = useState(null)
  const [built, setBuilt] = useState([])
  const [done, setDone] = useState(false)

  const current = ENCAPSULATION_STEPS[step]

  /* Opções embaralhadas de forma estável por passo, para a resposta certa não
     cair sempre na mesma posição. */
  const options = useMemo(() => {
    if (!current) return []
    const all = [current.adds, ...current.distractors]
    return all
      .map((value, i) => ({ value, sort: (i * 7 + step * 3) % all.length }))
      .sort((a, b) => a.sort - b.sort)
      .map((o) => o.value)
  }, [current, step])

  function choose(option) {
    if (!current) return
    if (option !== current.adds) {
      setWrong(option)
      return
    }
    setWrong(null)
    setBuilt((prev) => [...prev, current])
    if (step === ENCAPSULATION_STEPS.length - 1) {
      setDone(true)
    } else {
      setStep((s) => s + 1)
    }
  }

  function reset() {
    setStep(0)
    setWrong(null)
    setBuilt([])
    setDone(false)
  }

  return (
    <div className={styles.lab}>
      <div className={styles.labIntro}>
        <span className="kicker">Exercício · Encapsulamento</span>
        <h3>Do clique no navegador até o bit no cabo</h3>
        <p className={styles.dim}>
          O usuário abriu <code>https://portal.exemplo.com/login</code>. Monte a descida da pilha:
          a cada camada, escolha o que é acrescentado ao dado. Simulação didática — nada é enviado
          de verdade.
        </p>
      </div>

      <div className={styles.labGrid}>
        <div className={styles.pduStage}>
          <span className={styles.stageLabel}>Unidade de dados (PDU)</span>
          {/* Do topo para a base: o cabeçalho mais recente fica por fora, então
              ler a pilha de cima para baixo dá a ordem real no fio —
              [Ethernet][IP][TCP][HTTP][dados]. */}
          <div className={styles.pduStack}>
            {[...built].reverse().map((s) => (
              <div
                key={s.layer}
                className={styles.pduHeader}
                style={{ '--layer-color': s.color }}
                title={s.adds}
              >
                <span className={styles.pduLayer}>L{s.layer}</span>
                <span className={styles.pduName}>{s.header}</span>
                <span className={styles.pduTag}>{s.pdu}</span>
              </div>
            ))}
            <div className={styles.pduCore}>
              <span className="mono">GET /login HTTP/1.1</span>
            </div>
          </div>
          {built.length > 0 && (
            <p className={styles.stageCaption}>{built[built.length - 1].caption}</p>
          )}
        </div>

        <div className={styles.labPanel}>
          {!done ? (
            <>
              <div className={styles.labStepHead} style={{ '--layer-color': current.color }}>
                <span className="mono">
                  Passo {step + 1} de {ENCAPSULATION_STEPS.length}
                </span>
                <strong>Camada {current.layer}</strong>
              </div>
              <p className={styles.labQuestion}>
                O dado está como <code>{current.payload}</code>. O que a camada {current.layer}{' '}
                acrescenta?
              </p>
              <div className={styles.labOptions}>
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.labOption} ${wrong === option ? styles.labOptionWrong : ''}`}
                    onClick={() => choose(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {wrong && (
                <p className={styles.labHint}>
                  Ainda não. <strong>{wrong}</strong> não é acrescentado pela camada {current.layer}
                  . Lembre do que essa camada precisa saber para fazer o trabalho dela.
                </p>
              )}
            </>
          ) : (
            <div className={styles.labDone}>
              <span className="kicker">Encapsulamento completo</span>
              <p>
                O quadro saiu como sinal no meio físico. No destino, cada camada remove o cabeçalho
                da sua par — <strong>desencapsulamento</strong> — até o servidor web receber
                exatamente o mesmo <code>GET /login</code> que o navegador escreveu.
              </p>
              <p className={styles.dim}>
                Guarde a regra: cada camada só conversa com a camada equivalente do outro lado, e só
                enxerga o que a camada de baixo entrega.
              </p>
              <button type="button" className={styles.labReset} onClick={reset}>
                Refazer o exercício
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
