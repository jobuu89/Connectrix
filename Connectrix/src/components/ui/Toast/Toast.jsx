import React from 'react'
import { useToast } from '../../../contexts/ToastContext'

const Toast = ({ toast, onRemove }) => {
  const getToastStyles = (type) => {
    const baseStyles = 'flex items-center p-4 mb-4 text-sm rounded-lg shadow-lg transition-all duration-300'
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-100 text-green-800 border border-green-200`
      case 'error':
        return `${baseStyles} bg-red-100 text-red-800 border border-red-200`
      case 'warning':
        return `${baseStyles} bg-yellow-100 text-yellow-800 border border-yellow-200`
      default:
        return `${baseStyles} bg-blue-100 text-blue-800 border border-blue-200`
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      default:
        return 'ℹ'
    }
  }

  return (
    <div className={getToastStyles(toast.type)}>
      <div className="flex items-center">
        <span className="mr-3 text-lg">{getIcon(toast.type)}</span>
        <span className="flex-1">{toast.message}</span>
        <button
          onClick={() => onRemove(toast.id)}
          className="ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}

const ToastContainer = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
        />
      ))}
    </div>
  )
}

export default ToastContainer
