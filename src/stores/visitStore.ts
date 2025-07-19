import { create } from 'zustand'
import { visitAdd, visitData } from '@/api/visit.api.ts'

interface VisitState {
  total: number
  today: number
  fetchStats: () => Promise<void>
  updateCount: () => Promise<void>
}

export const useVisitStore = create<VisitState>((set) => ({
  total: 0,
  today: 0,
  fetchStats: async () => {
    try {
      await visitAdd()
      const data = await visitData()
      set({
        total: data.total ?? 0,
        today: data.today ?? 0,
      })
    } catch (err) {
      console.error('Failed to fetch visit stats:', err)
    }
  },
  updateCount: async () => {
    try {
      const data = await visitData()
      set({
        total: data.total ?? 0,
        today: data.today ?? 0,
      })
    } catch (err) {
      console.error('Failed to fetch visit stats:', err)
    }
  },
}))
