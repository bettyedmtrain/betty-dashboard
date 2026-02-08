'use client'

import { useState, useEffect } from 'react'
import { supabase, ActivityLog } from '@/lib/supabase'

const catIcon: Record<string, string> = {
  task: '✅',
  system: '⚙️',
  memory: '🧠',
  default: '📌',
}

export default function ActivityFeed() {
  const [logs, setLogs] = useState<ActivityLog[]>([])

  useEffect(() => {
    supabase
      .from('activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => { if (data) setLogs(data) })
  }, [])

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
    <div className="bg-surface rounded-xl border border-border p-5">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Activity Feed</h2>
      {logs.length === 0 ? (
        <p className="text-gray-500 text-sm">No activity yet</p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3">
              <span className="text-lg mt-0.5">{catIcon[log.category || 'default'] || catIcon.default}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{log.action}</div>
                {log.details && <div className="text-xs text-gray-500 truncate">{log.details}</div>}
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap">{relTime(log.created_at)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
