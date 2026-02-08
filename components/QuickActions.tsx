'use client'

const actions = [
  { label: 'New Task', icon: '➕', color: 'bg-violet-600 hover:bg-violet-500' },
  { label: 'Log Activity', icon: '📝', color: 'bg-blue-600 hover:bg-blue-500' },
  { label: 'Add Memory', icon: '🧠', color: 'bg-pink-600 hover:bg-pink-500' },
  { label: 'Sync Data', icon: '🔄', color: 'bg-emerald-600 hover:bg-emerald-500' },
]

export default function QuickActions() {
  return (
    <div className="bg-surface rounded-xl border border-border p-5 md:col-span-2">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((a) => (
          <button
            key={a.label}
            className={`${a.color} rounded-lg px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 justify-center`}
          >
            <span>{a.icon}</span> {a.label}
          </button>
        ))}
      </div>
    </div>
  )
}
