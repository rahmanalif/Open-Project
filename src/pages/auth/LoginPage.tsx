import React, { useState } from 'react';
import { Command, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
type LoginPageProps = {
  onForgotPasswordClick?: () => void;
  onRegisterClick?: () => void;
  onLoginSuccess?: () => void;
};
export function LoginPage({
  onForgotPasswordClick,
  onRegisterClick,
  onLoginSuccess
}: LoginPageProps) {
  const blurvisionAscii = String.raw`
 ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓████████▓▒░▒▓███████▓▒░       ░▒▓███████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░       ░▒▓█▓▒░▒▓████████▓▒░▒▓██████▓▒░▒▓████████▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░        ░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓██████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓███████▓▒░░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓██████▓▒░░▒▓█▓▒░        ░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░        ░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░
 ░▒▓██████▓▒░░▒▓█▓▒░      ░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓████████▓▒░▒▓██████▓▒░  ░▒▓█▓▒░
`;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Mock login - in real app, would call API
    console.log('Login:', {
      email,
      password,
      rememberMe
    });
    onLoginSuccess?.();
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
          </div>
          <div className="mb-4 overflow-hidden">
            <pre className="mx-auto text-[clamp(3px,0.58vw,5px)] leading-[1.1] font-mono text-gray-900 dark:text-white whitespace-pre">
              {blurvisionAscii}
            </pre>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#141416] rounded-xl shadow-lg border border-gray-200 dark:border-[#27272a] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 dark:border-[#3f3f46] rounded focus:ring-blue-500 bg-white dark:bg-[#0a0a0b]" />

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">

                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm">

              Sign in
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onRegisterClick}
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline">

              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>);

}
