import { useState, useCallback } from 'react'

export function useUrls() {
  const [urls, setUrls] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const createShortUrl = useCallback(async (
    originalUrl,
    customAlias,
    expirationDate
  ) => {
    setIsLoading(true)

    // Mock API call - replace with actual FastAPI endpoint
    // Example: POST /api/urls
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newUrl = {
      id: Math.random().toString(36).substring(7),
      originalUrl,
      shortUrl: `https://lnk.sh/${customAlias || Math.random().toString(36).substring(2, 8)}`,
      clicks: 0,
      createdDate: new Date().toISOString().split('T')[0],
      expiryDate: expirationDate || null,
      status: 'Active',
    }

    setUrls(prev => [newUrl, ...prev])
    setIsLoading(false)

    return newUrl
  }, [])

  const deleteUrl = useCallback(async (id) => {
    setIsLoading(true)

    // Mock API call - replace with actual FastAPI endpoint
    // Example: DELETE /api/urls/{id}
    await new Promise(resolve => setTimeout(resolve, 500))

    setUrls(prev => prev.filter(url => url.id !== id))
    setIsLoading(false)
  }, [])

  const updateUrl = useCallback(async (id, updates) => {
    setIsLoading(true)

    // Mock API call - replace with actual FastAPI endpoint
    // Example: PUT /api/urls/{id}
    await new Promise(resolve => setTimeout(resolve, 500))

    setUrls(prev =>
      prev.map(url =>
        url.id === id ? { ...url, ...updates } : url
      )
    )

    setIsLoading(false)
  }, [])

  return {
    urls,
    isLoading,
    createShortUrl,
    deleteUrl,
    updateUrl,
  }
}
