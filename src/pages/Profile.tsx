import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";

export default function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [user, setUser] = useState({
  name: "",
  email: "",
  phone: "",
  birthdate: "",
  gender: "",
  profilePic: "",
  });
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);

  // Load profile info from localStorage on mount
  useEffect(() => {
    const authEmail = localStorage.getItem('biogas_auth_user');
    if (authEmail) {
      const users = JSON.parse(localStorage.getItem('biogas_users') || '{}');
      const info = users[authEmail] || {};
      setUser({
        name: info.name || '',
        email: info.email || authEmail,
        phone: info.phone || '',
        birthdate: info.birthdate || '',
        gender: info.gender || '',
        profilePic: info.profilePic || '',
      });
      setForm({
        name: info.name || '',
        email: info.email || authEmail,
        phone: info.phone || '',
        birthdate: info.birthdate || '',
        gender: info.gender || '',
        profilePic: info.profilePic || '',
      });
    }
  }, []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePicClick = () => {
    if (edit) fileInputRef.current?.click();
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((prev) => ({ ...prev, profilePic: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(form);
    setEdit(false);
    // Save to localStorage
    const authEmail = localStorage.getItem('biogas_auth_user');
    if (authEmail) {
      const users = JSON.parse(localStorage.getItem('biogas_users') || '{}');
      users[authEmail] = {
        ...users[authEmail],
        ...form,
        email: authEmail // always keep email as key
      };
      localStorage.setItem('biogas_users', JSON.stringify(users));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-2 sm:px-4 space-y-6">
      <Card className="relative shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-100">
        <CardHeader className="flex flex-col items-center pt-8 pb-2">
          <CardTitle className="mb-4 text-2xl font-bold tracking-tight text-primary drop-shadow text-center w-full">Profile</CardTitle>
          <div className="relative flex flex-col items-center w-full mb-4">
            <div
              className={`relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden ${edit ? 'cursor-pointer group' : 'cursor-default opacity-70'}`}
              onClick={edit ? handleProfilePicClick : undefined}
              title={edit ? "Click to change profile picture" : undefined}
              tabIndex={edit ? 0 : -1}
              aria-disabled={!edit}
            >
              {form.profilePic || user.profilePic ? (
                <img
                  src={edit ? form.profilePic || user.profilePic : user.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="w-16 h-16 text-gray-400" />
              )}
              {edit && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleProfilePicChange}
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    Change Photo
                  </span>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col items-center gap-4 w-full" onSubmit={handleSave}>
            <div className="w-full flex flex-col gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Name</label>
                {edit ? (
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                ) : (
                  <div className="text-lg font-semibold text-gray-800 min-h-[2.5rem]">{user.name || <span className="text-gray-400">No name</span>}</div>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Email</label>
                {edit ? (
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                ) : (
                  <div className="text-gray-700 min-h-[2.5rem]">{user.email || <span className="text-gray-400">No email</span>}</div>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Contact Number</label>
                {edit ? (
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                ) : (
                  <div className="text-gray-700 min-h-[2.5rem]">{user.phone || <span className="text-gray-400">No number</span>}</div>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Birthdate</label>
                {edit ? (
                  <input
                    name="birthdate"
                    type="date"
                    value={form.birthdate}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                ) : (
                  <div className="text-gray-700 min-h-[2.5rem]">{user.birthdate || <span className="text-gray-400">No birthdate</span>}</div>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Gender</label>
                {edit ? (
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={e => setForm({ ...form, gender: e.target.value })}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <div className="text-gray-700 min-h-[2.5rem]">{user.gender || <span className="text-gray-400">No gender</span>}</div>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-4 w-full justify-center">
              {/* Edit Profile button removed as requested */}
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="w-full max-w-2xl mx-auto">
        <Card className="relative shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-100">
          <CardHeader className="flex flex-col items-center pt-6 pb-2">
            <CardTitle className="mb-2 text-lg font-bold tracking-tight text-primary drop-shadow text-center w-full">Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
              <Button
                type="button"
                className="w-full md:w-1/2 px-6 py-3 font-semibold text-primary bg-white hover:bg-primary hover:text-white border border-primary transition"
                onClick={() => setShowEmailModal(true)}
              >
                Change Email
              </Button>
              <Button
                type="button"
                className="w-full md:w-1/2 px-6 py-3 font-semibold text-primary bg-white hover:bg-primary hover:text-white border border-primary transition"
                onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </Button>
            </div>
            <div className="flex justify-center mt-6">
              <Button
                type="button"
                variant="destructive"
                className="w-full md:w-1/2 px-6 py-3 font-semibold border border-red-500 bg-red-500 text-white hover:bg-red-600 hover:border-red-600 transition"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Log Out
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Email Modal */}
        {showEmailModal && (
          <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md mx-auto flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4 text-primary">Change Email</h2>
                <form className="flex flex-col gap-3 w-full">
                  <label className="text-sm font-medium text-foreground">New Email</label>
                  <input
                    type="email"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter new email address"
                  />
                  <div className="flex gap-2 mt-4 justify-center">
                    <Button className="px-6">Save Email</Button>
                    <Button type="button" variant="secondary" onClick={() => setShowEmailModal(false)}>Cancel</Button>
                  </div>
                </form>
              </div>
            </div>
          </Dialog>
        )}
        {/* Password Modal */}
        {showPasswordModal && (
          <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md mx-auto flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4 text-primary">Change Password</h2>
                <form className="flex flex-col gap-3 w-full">
                  <label className="text-sm font-medium text-foreground">New Password</label>
                  <input
                    type="password"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter new password"
                  />
                  <label className="text-sm font-medium text-foreground">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Confirm new password"
                  />
                  <div className="flex gap-2 mt-4 justify-center">
                    <Button className="px-6">Save Password</Button>
                    <Button type="button" variant="secondary" onClick={() => setShowPasswordModal(false)}>Cancel</Button>
                  </div>
                </form>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
}
