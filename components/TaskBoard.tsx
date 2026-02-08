'use client'

import { useState, useEffect } from 'react'
import { supabase, Task } from '@/lib/supabase'

const columns = [
  { key: 'todo' as const, label: 'To Do', color: 'border-gray-500' },
  { key: 'in_progress' as const, label: 'In Progress', color: 'border-yellow-500' },
  { key: 'done' as const, label: 'Done', color: 'border-emerald-500' },
]

const priorityBadge: Record<string, string> = {
  urgent: 'bg-red-500/20 text-red-400',
  high: 'bg-orange-500/20 text-orange-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  low: 'bg-gray-500/20 text-gray-400',
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const load = async () => {
    const { data } = await supabase.from('tasks').select('*').order('created_at', { ascending: false })
    if (data) setTasks(data)
  }

  useEffect(() => { load() }, [])

  const addTask = async () => {
    if (!newTitle.trim()) return
    await supabase.from('tasks').insert({ title: newTitle.trim(), status: 'todo', priority: 'medium' })
    setNewTitle('')
    setAdding(false)
    load()
  }

  const moveTask = async (id: string, status: Task['status']) => {
    await supabase.from('tasks').update({ status, updated_at: new Date().toISOString() }).eq('id', id)
    load()
  }

  const deleteTask = async (id: string) => {
    await supabase.from('tasks').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Task Board</h2>
        <button
          onClick={() => setAdding(!adding)}
          className="text-sm bg-accent hover:bg-accent-light px-3 py-1.5 rounded-lg transition-colors"
        >
          + Add Task
        </button>
      </div>

      {adding && (
        <div className="bg-surface border border-border rounded-lg p-3 mb-4 flex gap-2">
          <input
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Task title..."
            className="flex-1 bg-surface-lighter border border-border rounded px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <button onClick={addTask} className="bg-accent px-4 py-2 rounded text-sm font-medium">Add</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col.key} className={`bg-surface rounded-xl border-t-2 ${col.color} border border-border p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">{col.label}</h3>
              <span className="text-xs text-gray-500 bg-surface-lighter px-2 py-0.5 rounded-full">
                {tasks.filter((t) => t.status === col.key).length}
              </span>
            </div>
            <div className="space-y-2">
              {tasks
                .filter((t) => t.status === col.key)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-surface-light rounded-lg p-3 border border-border hover:border-accent/50 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-medium">{task.title}</span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${priorityBadge[task.priority]}`}>
                        {task.priority}
                      </span>
                      <div className="flex gap-1 ml-auto">
                        {columns
                          .filter((c) => c.key !== col.key)
                          .map((c) => (
                            <button
                              key={c.key}
                              onClick={() => moveTask(task.id, c.key)}
                              className="text-[10px] text-gray-500 hover:text-white bg-surface-lighter px-1.5 py-0.5 rounded transition-colors"
                            >
                              → {c.label}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
