import { useMemo, useState } from 'react'
import { products as allProducts } from '@/data/products'
import AdminToolbar from '@/components/admin/AdminToolbar'
import AdminTable from '@/components/admin/AdminTable'
import Modal from '@/components/common/Modal'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import type { Product } from '@/types'

export default function AdminPage() {
  const [query, setQuery] = useState('')
  const [demoModalOpen, setDemoModalOpen] = useState(false)

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return allProducts
    return allProducts.filter((product) => product.name.toLowerCase().includes(normalized))
  }, [query])

  const openDemoModal = (_product?: Product) => setDemoModalOpen(true)

  return (
    <div className="container-page py-8">
      <Breadcrumbs items={[{ label: 'Админ-панель' }]} />

      <div className="mt-4 mb-6">
        <AdminToolbar query={query} onQueryChange={setQuery} onAdd={() => openDemoModal()} total={filtered.length} />
      </div>

      <AdminTable products={filtered} onEdit={openDemoModal} onDelete={openDemoModal} />

      <Modal open={demoModalOpen} onClose={() => setDemoModalOpen(false)} title="Демо-версия">
        <p className="text-sm text-neutral-600">
          Демо-версия.
          <br />
          Функция появится в рабочей версии.
        </p>
      </Modal>
    </div>
  )
}
