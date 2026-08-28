import { Fragment, useState } from 'react'
import { LAYERS } from '../../data/r1-osi.js'
import styles from './R1Osi.module.css'

/* Aula visual: a pilha à esquerda, o detalhe da camada selecionada à direita.
   A coluna TCP/IP é desenhada por agrupamento — as camadas 5-7 do OSI formam
   um único bloco "Aplicação", que é exatamente o que o objetivo 1.1 cobra. */
export function LayerExplorer() {
  const [selected, setSelected] = useState(7)
  const layer = LAYERS.find((l) => l.n === selected)

  return (
    <div className={styles.explorer}>
      <div className={styles.stackWrap}>
        <div className={styles.stackHead}>
          <span className="mono">OSI</span>
          <span className="mono">TCP/IP</span>
        </div>
        {/* Grid único de 7 linhas: só assim o bloco TCP/IP consegue abranger
            várias camadas OSI (5-7 = Aplicação, 2-1 = Acesso à rede). */}
        <div className={styles.stack}>
          {LAYERS.map((l, i) => {
            const prev = LAYERS[i - 1]
            const startsGroup = !prev || prev.tcpip !== l.tcpip
            const groupSize = LAYERS.filter((x) => x.tcpip === l.tcpip).length
            return (
              <Fragment key={l.n}>
                <button
                  type="button"
                  onClick={() => setSelected(l.n)}
                  className={`${styles.layerBtn} ${selected === l.n ? styles.layerActive : ''}`}
                  style={{ '--layer-color': l.color }}
                  aria-pressed={selected === l.n}
                >
                  <span className={styles.layerNum}>{l.n}</span>
                  <span className={styles.layerName}>{l.name}</span>
                  <span className={styles.layerPdu}>{l.pdu}</span>
                </button>
                {startsGroup && (
                  <div
                    className={styles.tcpipGroup}
                    style={{ '--span': groupSize, '--layer-color': l.color }}
                  >
                    {l.tcpip}
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>
      </div>

      <article className={styles.detail} style={{ '--layer-color': layer.color }}>
        <span className="kicker">Camada {layer.n}</span>
        <h3 className={styles.detailTitle}>{layer.name}</h3>
        <p className={styles.detailRole}>{layer.role}</p>
        <p className={styles.detailText}>{layer.detail}</p>

        <div className={styles.detailGrid}>
          <div>
            <h4>PDU</h4>
            <p className="mono">{layer.pdu}</p>
          </div>
          <div>
            <h4>No TCP/IP</h4>
            <p className="mono">{layer.tcpip}</p>
          </div>
        </div>

        <div className={styles.detailGrid}>
          <div>
            <h4>Protocolos e exemplos</h4>
            <ul className={styles.chips}>
              {layer.examples.map((e) => (
                <li key={e} className="mono">
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Dispositivos que atuam aqui</h4>
            <ul className={styles.chips}>
              {layer.devices.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.breaks}>
          <h4>Quando quebra, o sintoma é</h4>
          <p>{layer.breaks}</p>
        </div>
      </article>
    </div>
  )
}
