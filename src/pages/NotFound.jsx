import { Link } from 'react-router-dom'
import Icon from '../components/ui/Icon.jsx'
import { Button } from '../components/ui/primitives.jsx'

export default function NotFound() {
  return (
    <div className="grid place-items-center py-20 text-center">
      <Icon name="compass" size={48} className="text-ink-faint" />
      <h1 className="mt-4 text-2xl font-bold">Không tìm thấy nội dung</h1>
      <p className="mt-1 text-ink-soft">Trang hoặc bài học bạn tìm không tồn tại.</p>
      <Button as={Link} to="/" className="mt-5">
        <Icon name="home" size={16} /> Về trang chủ
      </Button>
    </div>
  )
}
