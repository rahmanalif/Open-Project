import React, { useEffect, useState, useRef } from 'react';
import { Command, CheckCircle2 } from 'lucide-react';
type VerificationPageProps = {
  onContinueClick?: () => void;
};
export function VerificationPage({ onContinueClick }: VerificationPageProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    const newCode = pastedData.split('');
    setCode([...newCode, ...Array(6 - newCode.length).fill('')]);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };
  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      console.log('Verify code:', fullCode);
      setVerified(true);
    }
  };
  const handleResend = () => {
    console.log('Resend code');
    setCountdown(60);
    setCanResend(false);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };
  if (verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0b] dark:to-[#141416] flex items-center justify-center p-4 transition-colors duration-200">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-[#141416] rounded-xl shadow-lg border border-gray-200 dark:border-[#27272a] p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2
                className="text-green-600 dark:text-green-400"
                size={32} />

            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Email verified!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your email has been successfully verified. You can now access your
              account.
            </p>
            <button
              type="button"
              onClick={onContinueClick}
              className="inline-block w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm">

              Continue to dashboard
            </button>
          </div>
        </div>
      </div>);

  }
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
            Verify your email
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            We sent a 6-digit code to <strong>your@email.com</strong>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#141416] rounded-xl shadow-lg border border-gray-200 dark:border-[#27272a] p-8">
          <div className="space-y-6">
            {/* Code Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                Enter verification code
              </label>
              <div className="flex gap-2 justify-center">
                {code.map((digit, index) =>
                <input
                  key={index}
                  ref={(el) => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-14 text-center text-xl font-bold border border-gray-300 dark:border-[#3f3f46] rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />

                )}
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={code.join('').length !== 6}
              className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">

              Verify
            </button>

            {/* Resend */}
            <div className="text-center">
              {canResend ?
              <button
                onClick={handleResend}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">

                  Resend code
                </button> :

              <p className="text-sm text-gray-500 dark:text-gray-400">
                  Resend code in{' '}
                  <span className="font-medium">{countdown}s</span>
                </p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>);

}
