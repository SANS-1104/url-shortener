import { apiClient } from '../lib/api'
import { API_CONFIG } from '../config/constants'
import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Link2, TrendingUp, CheckCircle2, XCircle, Copy, QrCode, Calendar, Sparkles, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '../components/ui/Modal';
import { motion } from "framer-motion";
import { Confetti } from '../components/Confetti';

export function DashboardPage() {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createdUrl, setCreatedUrl] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [urls, setUrls] = useState([]);
  const [isLoadingUrls, setIsLoadingUrls] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const data = await apiClient.get("/urls/my", true);

        const normalized = data.map((url) => ({
          id: url.id,
          originalUrl: url.original_url,
          shortCode: url.short_code,
          shortUrl: `http://127.0.0.1:8000/${url.short_code}`,
          clicks: url.clicks ?? 0,
          createdAt: url.created_at,
          isActive: url.is_active,
        }));

        setUrls(normalized);
      } catch (err) {
        console.error("Failed to fetch URLs");
      } finally {
        setIsLoadingUrls(false);
      }
    };

    fetchUrls();
  }, []);


  const handleCreateShortUrl = async () => {
    if (!longUrl) {
      toast.error("Please enter a URL");
      return;
    }

    setIsCreating(true);

    try {
      const response = await apiClient.post(
        '/urls/shorten',
        {
          original_url: longUrl,
        },
        true // requiresAuth
      );

      const shortUrl = `${API_CONFIG.SHORT_DOMAIN || 'http://127.0.0.1:8000'}/${response.short_code}`;

      const newUrl = {
        id: response.id,
        originalUrl: response.original_url,
        shortCode: response.short_code,
        shortUrl: `http://127.0.0.1:8000/${response.short_code}`,
        clicks: response.clicks ?? 0,
        createdAt: response.created_at,
        isActive: response.is_active,
      };
      setShowConfetti(true);
      setLongUrl("");
      setCustomAlias("");
      setExpirationDate("");
      setUrls(prev => [newUrl, ...prev]);
      setCreatedUrl(newUrl);
    } catch (error) {
      toast.error("Failed to create short URL");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };
  const handleDeleteUrl = async (id) => {
    try {
      await apiClient.delete(`/urls/${id}`, true);
      setUrls(prev => prev.filter(url => url.id !== id));
      toast.success("URL deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const stats = [
    {
      title: 'Total Links',
      value: urls.length,
      change: '+12%',
      icon: Link2,
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600',
      lightBg: 'from-blue-50 to-blue-100',
    },
    {
      title: 'Total Clicks',
      value: '12,459',
      change: '+23%',
      icon: TrendingUp,
      color: 'green',
      bgGradient: 'from-green-500 to-green-600',
      lightBg: 'from-green-50 to-green-100',
    },
    {
      title: 'Active Links',
      value: '42',
      change: '-2',
      icon: CheckCircle2,
      color: 'purple',
      bgGradient: 'from-purple-500 to-purple-600',
      lightBg: 'from-purple-50 to-purple-100',
    },
    {
      title: 'Expired Links',
      value: '6',
      change: '+2',
      icon: XCircle,
      color: 'red',
      bgGradient: 'from-red-500 to-red-600',
      lightBg: 'from-red-50 to-red-100',
    },
  ];

  console.log(urls);


  return (
    <DashboardLayout>
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage and track your shortened URLs</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="size-4 text-purple-600" />
            </motion.div>
            <span className="text-sm font-medium text-gray-700">Pro Plan Active</span>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative cursor-pointer">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.lightBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <motion.p
                        className="text-3xl font-bold text-gray-900"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: index * 0.1 + 0.2 }}
                      >
                        {stat.value}
                      </motion.p>
                      <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                        <motion.div
                          animate={{ y: stat.change.startsWith('+') ? [-2, 2, -2] : [2, -2, 2] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowUpRight className={`size-4 ${stat.change.startsWith('+') ? '' : 'rotate-90'}`} />
                        </motion.div>
                        {stat.change} from last month
                      </div>
                    </div>
                    <motion.div
                      className={`size-14 rounded-xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.4 }}
                    >
                      <stat.icon className="size-7 text-white" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* URL Creation Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-lg border-gray-200/50">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <motion.div
                  className="size-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link2 className="size-5 text-white" />
                </motion.div>
                <div>
                  <CardTitle>Create Short URL</CardTitle>
                  <CardDescription>
                    Shorten your long URLs and track their performance
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Input
                  type="url"
                  label="Long URL"
                  placeholder="https://example.com/very-long-url"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  icon={<Link2 className="size-4" />}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    label="Custom Alias (Optional)"
                    placeholder="my-custom-link"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                  />

                  <Input
                    type="date"
                    label="Expiration Date (Optional)"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    icon={<Calendar className="size-4" />}
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleCreateShortUrl}
                    isLoading={isCreating}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg w-full sm:w-auto"
                  >
                    <Sparkles className="size-4 mr-2" />
                    Create Short URL
                  </Button>
                </motion.div>
              </div>

              {/* Success State */}
              {createdUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      className="size-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <CheckCircle2 className="size-6 text-white" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-green-900 mb-3 text-lg">URL Created Successfully!</h4>
                      <div className="space-y-3">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-xs font-medium text-green-700 mb-1">Original URL:</p>
                          <p className="text-sm text-green-900 truncate bg-white/50 px-3 py-2 rounded-lg">{createdUrl.originalUrl}</p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <p className="text-xs font-medium text-green-700 mb-1">Short URL:</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-green-900 truncate flex-1 bg-white/50 px-3 py-2 rounded-lg">
                              {createdUrl.shortUrl}
                            </p>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleCopyUrl(createdUrl.shortUrl)}
                                className="shadow-md"
                              >
                                <Copy className="size-4" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => setShowQRModal(true)}
                                className="shadow-md"
                              >
                                <QrCode className="size-4" />
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your most recently created short URLs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {urls.length === 0 && !isLoadingUrls && (
                  <p className="text-sm text-gray-500 text-center py-6">
                    No URLs created yet.
                  </p>
                )}

                {urls.slice(0, 5).map((url, index) => (
                  <motion.div
                    key={url.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-blue-600 mb-1 group-hover:text-blue-700">
                        {url.shortUrl}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {url.originalUrl}
                      </p>
                    </div>

                    <div className="text-right ml-4">
                      <motion.p
                        className="font-bold text-gray-900 text-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        clicks • {url.clicks}
                      </motion.p>
                      <p className="text-xs text-gray-500">
                        {" "}
                        {url.createdAt
                          ? new Date(url.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* QR Code Modal */}
      <Modal
        open={showQRModal}
        onOpenChange={setShowQRModal}
        title="QR Code"
        description="Scan this QR code to access your short URL"
      >
        <div className="flex justify-center py-8">
          <motion.div
            className="size-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-inner"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring" }}
          >
            <p className="text-gray-500 font-medium">QR Code Preview</p>
          </motion.div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => setShowQRModal(false)}>
            Close
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Download QR Code
            </Button>
          </motion.div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}