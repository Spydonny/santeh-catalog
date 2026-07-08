import { Link } from 'react-router-dom'
import { CompassIcon } from 'lucide-react'
import Button from '@/components/common/Button'

export default function NotFoundPage() {
  return (
    <div className="container-page flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <CompassIcon size={36} />
      </div>
      <h1 className="text-3xl font-bold text-slate-900">404</h1>
      <p className="max-w-sm text-slate-500">Страница не найдена. Возможно, товар был снят с продажи или ссылка устарела.</p>
      <Link to="/">
        <Button>На главную</Button>
      </Link>
    </div>
  )
}
