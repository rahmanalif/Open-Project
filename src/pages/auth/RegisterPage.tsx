import React, { useState } from 'react';
import { Command, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
type RegisterPageProps = {
  onSignInClick?: () => void;
};
export function RegisterPage({ onSignInClick }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8)
    newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword)
    newErrors.confirmPassword = 'Passwords do not match';
    if (!acceptTerms)
    newErrors.terms = 'You must accept the terms and conditions';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('Register:', formData);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0b] dark:to-[#141416] flex items-center justify-center p-4 transition-colors duration-200">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
              <Command size={20} className="text-white dark:text-gray-900" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Nexus
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Create your account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Start finding your perfect collaborators
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#141416] rounded-xl shadow-lg border border-gray-200 dark:border-[#27272a] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                Full name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={18} />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-[#3f3f46]'}`}
                  placeholder="Mahmudur Rahman" />

              </div>
              {errors.fullName &&
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.fullName}
                </p>
              }
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={18} />

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.username ? 'border-red-500' : 'border-gray-300 dark:border-[#3f3f46]'}`}
                  placeholder="rahman-alif" />

              </div>
              {errors.username &&
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.username}
                </p>
              }
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                Email address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={18} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-[#3f3f46]'}`}
                  placeholder="you@example.com" />

              </div>
              {errors.email &&
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              }
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={18} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2.5 border rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-[#3f3f46]'}`}
                  placeholder="••••••••" />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">

                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password &&
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              }
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                Confirm password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={18} />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2.5 border rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-[#3f3f46]'}`}
                  placeholder="••••••••" />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">

                  {showConfirmPassword ?
                  <EyeOff size={18} /> :

                  <Eye size={18} />
                  }
                </button>
              </div>
              {errors.confirmPassword &&
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword}
                </p>
              }
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 dark:border-[#3f3f46] rounded focus:ring-blue-500 bg-white dark:bg-[#0a0a0b]" />

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{' '}
                  <a
                    href="/terms"
                    className="text-blue-600 dark:text-blue-400 hover:underline">

                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="/privacy"
                    className="text-blue-600 dark:text-blue-400 hover:underline">

                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.terms &&
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.terms}
                </p>
              }
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm">

              Create account
            </button>
          </form>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSignInClick}
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline">

              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>);

}
