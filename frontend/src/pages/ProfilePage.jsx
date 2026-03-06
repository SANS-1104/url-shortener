import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { User, Mail, Lock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

const handleUpdateProfile = async (e) => {
  e.preventDefault()
  setIsUpdatingProfile(true)

  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  toast.success('Profile updated successfully!')
  setIsUpdatingProfile(false)
}

const handleChangePassword = async (e) => {
  e.preventDefault()

  if (newPassword !== confirmPassword) {
    toast.error('Passwords do not match')
    return
  }

  if (newPassword.length < 8) {
    toast.error('Password must be at least 8 characters')
    return
  }

  setIsChangingPassword(true)

  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  toast.success('Password changed successfully!')
  setIsChangingPassword(false)
  setCurrentPassword('')
  setNewPassword('')
  setConfirmPassword('')
}


  const handleDeleteAccount = async () => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Account deleted successfully');
    // In a real app, this would logout and redirect
    setDeleteModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        {/* Profile Picture */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="size-24 rounded-full bg-gray-200 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">Change</span>
                </div>
              </div>
              <div>
                <Button variant="outline" className="mb-2 hover:bg-blue-50">Upload New Picture</Button>
                <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <CardTitle>Name </CardTitle> 
              <Input
                type="text"
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User className="size-4" />}
                required
              />
              <CardTitle>Email </CardTitle> 
              <Input
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="size-4" />}
                required
              />

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  isLoading={isUpdatingProfile}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                type="password"
                label="Current Password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                icon={<Lock className="size-4" />}
                required
              />

              <Input
                type="password"
                label="New Password"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                icon={<Lock className="size-4" />}
                required
              />

              <Input
                type="password"
                label="Confirm New Password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock className="size-4" />}
                required
              />

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  isLoading={isChangingPassword}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
                  Change Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <div>
                <p className="font-semibold text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive email updates about your links</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <div>
                <p className="font-semibold text-gray-900">Link Analytics</p>
                <p className="text-sm text-gray-600">Track detailed analytics for your links</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <div>
                <p className="font-semibold text-gray-900">API Access</p>
                <p className="text-sm text-gray-600">Enable API access for integrations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-2 border-red-300 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b-2 border-red-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-red-600" />
              <CardTitle className="text-red-700">Danger Zone</CardTitle>
            </div>
            <CardDescription className="text-red-600">Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between p-5 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border-2 border-red-300">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="size-5 text-red-600" />
                  <h4 className="font-bold text-red-900">Delete Account</h4>
                </div>
                <p className="text-sm text-red-700 font-medium">
                  Once you delete your account, there is no going back. All your data will be permanently deleted.
                </p>
              </div>
              <Button 
                variant="danger" 
                className="ml-4 flex-shrink-0 shadow-lg"
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Account Modal */}
      <Modal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete Account"
        description="Are you absolutely sure? This action cannot be undone."
      >
        <div className="space-y-4">
          <div className="p-5 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl">
            <div className="flex gap-3">
              <AlertTriangle className="size-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-900 mb-2">Warning</h4>
                <p className="text-sm text-red-700 mb-2 font-medium">
                  Deleting your account will:
                </p>
                <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                  <li>Permanently delete all your shortened URLs</li>
                  <li>Remove all analytics data</li>
                  <li>Cancel any active subscriptions</li>
                  <li>Delete your account information</li>
                </ul>
              </div>
            </div>
          </div>

          <Input
            type="text"
            label='Type "DELETE" to confirm'
            placeholder="DELETE"
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount} className="shadow-lg">
              I understand, delete my account
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}