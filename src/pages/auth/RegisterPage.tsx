import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User
} from 'lucide-react';

type RegisterPageProps = {
  onSignInClick?: () => void;
  onRegisterSuccess?: () => void;
};

const FEATURE_POINTS = [
  'Find collaborators by fit, not by who shouts the loudest.',
  'Create a profile that makes serious work feel easier to trust.',
  'Move from matching into a shared project workspace without switching tools.'
];

const STEP_ITEMS = [
  'Create your account',
  'Set your collaboration profile',
  'Start matching with aligned projects'
];

export function RegisterPage({ onSignInClick, onRegisterSuccess }: RegisterPageProps) {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordChecks = [
    { label: '8+ characters', valid: formData.password.length >= 8 },
    { label: 'Passwords match', valid: !!formData.password && formData.password === formData.confirmPassword },
    { label: 'Terms accepted', valid: acceptTerms }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const trimmedFullName = formData.fullName.trim();
    const trimmedUsername = formData.username.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();

    const newErrors: Record<string, string> = {};
    if (!trimmedFullName) newErrors.fullName = 'Full name is required';
    if (!trimmedUsername) newErrors.username = 'Username is required';
    if (trimmedUsername.length < 3) newErrors.username = 'Username must be at least 3 characters';
    if (!trimmedEmail) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(trimmedEmail)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!acceptTerms) newErrors.terms = 'You must accept the terms and conditions';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    console.log('Register:', {
      ...formData,
      fullName: trimmedFullName,
      username: trimmedUsername,
      email: trimmedEmail
    });

    setIsSubmitting(false);
    onRegisterSuccess?.();
  };

  const inputClassName = (hasError: boolean) =>
    `premium-input w-full rounded-2xl py-3 pl-14 pr-4 text-sm transition-colors ${hasError ? '!border-[var(--danger)]' : ''}`;

  return (
    <div className="premium-shell min-h-screen px-4 py-5 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
        <section className="premium-panel premium-grid relative overflow-hidden rounded-[36px] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(208,164,106,0.14),transparent_72%)] lg:block" />

          <div className="relative flex h-full flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[color:var(--bg-elevated)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                <Sparkles size={14} />
                Join Open Project
              </div>

              <h1 className="mt-6 max-w-3xl font-display text-[clamp(3.2rem,6vw,5.7rem)] leading-[0.92] text-[var(--text)]">
                Build a profile that feels credible before you even say hello.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-muted)]">
                Open Project is for thoughtful builders who want serious collaboration without marketplace noise, awkward cold outreach, or performative self-promotion.
              </p>
            </div>

            <div className="mt-10 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[30px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-5">
                <p className="premium-kicker mb-3">What You Get</p>
                <div className="space-y-4">
                  {FEATURE_POINTS.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-[rgba(91,191,167,0.12)] p-1 text-[var(--success)]">
                        <CheckCircle2 size={14} />
                      </div>
                      <p className="text-sm leading-7 text-[var(--text)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-[color:var(--accent-soft)] p-3 text-[var(--accent)]">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">Setup flow</p>
                    <p className="text-xs text-[var(--text-muted)]">Simple, trust-first, and fast</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {STEP_ITEMS.map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-[20px] border border-[var(--border)] bg-[color:var(--bg-panel)] px-3 py-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-xs font-semibold text-[var(--accent)]">
                        {index + 1}
                      </div>
                      <p className="text-sm text-[var(--text)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="premium-panel relative overflow-hidden rounded-[36px] p-5 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(208,164,106,0.12),transparent_40%)]" />

          <div className="relative">
            <div className="mb-8">
              <p className="premium-kicker mb-2">Create account</p>
              <h2 className="font-display text-4xl text-[var(--text)] sm:text-5xl">Sign up</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-[var(--text-muted)]">
                Create your account first. Then we’ll help you shape a profile that gets stronger collaboration matches.
              </p>
            </div>

            <div className="mb-6 rounded-[26px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-4">
              <div className="grid gap-2 sm:grid-cols-3">
                {passwordChecks.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                      item.valid ? 'bg-[rgba(91,191,167,0.12)] text-[var(--success)]' : 'bg-[color:var(--bg-muted)] text-[var(--text-muted)]'
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-[var(--text)]">
                    Full name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[var(--text-muted)]">
                      <User size={16} />
                    </div>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={inputClassName(!!errors.fullName)}
                      placeholder="Mahmudur Rahman"
                    />
                  </div>
                  {errors.fullName && <p className="mt-1 text-sm text-[var(--danger)]">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="username" className="mb-2 block text-sm font-medium text-[var(--text)]">
                    Username
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[var(--text-muted)]">
                      <User size={16} />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={inputClassName(!!errors.username)}
                      placeholder="rahman-alif"
                    />
                  </div>
                  {errors.username && <p className="mt-1 text-sm text-[var(--danger)]">{errors.username}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--text)]">
                  Email address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[var(--text-muted)]">
                    <Mail size={16} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClassName(!!errors.email)}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-[var(--danger)]">{errors.email}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-[var(--text)]">
                    Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[var(--text-muted)]">
                      <Lock size={16} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`premium-input w-full rounded-2xl py-3 pl-14 pr-12 text-sm transition-colors ${
                        errors.password ? '!border-[var(--danger)]' : ''
                      }`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-[var(--danger)]">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[var(--text)]">
                    Confirm password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[var(--text-muted)]">
                      <Lock size={16} />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`premium-input w-full rounded-2xl py-3 pl-14 pr-12 text-sm transition-colors ${
                        errors.confirmPassword ? '!border-[var(--danger)]' : ''
                      }`}
                      placeholder="Repeat your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-[var(--danger)]">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="rounded-[24px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked);
                      setErrors((prev) => {
                        if (!prev.terms) return prev;
                        const next = { ...prev };
                        delete next.terms;
                        return next;
                      });
                    }}
                    className="mt-1 h-4 w-4 rounded border-[var(--border-strong)] bg-white text-[var(--accent)] focus:ring-[var(--accent)]"
                  />
                  <span className="text-sm leading-6 text-[var(--text-muted)]">
                    I agree to the{' '}
                    <a href="/terms" className="font-medium text-[var(--accent)] hover:text-[var(--accent-strong)]">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="font-medium text-[var(--accent)] hover:text-[var(--accent-strong)]">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                {errors.terms && <p className="mt-2 text-sm text-[var(--danger)]">{errors.terms}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="premium-button inline-flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold transition-all"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
                {!isSubmitting && <ArrowRight size={16} />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSignInClick}
                className="font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)]"
              >
                Sign in
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
