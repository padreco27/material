import { useApp } from '../context/AppContext.jsx';
import { CheckCircle } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  return (
    <div className={`toast-notification ${toast ? 'visible' : ''}`}>
      <CheckCircle size={16} style={{ marginRight: 8 }} />
      {toast}
    </div>
  );
}
