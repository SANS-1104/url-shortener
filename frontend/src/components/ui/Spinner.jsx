import React from 'react'
import { cn } from '../../lib/utils'

export function Spinner({ className, size = 'md' }) {
  const sizeClasses = {
    sm: 'size-4 border-2',
    md: 'size-8 border-3',
    lg: 'size-12 border-4',
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-blue-600 border-t-transparent',
        sizeClasses[size],
        className
      )}
    />
  )
}

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
