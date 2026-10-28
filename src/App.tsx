import { useCallback, useEffect, useRef, useState } from "react"
import { CustomCursor } from "./components/CustomCursor"
import { IntroSequence } from "./components/IntroSequence"
import { PortfolioPage } from "./components/PortfolioPage"

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const mainRef = useRef<HTMLElement | null>(null)
  const completeIntro = useCallback(() => setIntroComplete(true), [])

  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    if (!introComplete) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = originalOverflow
      mainRef.current?.focus({ preventScroll: true })
    }

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [introComplete])

  return (
    <>
      <PortfolioPage mainRef={mainRef} isActive={introComplete} />
      {!introComplete && <IntroSequence onComplete={completeIntro} />}
      <CustomCursor />
    </>
  )
}
