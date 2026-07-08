import { create } from 'zustand'
import type { ToastMessage, ToastVariant } from '@/types'

interface UIState {
  cartDrawerOpen: boolean
  mobileMenuOpen: boolean
  toasts: ToastMessage[]
  openCartDrawer: () => void
  closeCartDrawer: () => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  showToast: (text: string, variant?: ToastVariant) => void
  dismissToast: (id: string) => void
}

export const useUIStore = create<UIState>()((set) => ({
  cartDrawerOpen: false,
  mobileMenuOpen: false,
  toasts: [],
  openCartDrawer: () => set({ cartDrawerOpen: true }),
  closeCartDrawer: () => set({ cartDrawerOpen: false }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  showToast: (text, variant = 'success') =>
    set((state) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      return { toasts: [...state.toasts, { id, text, variant }] }
    }),
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}))
