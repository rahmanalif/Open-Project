import React, { useState } from 'react';
import { Command, Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
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
    <div className="premium-shell flex min-h-screen items-center justify-center p-4 transition-colors duration-200">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="hidden lg:block">
          <p className="premium-kicker mb-3">Welcome Back</p>
          <h1 className="max-w-2xl font-display text-6xl leading-none text-[var(--text)]">
            Serious collaboration starts with a calmer first step.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--text-muted)]">
            Open Project helps creative and technical builders find aligned teammates without the noise, pressure, or performative pitch culture.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="premium-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <ShieldCheck size={16} className="text-[var(--success)]" />
              Trustworthy matching
            </div>
            <div className="premium-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Command size={16} className="text-[var(--accent)]" />
              Practical workspace tools
            </div>
          </div>
          <div className="mt-8 overflow-x-auto">
            <pre className="min-w-max text-[clamp(3px,0.42vw,5px)] leading-[1.1] font-mono text-[color:var(--text-muted)] whitespace-pre">
              {blurvisionAscii}
            </pre>
          </div>
        </div>

        <div className="premium-panel w-full rounded-[34px] p-5 sm:p-8">
          <div className="mb-8 text-center lg:text-left">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--accent-soft)] text-[var(--accent)]">
              <Command size={22} />
            </div>
            <h1 className="font-display text-4xl text-[var(--text)]">Sign in</h1>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              Continue into your collaboration dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[var(--text)]">

                Email address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  size={18} />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`premium-input w-full rounded-2xl py-3 pl-10 pr-4 transition-colors ${errors.email ? '!border-red-500' : ''}`}
                  placeholder="you@example.com" />

              </div>
              {errors.email &&
              <p className="mt-1 text-sm text-[var(--danger)]">
                  {errors.email}
                </p>
              }
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[var(--text)]">

                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  size={18} />

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`premium-input w-full rounded-2xl py-3 pl-10 pr-12 transition-colors ${errors.password ? '!border-red-500' : ''}`}
                  placeholder="••••••••" />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)]">

                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password &&
              <p className="mt-1 text-sm text-[var(--danger)]">
                  {errors.password}
                </p>
              }
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[var(--border-strong)] bg-white text-[var(--accent)] focus:ring-[var(--accent)]" />

                <span className="text-sm text-[var(--text-muted)]">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-left text-sm font-medium text-[var(--accent)] hover:underline sm:text-right">

                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="premium-button w-full rounded-2xl py-3 font-medium transition-all">

              Sign in
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onRegisterClick}
              className="font-medium text-[var(--accent)] hover:underline">

              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>);

}
