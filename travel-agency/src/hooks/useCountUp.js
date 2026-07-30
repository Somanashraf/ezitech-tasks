import { useEffect, useRef, useState } from 'react'

export default function useCountUp(target, duration = 2200, suffix = '') {
  const isDecimal = target % 1 !== 0
  const [value, setValue] = useState(isDecimal ? '0.0' + suffix : '0' + suffix)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()

          const animate = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = target * eased

            setValue(
              isDecimal
                ? current.toFixed(1) + suffix
                : Math.floor(current).toLocaleString() + suffix
            )

            if (progress < 1) requestAnimationFrame(animate)
          }

          requestAnimationFrame(animate)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, suffix, isDecimal])

  return { ref, value }
}
