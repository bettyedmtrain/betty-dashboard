'use client'

import { useState, useEffect } from 'react'
import { supabase, MemoryEntry } from '@/lib/supabase'

export default function MemorySearch() {
  const [query, setQuery] = useState('')
  const [entries, setEntries] = useState<MemoryEntry[]>([])
  const [loading, setLoading] = useState(false)

  const search = async (q: string) => {
    setLoading(true)
    let req = supabase
      .from('memory_entries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(15)

    if (q.trim()) {
      req = req.ilike('content', `%${q.trim()}%`)
    }

    const { data } = await req
    if (data) setEntries(data)
    setLoading(false)
  }

  useEffect(() => { search('') }, [])

  useEffect(() => {
    const t = setTimeout(() => search(query), 300)
    return () => clearTimeout(t)
  }, [query])

  return (
    <div className="bg-surface rounded-xl border border-border p-5">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Memory Search</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search memories..."
        className="w-full bg-surface-lighter border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent mb-4"
      />
      {loading ? (
        <p className="text-gray-500 text-sm">Searching...</p>
      ) : entries.length === 0 ? (
        <p className="text-gray-500 text-sm">No memories found</p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {entries.map((e) => (
            <div key={e.id} className="bg-surface-light rounded-lg p-3 border border-border">
              <p className="text-sm whitespace-pre-wrap line-clamp-3">{e.content}</p>
              <div className="flex items-center gap-2 mt-2">
                {e.tags?.map((tag) => (
                  <span key={tag} className="text-[10px] bg-accent/20 text-accent-light px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
                {e.source && <span className="text-[10px] text-gray-500 ml-auto">{e.source}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
