'use client'

import { useState, useEffect } from 'react'
import StatusCard from '@/components/StatusCard'
import TaskBoard from '@/components/TaskBoard'
import ActivityFeed from '@/components/ActivityFeed'
import QuickActions from '@/components/QuickActions'
import MemorySearch from '@/components/MemorySearch'
import { supabase, ActivityLog } from '@/lib/supabase'

export default function Home() {
  const [lastActivity, setLastActivity] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('activity_log')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data?.[0]) setLastActivity(data[0].created_at)
      })
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Betty Command Center <span className="text-yellow-400">⭐</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatusCard lastActivity={lastActivity} />
        <QuickActions />
      </div>

      <TaskBoard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <MemorySearch />
      </div>
    </main>
  )
}
