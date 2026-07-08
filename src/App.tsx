import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import MobileMenu from '@/components/layout/MobileMenu'
import PageTransition from '@/components/layout/PageTransition'
import ToastContainer from '@/components/common/Toast'
import AppRoutes from '@/routes/AppRoutes'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />
      <main className="flex-1">
        <PageTransition>
          <AppRoutes />
        </PageTransition>
      </main>
      <Footer />
      <CartDrawer />
      <MobileMenu />
      <ToastContainer />
    </div>
  )
}
