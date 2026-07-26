'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '@/components/sections/page-hero';
import { Button } from '@/components/ui/button-link';
import { siteConfig } from '@/data/site';
import { trainingPrograms } from '@/data/training';
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  phone: string;
  trainingProgramme: string;
}

export default function TrainingApplyPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    trainingProgramme: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Please enter your phone number';
    if (!formData.trainingProgramme) newErrors.trainingProgramme = 'Please select a training programme';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/training', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setReferenceNumber(data.referenceNumber);
      setEmailSent(data.emailSent || false);
      setStatus('success');
    } catch (err) {
      console.error('Training application error:', err);
      setStatus('error');
    }
  };

  const handleCopyReference = () => {
    if (referenceNumber) {
      navigator.clipboard.writeText(referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setFormData({ name: '', email: '', phone: '', trainingProgramme: '' });
    setReferenceNumber('');
    setEmailSent(false);
    setCopied(false);
  };

  // Success screen
  if (status === 'success') {
    return (
      <>
        <PageHero
          label="Training Application"
          title="Application Submitted."
          image="/images/about-1.jpg"
        />
        <section className="py-24 md:py-32 bg-ivory min-h-[50vh] flex items-center">
          <div className="container-narrow text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-display text-4xl md:text-5xl font-medium text-charcoal mb-4"
            >
              Your training application has been submitted successfully.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-charcoal/60 text-lg max-w-lg mx-auto mb-8"
            >
              Please save your application reference number. You will need it for all future correspondence.
            </motion.p>

            {/* Reference Number Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white border border-charcoal/10 rounded-2xl p-8 max-w-md mx-auto mb-10 shadow-sm"
            >
              <p className="text-xs uppercase tracking-editorial text-charcoal/40 mb-3">
                Application Reference Number
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="font-display text-3xl md:text-4xl font-bold text-orange-600 tracking-wider">
                  {referenceNumber}
                </span>
                <button
                  onClick={handleCopyReference}
                  className="p-2 rounded-lg hover:bg-charcoal/5 transition-colors"
                  aria-label="Copy reference number"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-charcoal/40 hover:text-charcoal" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-charcoal text-white rounded-2xl p-8 max-w-lg mx-auto mb-10 text-left"
            >
              <h3 className="font-display text-xl font-medium mb-4 text-orange-400">
                Next Steps
              </h3>
              <ol className="space-y-3">
                {[
                  'Visit our office to complete the official registration process',
                  'Make payment at the office',
                  'Bring your reference number: ' + referenceNumber,
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-orange-400 text-xs font-bold">{i + 1}</span>
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-xs text-white/50">
                  <strong className="text-white/80">Our Office:</strong> Kasoa, Adam Nana Bus Stop, off Obom Road
                </p>
              </div>
            </motion.div>

            {/* Email status */}
            {emailSent && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-sm text-green-600 mb-6"
              >
                A confirmation email has been sent to {formData.email}.
              </motion.p>
            )}

            {!emailSent && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-sm text-charcoal/50 mb-6"
              >
                Your application was saved successfully. Please save your reference number above.
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp Now
              </a>
              <button
                onClick={resetForm}
                className="group inline-flex items-center gap-2 border border-charcoal/20 text-charcoal hover:bg-charcoal/5 px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 justify-center"
              >
                Submit Another Application
              </button>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        label="ABL Fashion Training Academy"
        title="Apply for Training."
        description="Submit your application online, then visit our office to complete registration and payment."
        image="/images/about-1.jpg"
      />

      <section className="pt-16 pb-32 md:pt-24 md:pb-40 bg-ivory border-b border-charcoal/10">
        <div className="container-wide max-w-2xl">
          <div className="bg-white border border-charcoal/10 rounded-2xl p-6 md:p-10 shadow-sm">
            <div className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-medium text-charcoal mb-2">
                Start Your Fashion Journey
              </h2>
              <p className="text-charcoal/50 text-sm">
                Complete the form below to apply for a training programme. After submitting, visit our office to finalize your enrollment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <FormField
                label="Full Name"
                required
                value={formData.name}
                onChange={(v) => updateField('name', v)}
                error={errors.name}
                placeholder="Your full name"
              />

              {/* Email */}
              <FormField
                label="Email Address"
                type="email"
                required
                value={formData.email}
                onChange={(v) => updateField('email', v)}
                error={errors.email}
                placeholder="your@email.com"
              />

              {/* Phone */}
              <FormField
                label="Phone Number"
                required
                value={formData.phone}
                onChange={(v) => updateField('phone', v)}
                error={errors.phone}
                placeholder="05XXXXXXXX"
              />

              {/* Training Programme */}
              <div>
                <label className="block text-xs uppercase tracking-editorial font-body font-medium text-charcoal/70 mb-3">
                  Training Programme <span className="text-orange-500">*</span>
                </label>
                <div className="space-y-2">
                  {trainingPrograms.map((program) => (
                    <button
                      key={program.id}
                      type="button"
                      onClick={() => updateField('trainingProgramme', program.title)}
                      className={cn(
                        'w-full text-left px-4 py-3.5 text-sm rounded-lg border transition-all duration-300',
                        formData.trainingProgramme === program.title
                          ? 'bg-charcoal text-white border-charcoal'
                          : 'bg-ivory/50 text-charcoal/70 border-charcoal/15 hover:border-charcoal/30'
                      )}
                    >
                      <span className="font-medium">{program.duration}</span>
                      <span className="text-xs ml-2 opacity-60">— {program.title}</span>
                    </button>
                  ))}
                </div>
                {errors.trainingProgramme && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.trainingProgramme}
                  </p>
                )}
              </div>

              {/* Error message */}
              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">
                    Something went wrong. Please try again or contact us on WhatsApp.
                  </p>
                </div>
              )}

              {/* Submit */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full justify-center"
                  showArrow={false}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Apply for Training
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Office info */}
          <div className="mt-8 p-6 bg-white border border-charcoal/10 rounded-xl">
            <h3 className="font-display text-lg font-medium text-charcoal mb-2">
              After You Apply
            </h3>
            <p className="text-charcoal/60 text-sm leading-relaxed">
              Once you submit this form, you will receive a reference number. 
              Please visit our office at <strong className="text-charcoal">Kasoa, Adam Nana Bus Stop, off Obom Road</strong> to complete the official registration process and make payment.
            </p>
          </div>

          {/* WhatsApp alternative */}
          <div className="mt-8 text-center">
            <p className="text-charcoal/40 text-sm mb-4">Prefer to apply via WhatsApp?</p>
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-charcoal hover:text-orange-600 transition-colors text-sm font-body font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with ABL Fashion
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function FormField({
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-editorial font-body font-medium text-charcoal/70 mb-2">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full bg-ivory/50 border rounded-lg px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none transition-colors',
          error
            ? 'border-red-300 focus:border-red-500'
            : 'border-charcoal/15 focus:border-orange-500'
        )}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}
