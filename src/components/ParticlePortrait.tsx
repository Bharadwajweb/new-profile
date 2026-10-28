import { useEffect, useRef } from "react"

const PORTRAIT_SOURCE_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/passport%20size%20photo-79zivY2SJdNgbkeZFU5AiKNWcNGkCu.jpg"
const LOCAL_PORTRAIT_FALLBACK = "/portrait.jpg"

type ParticlePhase = "scatter" | "assemble" | "hold" | "dissolve"

type Particle = {
  x: number
  y: number
  homeX: number
  homeY: number
  driftX: number
  driftY: number
  radius: number
  opacity: number
  color: string
  seed: number
}

type ParticlePortraitProps = {
  phase: ParticlePhase
  className?: string
  interactive?: boolean
}

function createBackgroundMask(
  pixels: ImageData["data"],
  width: number,
  height: number,
  sampleStep: number,
) {
  const columns = Math.ceil(width / sampleStep)
  const rows = Math.ceil(height / sampleStep)
  const size = columns * rows
  const candidates = new Uint8Array(size)
  const background = new Uint8Array(size)

  const readRgb = (x: number, y: number): [number, number, number] => {
    const pixelIndex = (Math.min(height - 1, y) * width + Math.min(width - 1, x)) * 4
    return [pixels[pixelIndex], pixels[pixelIndex + 1], pixels[pixelIndex + 2]]
  }

  const edgeColors = [
    readRgb(0, 0),
    readRgb(width - 1, 0),
    readRgb(0, Math.floor(height * 0.18)),
    readRgb(width - 1, Math.floor(height * 0.18)),
  ]
  const backgroundRed = edgeColors.reduce((sum, color) => sum + color[0], 0) / edgeColors.length
  const backgroundGreen = edgeColors.reduce((sum, color) => sum + color[1], 0) / edgeColors.length
  const backgroundBlue = edgeColors.reduce((sum, color) => sum + color[2], 0) / edgeColors.length

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = Math.min(width - 1, column * sampleStep + Math.floor(sampleStep / 2))
      const y = Math.min(height - 1, row * sampleStep + Math.floor(sampleStep / 2))
      const [red, green, blue] = readRgb(x, y)
      const brightness = red * 0.2126 + green * 0.7152 + blue * 0.0722
      const colorRange = Math.max(red, green, blue) - Math.min(red, green, blue)
      const distanceFromBackground =
        Math.abs(red - backgroundRed) +
        Math.abs(green - backgroundGreen) +
        Math.abs(blue - backgroundBlue)

      if (brightness > 178 && colorRange < 48 && distanceFromBackground < 150) {
        candidates[row * columns + column] = 1
      }
    }
  }

  const queue = new Int32Array(size)
  let queueStart = 0
  let queueEnd = 0

  const enqueueIfBackground = (index: number) => {
    if (!candidates[index] || background[index]) return
    background[index] = 1
    queue[queueEnd] = index
    queueEnd += 1
  }

  for (let column = 0; column < columns; column += 1) {
    enqueueIfBackground(column)
    enqueueIfBackground((rows - 1) * columns + column)
  }

  for (let row = 0; row < rows; row += 1) {
    enqueueIfBackground(row * columns)
    enqueueIfBackground(row * columns + columns - 1)
  }

  while (queueStart < queueEnd) {
    const index = queue[queueStart]
    queueStart += 1
    const row = Math.floor(index / columns)
    const column = index % columns

    if (column > 0) enqueueIfBackground(index - 1)
    if (column < columns - 1) enqueueIfBackground(index + 1)
    if (row > 0) enqueueIfBackground(index - columns)
    if (row < rows - 1) enqueueIfBackground(index + columns)
  }

  return { background, columns }
}

export function ParticlePortrait({

  phase,
  className = "",
  interactive = false,
}: ParticlePortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const phaseRef = useRef(phase)
  const dissolveStartedAt = useRef(0)
  const scheduleRenderRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (phase === "dissolve" && phaseRef.current !== "dissolve") {
      dissolveStartedAt.current = performance.now()
    }
    phaseRef.current = phase
    scheduleRenderRef.current?.()
  }, [phase])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d", { alpha: true })

    if (!canvas || !context) return

    const image = new Image()
    const pointer = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY }
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let particles: Particle[] = []
    let cssWidth = 0
    let cssHeight = 0
    let animationFrame = 0
    let disposed = false
    let usingLocalFallback = false
    let portraitCanvas: HTMLCanvasElement | null = null
    let portraitOffsetX = 0
    let portraitOffsetY = 0
    let portraitWidth = 0
    let portraitHeight = 0

    const loadLocalFallback = () => {
      if (disposed || usingLocalFallback) return
      usingLocalFallback = true
      image.src = LOCAL_PORTRAIT_FALLBACK
    }

    const render = (now: number) => {
      if (disposed) return

      context.clearRect(0, 0, cssWidth, cssHeight)
      const currentPhase = phaseRef.current

      if (currentPhase === "hold" && portraitCanvas) {
        context.globalCompositeOperation = "source-over"
        context.globalAlpha = 1

        for (const particle of particles) {
          particle.x = particle.homeX
          particle.y = particle.homeY
        }

        context.drawImage(
          portraitCanvas,
          portraitOffsetX,
          portraitOffsetY,
          portraitWidth,
          portraitHeight,
        )
      } else {
        context.globalCompositeOperation = "screen"
        const releaseStartedAt = dissolveStartedAt.current || now
        const releaseProgress = Math.min(1, (now - releaseStartedAt) / 1050)

        for (const particle of particles) {
          let targetX = particle.homeX
          let targetY = particle.homeY
          let opacity = particle.opacity

          if (currentPhase === "scatter") {
            targetX += Math.sin(now * 0.00045 + particle.seed) * 5
            targetY += Math.cos(now * 0.00035 + particle.seed) * 5
          }

          if (currentPhase === "dissolve") {
            targetX += particle.driftX * releaseProgress
            targetY += particle.driftY * releaseProgress
            opacity *= 1 - releaseProgress
          }

          const easing = prefersReducedMotion ? 1 : currentPhase === "dissolve" ? 0.065 : 0.085
          particle.x += (targetX - particle.x) * easing
          particle.y += (targetY - particle.y) * easing

          if (interactive && !prefersReducedMotion) {
            const distanceX = particle.x - pointer.x
            const distanceY = particle.y - pointer.y
            const distance = Math.hypot(distanceX, distanceY)

            if (distance > 0 && distance < 62) {
              const force = (1 - distance / 62) * 13
              particle.x += (distanceX / distance) * force
              particle.y += (distanceY / distance) * force
            }
          }

          if (opacity <= 0.006) continue

          context.globalAlpha = opacity
          context.fillStyle = particle.color
          context.beginPath()
          context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          context.fill()
        }
      }

      context.globalAlpha = 1
      context.globalCompositeOperation = "source-over"

      if (!prefersReducedMotion && currentPhase !== "hold") {
        animationFrame = window.requestAnimationFrame(render)
      }
    }

    const scheduleRender = () => {
      if (disposed) return
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(render)
    }

    scheduleRenderRef.current = scheduleRender

    const rebuildParticles = () => {
      if (!image.naturalWidth || disposed) return

      const bounds = canvas.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return

      cssWidth = bounds.width
      cssHeight = bounds.height
      portraitCanvas = null
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75)
      canvas.width = Math.round(cssWidth * pixelRatio)
      canvas.height = Math.round(cssHeight * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const scale = Math.max(
        (cssWidth * 0.94) / image.naturalWidth,
        (cssHeight * 0.94) / image.naturalHeight,
      )
      const cropWidth = cssWidth / scale
      const cropHeight = cssHeight / scale
      const sourceX = (image.naturalWidth - cropWidth) / 2
      const sourceY = Math.max(0, image.naturalHeight - cropHeight) * 0.08
      const imageWidth = Math.max(1, Math.round(cropWidth * scale))
      const imageHeight = Math.max(1, Math.round(cropHeight * scale))
      const sampleCanvas = document.createElement("canvas")
      sampleCanvas.width = imageWidth
      sampleCanvas.height = imageHeight
      const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true })

      if (!sampleContext) return

      let pixels: ImageData["data"]

      try {
        sampleContext.drawImage(
          image,
          sourceX,
          sourceY,
          cropWidth,
          cropHeight,
          0,
          0,
          imageWidth,
          imageHeight,
        )
        pixels = sampleContext.getImageData(0, 0, imageWidth, imageHeight).data
      } catch {
        loadLocalFallback()
        return
      }

      const sampleStep = Math.max(3, Math.ceil(Math.max(imageWidth, imageHeight) / 112))
      const offsetX = (cssWidth - imageWidth) / 2
      const offsetY = (cssHeight - imageHeight) / 2
      const backgroundMask = createBackgroundMask(pixels, imageWidth, imageHeight, sampleStep)
      const nextParticles: Particle[] = []
      let row = 0

      for (let y = 0; y < imageHeight; y += sampleStep, row += 1) {
        let column = 0

        for (let x = 0; x < imageWidth; x += sampleStep, column += 1) {
          const pixelIndex = (y * imageWidth + x) * 4
          const red = pixels[pixelIndex]
          const green = pixels[pixelIndex + 1]
          const blue = pixels[pixelIndex + 2]
          const alpha = pixels[pixelIndex + 3]
          const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722
          const maskIndex = row * backgroundMask.columns + column

          if (alpha < 24 || backgroundMask.background[maskIndex]) continue

          const toneLift = 42
          const brightness = Math.min(244, toneLift + luminance * 0.78)
          const grayscale = Math.round(brightness)
          const color = `rgb(${grayscale}, ${grayscale}, ${grayscale})`
          const seed = Math.random() * Math.PI * 2

          nextParticles.push({
            x: Math.random() * cssWidth,
            y: Math.random() * cssHeight,
            homeX: offsetX + x,
            homeY: offsetY + y,
            driftX: Math.cos(seed) * (50 + Math.random() * cssWidth * 0.46),
            driftY: Math.sin(seed) * (50 + Math.random() * cssHeight * 0.42),
            radius: luminance > 180 ? 1.3 : 0.96 + Math.random() * 0.34,
            opacity: Math.min(0.98, 0.56 + (brightness / 255) * 0.42),
            color,
            seed,
          })
        }
      }

      particles = nextParticles
      const grayscaleImageData = sampleContext.createImageData(imageWidth, imageHeight)

      for (let pixelIndex = 0; pixelIndex < pixels.length; pixelIndex += 4) {
        const luminance =
          pixels[pixelIndex] * 0.2126 +
          pixels[pixelIndex + 1] * 0.7152 +
          pixels[pixelIndex + 2] * 0.0722
        const grayscale = Math.min(244, Math.round(42 + luminance * 0.78))
        grayscaleImageData.data[pixelIndex] = grayscale
        grayscaleImageData.data[pixelIndex + 1] = grayscale
        grayscaleImageData.data[pixelIndex + 2] = grayscale
        grayscaleImageData.data[pixelIndex + 3] = pixels[pixelIndex + 3]
      }

      sampleContext.putImageData(grayscaleImageData, 0, 0)
      portraitCanvas = sampleCanvas
      portraitOffsetX = offsetX
      portraitOffsetY = offsetY
      portraitWidth = imageWidth
      portraitHeight = imageHeight
      scheduleRender()
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
    }
    const handlePointerLeave = () => {
      pointer.x = Number.NEGATIVE_INFINITY
      pointer.y = Number.NEGATIVE_INFINITY
    }

    image.crossOrigin = "anonymous"
    image.decoding = "async"
    image.addEventListener("load", rebuildParticles)
    image.addEventListener("error", loadLocalFallback)
    image.src = PORTRAIT_SOURCE_URL

    const resizeObserver = new ResizeObserver(rebuildParticles)
    resizeObserver.observe(canvas.parentElement ?? canvas)

    if (interactive) {
      canvas.addEventListener("pointermove", handlePointerMove)
      canvas.addEventListener("pointerleave", handlePointerLeave)
    }

    if (image.complete && image.naturalWidth > 0) {
      rebuildParticles()
    }

    return () => {
      disposed = true
      window.cancelAnimationFrame(animationFrame)
      image.removeEventListener("load", rebuildParticles)
      image.removeEventListener("error", loadLocalFallback)
      resizeObserver.disconnect()
      canvas.removeEventListener("pointermove", handlePointerMove)
      canvas.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [interactive])

  return (
    <canvas
      ref={canvasRef}
      className={`particle-canvas ${className}`.trim()}
      aria-hidden="true"
    />
  )
}
