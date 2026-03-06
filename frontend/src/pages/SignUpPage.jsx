import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Link2, Mail, Lock, User, Sparkles, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
const [errors, setErrors] = useState({})

const { signup } = useAuth()
const navigate = useNavigate()

const validate = () => {
  const newErrors = {}

  if (!name.trim()) {
    newErrors.name = 'Name is required'
  }

  if (!email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = 'Invalid email format'
  }

  if (!password) {
    newErrors.password = 'Password is required'
  } else if (password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters'
  }

  if (password !== confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}


const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validate()) {
    return
  }

  setIsLoading(true)

  try {
    await signup(name, email, password)
    toast.success('Account created successfully!')
    navigate('/dashboard')
  } catch (err) {
    toast.error('Failed to create account. Please try again.')
  } finally {
    setIsLoading(false)
  }
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="size-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
              <Link2 className="size-7 text-white" />
            </div>
            <span className="font-bold text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">LinkShort</span>
          </Link>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="size-4 text-blue-600" />
            <p className="text-gray-600">Create your account and start shortening URLs</p>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-purple-500/10 border border-gray-200/50 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 border border-green-200 rounded-full">
              <Shield className="size-3.5 text-green-600" />
              <span className="text-xs font-semibold text-green-700">Free Forever</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="size-4" />}
              error={errors.name}
              required
            />

            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="size-4" />}
              error={errors.email}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="size-4" />}
              error={errors.password}
              required
            />

            <Input
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock className="size-4" />}
              error={errors.confirmPassword}
              required
            />

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30" 
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors">
                Login here
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          By signing up, you agree to our{' '}
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}