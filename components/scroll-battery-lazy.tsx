'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

/**
 * The scroll jar is decorative and carries Framer Motion (~50 KB gzipped), so
 * it is fetched only once the browser is idle after load. It is fixed to a
 * corner and aria-hidden, so arriving late shifts nothing.
 */
const ScrollBattery = dynamic(() => import('@/components/scroll-battery'), { ssr: false })

export default function ScrollBatteryLazy() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const start = () => setReady(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }
    const t = setTimeout(start, 2500)
    return () => clearTimeout(t)
  }, [])

  return ready ? <ScrollBattery /> : null
}
