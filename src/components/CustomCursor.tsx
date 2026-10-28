import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!cursor || !hasFinePointer || prefersReducedMotion) return

    const root = document.documentElement
    root.classList.add("custom-cursor-enabled")
    gsap.set(cursor, { x: -100, y: -100 })

    const moveX = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3.out" })
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3.out" })

    const handlePointerMove = (event: PointerEvent) => {
      moveX(event.clientX)
      moveY(event.clientY)
      cursor.classList.add("is-visible")

      const target = event.target
      const isInteractive =
        target instanceof Element &&
        target.closest("a, button, [role='button'], [data-cursor-hover]") !== null

      cursor.classList.toggle("is-over", isInteractive)
    }

    const hideCursor = () => cursor.classList.remove("is-visible", "is-over")

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("blur", hideCursor)
    document.addEventListener("pointerleave", hideCursor)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("blur", hideCursor)
      document.removeEventListener("pointerleave", hideCursor)
      root.classList.remove("custom-cursor-enabled")
      gsap.killTweensOf(cursor)
    }
  }, [])

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span className="custom-cursor__ring" />
      <span className="custom-cursor__core" />
    </div>
  )
}
