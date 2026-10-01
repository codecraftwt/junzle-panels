import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function EyeToggle({ visible, onPress }) {
  return (
    <button
      type="button"
      className="authEyeToggleBtn"
      onClick={onPress}
      title={visible ? 'Hide password' : 'Show password'}
      tabIndex={-1}
    >
      {visible ? <EyeOff size={18} color="#64748B" /> : <Eye size={18} color="#64748B" />}
    </button>
  );
}
