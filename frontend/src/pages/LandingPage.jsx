import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Check, BarChart3, Link2, Shield, Zap, Globe, Users, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from "framer-motion";
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navs/Navbar';
import Navbar2 from './Navs/Navbar2';

export function LandingPage() {
  const [url, setUrl] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate relative position from center
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleQuickShorten = () => {
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    if (!user) {
      toast.info('Please login to shorten URLs');

      // Optional: store URL temporarily
      localStorage.setItem('pending_url', url);

      navigate('/login');
      return;
    }

    // If logged in → go to dashboard
    localStorage.setItem('pending_url', url);
    navigate('/dashboard');
  };

  // Floating animation variants
  const floatingAnimation = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingAnimation2 = {
    animate: {
      y: [0, 15, 0],
      x: [0, 10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50/30 to-white overflow-hidden">
      {/* Header */}
      {user? <Navbar2 />: <Navbar />}

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Parallax Background Layers - each moves at different speed */}

        {/* Layer 1: Slowest - Large blur circles */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
            scale: [1, 1.2, 1],
          }}
          transition={{
            x: { type: "spring", damping: 50, stiffness: 50 },
            y: { type: "spring", damping: 50, stiffness: 50 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute top-20 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
            scale: [1, 1.3, 1],
          }}
          transition={{
            x: { type: "spring", damping: 40, stiffness: 40 },
            y: { type: "spring", damping: 40, stiffness: 40 },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Layer 2: Medium speed - Mid-size orbs */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-2xl"
          animate={{
            x: mousePosition.x * -40,
            y: mousePosition.y * -40,
            rotate: [0, 180, 360],
          }}
          transition={{
            x: { type: "spring", damping: 30, stiffness: 60 },
            y: { type: "spring", damping: 30, stiffness: 60 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-gradient-to-br from-cyan-300/30 to-blue-300/30 rounded-full blur-2xl"
          animate={{
            x: mousePosition.x * 50,
            y: mousePosition.y * -50,
            rotate: [360, 180, 0],
          }}
          transition={{
            x: { type: "spring", damping: 25, stiffness: 70 },
            y: { type: "spring", damping: 25, stiffness: 70 },
            rotate: { duration: 15, repeat: Infinity, ease: "linear" }
          }}
        />

        {/* Layer 3: Fast - Small accent circles */}
        <motion.div
          className="absolute top-1/3 left-1/2 w-32 h-32 bg-gradient-to-br from-yellow-300/40 to-orange-300/40 rounded-full blur-xl"
          animate={{
            x: mousePosition.x * -80,
            y: mousePosition.y * 80,
          }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 100
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-green-300/40 to-emerald-300/40 rounded-full blur-xl"
          animate={{
            x: mousePosition.x * 70,
            y: mousePosition.y * -70,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 90
          }}
        />

        {/* Floating particles with varying parallax speeds */}
        {[...Array(12)].map((_, i) => {
          const speed = 30 + (i * 10); // Varying speeds from 30 to 140
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;

          return (
            <motion.div
              key={i}
              className="absolute size-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                opacity: 0.3 + (i * 0.05),
              }}
              animate={{
                y: [0, -100, 0],
                x: mousePosition.x * (i % 2 === 0 ? speed : -speed),
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                y: {
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                },
                x: {
                  type: "spring",
                  damping: 20 + (i * 2),
                  stiffness: 80 - (i * 3)
                },
                opacity: {
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }
              }}
            />
          );
        })}

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6 border border-blue-200"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="size-4" />
              </motion.div>
              Trusted by 500K+ users worldwide
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Shorten, Track & <motion.span
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                style={{ backgroundSize: '200% auto' }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Optimize
              </motion.span> Your Links
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed"
            >
              The most powerful URL shortener with advanced analytics, custom aliases, and enterprise-grade security.
            </motion.p>

            {/* Quick URL Shortener */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-blue-500/10 p-8 max-w-2xl mx-auto border border-gray-200/50"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="url"
                  placeholder="Enter your long URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 h-12 bg-white"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onClick={handleQuickShorten}
                    className="sm:w-auto w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30"
                  >
                    <Zap className="size-4 mr-2" />
                    Shorten Now
                  </Button>
                </motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-1"
              >
                <Shield className="size-4" />
                No credit card required • Free forever plan available
              </motion.p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              {[
                { value: '10M+', label: 'Links Created', gradient: 'from-blue-600 to-purple-600' },
                { value: '500K+', label: 'Active Users', gradient: 'from-purple-600 to-pink-600' },
                { value: '99.9%', label: 'Uptime', gradient: 'from-green-600 to-blue-600' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group cursor-pointer"
                >
                  <motion.div
                    className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4"
            >
              <Sparkles className="size-4" />
              Features
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to manage your links
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to help you grow your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Advanced Analytics',
                description: 'Track clicks, geographic data, device information, and referrer sources in real-time.',
                icon: BarChart3,
                gradient: 'from-blue-600 to-blue-700',
                borderColor: 'border-blue-100',
                bgGradient: 'from-blue-50 to-white',
                shadowColor: 'shadow-blue-500/10',
                items: ['Real-time click tracking', 'Geographic insights', 'Device analytics'],
                iconColor: 'text-blue-600'
              },
              {
                title: 'Custom Aliases',
                description: 'Create branded, memorable short links with custom aliases and domains.',
                icon: Zap,
                gradient: 'from-purple-600 to-purple-700',
                borderColor: 'border-purple-100',
                bgGradient: 'from-purple-50 to-white',
                shadowColor: 'shadow-purple-500/10',
                items: ['Branded short URLs', 'Custom domains', 'Bulk URL creation'],
                iconColor: 'text-purple-600'
              },
              {
                title: 'Secure Links',
                description: 'Enterprise-grade security with password protection and expiration dates.',
                icon: Shield,
                gradient: 'from-green-600 to-green-700',
                borderColor: 'border-green-100',
                bgGradient: 'from-green-50 to-white',
                shadowColor: 'shadow-green-500/10',
                items: ['Password protection', 'Link expiration', 'SSL encryption'],
                iconColor: 'text-green-600'
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group bg-gradient-to-br ${feature.bgGradient} p-8 rounded-2xl border ${feature.borderColor} hover:shadow-2xl ${feature.shadowColor} transition-all duration-300 cursor-pointer relative overflow-hidden`}
              >
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10"
                  animate={{
                    background: [
                      `radial-gradient(circle at 0% 0%, ${feature.gradient.includes('blue') ? '#3b82f6' : feature.gradient.includes('purple') ? '#8b5cf6' : '#10b981'} 0%, transparent 50%)`,
                      `radial-gradient(circle at 100% 100%, ${feature.gradient.includes('blue') ? '#3b82f6' : feature.gradient.includes('purple') ? '#8b5cf6' : '#10b981'} 0%, transparent 50%)`,
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />

                <motion.div
                  className={`size-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg ${feature.shadowColor}`}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="size-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.items.map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + idx * 0.05 + 0.3 }}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <Check className={`size-4 ${feature.iconColor}`} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4"
            >
              <TrendingUp className="size-4" />
              Pricing
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that's right for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:shadow-2xl hover:shadow-gray-500/10 transition-all duration-300"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <motion.div
                  className="text-5xl font-bold text-gray-900 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  $0
                </motion.div>
                <p className="text-gray-600">Forever free</p>
              </div>
              <ul className="space-y-3 mb-8">
                {['100 links per month', 'Basic analytics', 'Standard support', '7-day link history'].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <Check className="size-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link to="/signup" className="block">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="w-full hover:bg-gray-50">Get Started</Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl shadow-purple-500/30"
            >
              <motion.div
                className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                POPULAR
              </motion.div>
              {/* Decorative gradient orbs */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.3, 1], rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              <div className="text-center mb-6 relative z-10">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <motion.div
                  className="text-5xl font-bold mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  $19
                </motion.div>
                <p className="text-blue-100">per month</p>
              </div>
              <ul className="space-y-3 mb-8 relative z-10">
                {['Unlimited links', 'Advanced analytics', 'Custom aliases', 'Priority support', 'Unlimited history', 'Custom domains'].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <Check className="size-5 text-white flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link to="/signup" className="block relative z-10">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="secondary" className="w-full bg-white text-purple-600 hover:bg-gray-50 font-bold shadow-xl">
                    Upgrade to Pro
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  className="size-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Link2 className="size-5 text-white" />
                </motion.div>
                <span className="font-bold text-xl text-white">LinkShort</span>
              </div>
              <p className="text-sm text-gray-400">
                The most powerful URL shortener for modern teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2026 LinkShort. All rights reserved.
            </p>
            <div className="flex gap-6">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Globe className="size-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Users className="size-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}