'use client'

import { useState, useEffect } from 'react'

export default function StatusCard({ lastActivity }: { lastActivity: string | null }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const fmt = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  const relTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <div className="bg-surface rounded-xl border border-border p-5 md:col-span-1">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse-dot" />
        <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wide">Online</span>
      </div>
      <div className="text-3xl font-mono font-bold mb-2">{fmt(time)}</div>
      <div className="text-sm text-gray-400">
        {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
      </div>
      {lastActivity && (
        <div className="mt-3 text-xs text-gray-500">Last activity: {relTime(lastActivity)}</div>
      )}
    </div>
  )
}
