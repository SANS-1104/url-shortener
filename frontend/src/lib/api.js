import { API_CONFIG } from '../config/constants'

/**
 * API Client for FastAPI Backend
 * 
 * Usage:
 * 1. Set API_CONFIG.USE_MOCK = false in constants.js
 * 2. Set API_CONFIG.BASE_URL to your FastAPI backend URL
 * 3. Replace mock responses in your context/hooks with actual API calls
 */

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  getHeaders(requiresAuth = false) {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (requiresAuth) {
      const token = localStorage.getItem(API_CONFIG.TOKEN_KEY)
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    return headers
  }

  async request(endpoint, options = {}) {
    const { requiresAuth = false, ...fetchOptions } = options

    const url = `${this.baseUrl}${endpoint}`
    const headers = this.getHeaders(requiresAuth)

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          ...headers,
          ...(fetchOptions.headers || {}),
        },
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(
          error.message || `HTTP ${response.status}: ${response.statusText}`
        )
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('An unexpected error occurred')
    }
  }

  async get(endpoint, requiresAuth = false) {
    return this.request(endpoint, {
      method: 'GET',
      requiresAuth,
    })
  }

  async post(endpoint, data, requiresAuth = false) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      requiresAuth,
    })
  }

  async put(endpoint, data, requiresAuth = false) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      requiresAuth,
    })
  }

  async delete(endpoint, requiresAuth = false) {
    return this.request(endpoint, {
      method: 'DELETE',
      requiresAuth,
    })
  }

  async postForm(endpoint, formData) {
  const url = `${this.baseUrl}${endpoint}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(formData),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.detail || 'Login failed')
  }

  return await response.json()
}

}

// Export singleton instance
export const apiClient = new ApiClient(API_CONFIG.BASE_URL)

/**
 * Example usage in your components/contexts:
 * 
 * // Login
 * const response = await apiClient.post('/auth/login', { email, password })
 * 
 * // Get URLs (requires auth)
 * const urls = await apiClient.get('/urls', true)
 * 
 * // Create URL (requires auth)
 * const newUrl = await apiClient.post('/urls', { originalUrl, customAlias }, true)
 * 
 * // Update URL (requires auth)
 * const updated = await apiClient.put(`/urls/${id}`, { customAlias }, true)
 * 
 * // Delete URL (requires auth)
 * await apiClient.delete(`/urls/${id}`, true)
 */
