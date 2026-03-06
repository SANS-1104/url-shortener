import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api'
import { API_CONFIG, APP_CONFIG } from "../config/constants";
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import {
  Search,
  Filter,
  Edit,
  Trash2,
  BarChart3,
  Copy,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

export function MyUrlsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState(null);
  const [urls, setUrls] = useState([]);
  const [isLoadingUrls, setIsLoadingUrls] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const data = await apiClient.get("/urls/my", true);
        // console.log("data fetched : ", data);


        const normalized = data.map((url) => {
          const createdAt = url.created_at
            ? new Date(url.created_at)
            : null;

          return {
            id: url.id,
            originalUrl: url.original_url,
            shortCode: url.short_code,
            clicks: url.clicks || 0,
            createdDate:
              createdAt && !isNaN(createdAt)
                ? createdAt.toLocaleDateString()
                : "N/A",
            expiryDate: url.valid_till,
            is_active: url.is_active,
          };
        });

        setUrls(normalized);
      } catch (err) {
        console.error("Failed to fetch URLs");
      } finally {
        setIsLoadingUrls(false);
      }
    };

    fetchUrls();
  }, []);


  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "N/A";

    return date.toLocaleDateString();
  };
  // console.log(urls)
  const filteredUrls = urls
    .map(url => ({
      ...url,
      shortUrl: `${APP_CONFIG.SHORT_DOMAIN}/${url.shortCode}`,
      status: url.is_active ? "Active" : "Inactive",
    }))
    .filter(url => {
      const matchesSearch =
        url.originalUrl?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        url.shortUrl.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filterStatus === "all" ||
        url.status.toLowerCase() === filterStatus;

      return matchesSearch && matchesFilter;
    });

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };

  const handleDelete = (url) => {
    setUrlToDelete(url);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!urlToDelete) return;

    try {
      await apiClient.delete(`/urls/${urlToDelete.id}`, true);

      setUrls(prev =>
        prev.filter(url => url.id !== urlToDelete.id)
      );

      toast.success("URL deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete URL");
    } finally {
      setDeleteModalOpen(false);
      setUrlToDelete(null);
    }
  };

  // console.log("filtered urls: ", filteredUrls);


  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My URLs</h1>
          <p className="text-gray-600 mt-1">Manage all your shortened URLs</p>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search URLs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="size-4" />}
                  className="bg-white"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="h-10 px-4 rounded-xl border-2 border-gray-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">InActive</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}


        {filteredUrls.length > 0 ? (
          <Card className="shadow-lg">
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Original URL
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Short URL
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Clicks
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Expiry
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUrls.map((url) => (
                      <tr key={url.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900 truncate max-w-xs font-medium" title={url.originalUrl}>
                              {url.originalUrl}
                            </span>
                            <button
                              onClick={() => window.open(url.originalUrl, '_blank')}
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <ExternalLink className="size-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-blue-600">{url.shortUrl}</span>
                            <button
                              onClick={() => handleCopy(`${url.shortUrl}`)}
                              className="text-gray-400 hover:text-green-600 transition-colors"
                            >
                              <Copy className="size-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-gray-900">{url.clicks.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{url.createdDate}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{url.expiryDate || 'Never'}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${url.status === 'Active'
                                ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300'
                                : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300'
                              }`}
                          >
                            {url.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                              <Edit className="size-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(url)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                            >
                              <Trash2 className="size-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200">
                              <BarChart3 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden divide-y divide-gray-200">
                {filteredUrls.map((url) => (
                  <div key={url.id} className="p-4 space-y-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-blue-600 mb-1">{url.shortUrl}</p>
                        <p className="text-sm text-gray-600 truncate">{url.originalUrl}</p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${url.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {url.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Clicks:</span>
                        <span className="ml-2 font-bold text-gray-900">{url.clicks.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Created:</span>
                        <span className="ml-2 text-gray-700">{url.createdDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 hover:bg-blue-50">
                        <Edit className="size-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 hover:bg-red-50" onClick={() => handleDelete(url)}>
                        <Trash2 className="size-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 hover:bg-purple-50">
                        <BarChart3 className="size-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleCopy(`${url.shortUrl}`)} className="hover:bg-green-50">
                        <Copy className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="max-w-sm mx-auto">
                <div className="size-20 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="size-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No URLs found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || filterStatus !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : "You haven't created any short URLs yet"}
                </p>
                {!searchQuery && filterStatus === 'all' && (
                  <Button
                    onClick={() => window.location.href = '/dashboard'}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  >
                    Create Your First URL
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {filteredUrls.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">{filteredUrls.length}</span> of{' '}
              <span className="font-medium">{filteredUrls.length}</span> results
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="size-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete URL"
        description="Are you sure you want to delete this short URL? This action cannot be undone."
      >
        {urlToDelete && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Short URL:</p>
              <p className="font-medium text-gray-900">{urlToDelete.shortUrl}</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete URL
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}