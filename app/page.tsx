'use client'

import { useEffect, useState } from 'react'

const Cloud = ({ className = '' }: { className?: string }) => (
  <div className={`cloud ${className}`} aria-hidden="true"><i /><i /><i /></div>
)

const Bunny = ({ mood = 'soft' }: { mood?: 'soft' | 'angry' }) => (
  <div className={`film-bunny ${mood}`} aria-label="Conejito blanco">
    <div className="film-ear ear-left"><span /></div><div className="film-ear ear-right"><span /></div>
    <div className="film-head"><div className="film-fringe" /><div className="film-eye eye-left" /><div className="film-eye eye-right" /><div className="film-blush blush-left" /><div className="film-blush blush-right" /><div className="film-nose" /><div className="film-mouth" /></div>
    <div className="film-body"><div className="film-belly" /></div><div className="film-paw paw-left" /><div className="film-paw paw-right" />
    <div className="film-bow"><span /><b /><span /></div><div className="film-foot foot-left" /><div className="film-foot foot-right" />
  </div>
)

const Piggy = ({ mood = 'sad' }: { mood?: 'sad' | 'protective' }) => (
  <div className={`film-pig ${mood}`} aria-label="Cerdito rosa">
    <div className="film-pig-ear pig-ear-left" /><div className="film-pig-ear pig-ear-right" />
    <div className="film-pig-head"><div className="film-pig-eye eye-left" /><div className="film-pig-eye eye-right" /><div className="pig-tear tear-left" /><div className="pig-tear tear-right" /><div className="film-snout"><i /><i /></div></div>
    <div className="film-pig-body" /><div className="film-pig-foot pig-foot-left" /><div className="film-pig-foot pig-foot-right" />
  </div>
)

function Thought({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`thought ${className}`}><span className="thought-dot dot-large" /><span className="thought-dot dot-small" /><div>{children}</div></div>
}

function Typewriter({ text, active }: { text: string; active: boolean }) {
  const [visibleText, setVisibleText] = useState('')

  useEffect(() => {
    if (!active) {
      setVisibleText('')
      return
    }
    let index = 0
    setVisibleText('')
    const timer = window.setInterval(() => {
      index += 1
      setVisibleText(text.slice(0, index))
      if (index >= text.length) window.clearInterval(timer)
    }, 28)
    return () => window.clearInterval(timer)
  }, [active, text])

  return <span aria-label={text}>{visibleText}<i className="typing-cursor" aria-hidden="true" /></span>
}

export default function Home() {
  const [scene, setScene] = useState(0)
  const advance = () => setScene((current) => Math.min(current + 1, 7))
  const rewind = () => setScene((current) => Math.max(current - 1, 0))

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        advance()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        rewind()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <main className={`film-story scene-${scene}`} onClick={(event) => {
      const target = event.target as HTMLElement
      if (!target.closest('a, button')) advance()
    }}>
      <nav className="film-nav"><div className="film-brand"><span>♡</span> kaobunnie</div><div className="film-menu"><i /><i /><i /></div></nav>

      <section className={`film-cover story-panel ${scene === 0 ? 'is-active' : ''}`}>
        <Cloud className="cover-cloud cloud-a" /><Cloud className="cover-cloud cloud-b" /><Cloud className="cover-cloud cloud-c" /><div className="film-stars">✦</div>
        <div className="cover-characters"><div className="cover-moon" /><div className="cacao-tree cacao-left"><i /><i /><i /></div><div className="cacao-tree cacao-right"><i /><i /><i /></div><div className="cover-waterfall"><i /><i /><i /></div><Bunny /><Piggy mood="sad" /><span className="cover-heart">♡</span><div className="cacao-ground" /></div>
      </section>

      <section className={`film-scene scene-dialogue story-panel ${scene === 1 ? 'is-active' : ''}`}>
        <div className="scene-art art-dialogue"><div className="dialogue-sky" /><Cloud className="scene-cloud cloud-left" /><div className="tree tree-left" /><div className="cacao-tree cacao-right"><i /><i /><i /></div><div className="path" /><div className="speech-cloud"><span className="speech-tail" /><Typewriter active={scene === 1} text="He pensado en algo que hacía y ahora entiendo mejor por qué estaba mal. Cuando estabas enojada o necesitabas estar sola y me decías que no te acompañara, yo igual iba detrás de ti." /></div><Bunny mood="angry" /><Piggy mood="sad" /></div>
      </section>

      <section className={`film-scene scene-listening story-panel ${scene === 2 ? 'is-active' : ''}`}>
        <div className="scene-art art-listening"><div className="dialogue-sky" /><Cloud className="scene-cloud cloud-left" /><div className="tree tree-left" /><div className="path" /><div className="listening-bubble"><Typewriter active={scene === 2} text="En ese momento lo hacía porque quería acompañarte y no quería que te sintieras sola, pero ahora entiendo que eso no era escuchar lo que tú necesitabas. Tú me estabas pidiendo espacio claramente y yo no lo respetaba." /></div><Bunny mood="angry" /><Piggy mood="sad" /><span className="listening-heart">♡</span></div>
      </section>

      <section className={`film-scene scene-one story-panel ${scene === 3 ? 'is-active' : ''}`} id="scene-one">
        <div className="scene-art art-one"><div className="sunset" /><Cloud className="scene-cloud cloud-left" /><Cloud className="scene-cloud cloud-right" /><div className="tree tree-left" /><div className="tree tree-right" /><div className="path" /><div className="bunny-speech">No me acompañes. Quiero estar sola.</div><Bunny mood="angry" /><div className="bunny-backpack" /><Piggy mood="sad" /><div className="scene-heart broken">♡</div></div>
      </section>

      <section className={`film-scene scene-two story-panel ${scene === 4 ? 'is-active' : ''}`}>
        <section className="scene-art art-two"><div className="thought-glow" /><Cloud className="scene-cloud cloud-left" /><div className="thought-word">No la quiero dejar sola… ¿le puede pasar algo?</div><div className="tree tree-left" /><div className="hill-shadow" /><Piggy mood="sad" /><div className="tiny-bunny-silhouette" /><div className="rain rain-one" /><div className="rain rain-two" /><div className="rain rain-three" /></section>
      </section>

      <section className={`film-scene scene-three story-panel ${scene === 5 ? 'is-active' : ''}`}>
        <div className="scene-art art-three"><div className="night-moon" /><div className="night-cloud cloud-left" /><div className="night-cloud cloud-right" /><div className="protective-halo" /><div className="tree tree-left" /><div className="promise-bubble"><Typewriter active={scene === 5} text="Perdón por haberte sobreprotegido y por querer estar siempre a tu lado. Ahora entiendo que, aunque mi intención fuera cuidarte, no siempre era lo mejor. A veces lo correcto era conversar las cosas contigo primero, escucharte y decidir juntos qué era lo mejor." /></div><Bunny /><Piggy mood="protective" /><div className="protective-heart">♥</div><div className="ground-shine" /></div>
      </section>

      <section className={`film-scene scene-solo story-panel ${scene === 6 ? 'is-active' : ''}`}>
        <div className="scene-art art-solo"><div className="solo-moon" /><div className="solo-stars">✦　·　✧</div><div className="solo-window" /><div className="solo-floor" /><div className="solo-bubble"><Typewriter active={scene === 6} text="También reconozco que muchas veces estaba estresado y terminé respondiéndote mal o tratándote de una forma que no merecías. Sé que estar estresado no es una excusa para hablarte mal ni descargar mis problemas contigo. Me arrepiento de haberte hecho sentir mal por cosas que yo tenía que aprender a manejar mejor. Estoy tratando de trabajar en eso, porque no quiero volver a reaccionar de esa manera cuando esté pasando por momentos difíciles." /></div><Piggy mood="sad" /><div className="solo-shadow" /></div>
      </section>

      <section className={`film-scene scene-thanks story-panel ${scene === 7 ? 'is-active' : ''}`}>
        <div className="scene-art art-thanks"><div className="thanks-sunrise" /><div className="thanks-hill hill-a" /><div className="thanks-hill hill-b" /><div className="thanks-bubble"><Typewriter active={scene === 7} text={'Quiero decirte que estoy muy agradecido por todos los momentos lindos que me entregaste, por todo lo que me enseñaste y por ayudarme a madurar en muchas cosas.\n\nMe hiciste darme cuenta de aspectos míos que necesito mejorar y voy a intentar trabajar en cada uno de ellos de verdad, no solo por lo que pasó entre nosotros, sino también porque quiero ser una mejor persona.\n\nGracias por tu cariño, por tu paciencia, por las veces que estuviste conmigo y por todos esos pequeños momentos que para mí terminaron significando muchísimo.\n\nTambién aprendí que querer mucho a una persona no siempre significa estar encima de ella o intentar protegerla de todo. A veces amar también significa escuchar, respetar su espacio, conversar las cosas y entender lo que la otra persona necesita.\n\nMe quedo con todo lo bueno que vivimos y con todo lo que aprendí a tu lado. Independientemente de lo que pase más adelante, siempre voy a estar agradecido de haberte conocido y de todo lo bonito que me dejaste.'} /></div><Bunny /><Piggy mood="protective" /><span className="thanks-heart">♡</span></div>
      </section>

      <div className="film-controls" onClick={(event) => event.stopPropagation()}><button className="back-button" onClick={rewind} disabled={scene === 0} aria-label="Escena anterior">←</button><span className="film-progress"><i className={scene >= 0 ? 'filled' : ''} /><i className={scene >= 1 ? 'filled' : ''} /><i className={scene >= 2 ? 'filled' : ''} /><i className={scene >= 3 ? 'filled' : ''} /><i className={scene >= 4 ? 'filled' : ''} /><i className={scene >= 5 ? 'filled' : ''} /><i className={scene >= 6 ? 'filled' : ''} /><i className={scene >= 7 ? 'filled' : ''} /></span>{scene < 7 ? <button onClick={advance}>siguiente escena <b>→</b></button> : <span className="end-card">fin del capítulo</span>}</div>
      <footer className="film-footer"><span>♡</span></footer>
    </main>
  )
}
