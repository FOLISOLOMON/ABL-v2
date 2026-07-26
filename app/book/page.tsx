'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '@/components/sections/page-hero';
import { Button } from '@/components/ui/button-link';
import { siteConfig } from '@/data/site';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  MessageCircle,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Copy,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const consultationTypes = [
  'Custom Design',
  'Fabric Consultation',
  'Style Advice',
  'Bridal Consultation',
  'General Consultation',
];

const steps = [
  { number: '01', title: 'About You', icon: User },
  { number: '02', title: 'Consultation Details', icon: Calendar },
  { number: '03', title: 'Your Needs', icon: MessageCircle },
  { number: '04', title: 'Confirmation', icon: CheckCircle2 },
];

interface FormData {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
  description: string;
}

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateField = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = 'Please enter your name';
      if (!formData.phone.trim()) newErrors.phone = 'Please enter your phone number';
    }
    if (step === 1) {
      if (!formData.consultationType) newErrors.consultationType = 'Please select a consultation type';
      if (!formData.preferredDate) newErrors.preferredDate = 'Please select a preferred date';
      if (!formData.preferredTime) newErrors.preferredTime = 'Please select a preferred time';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setReferenceNumber(data.referenceNumber || '');
      setEmailSent(data.emailSent || false);
      setStatus('success');
    } catch (err) {
      console.error('Booking error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <>
        <PageHero
          label="Consultation"
          title="Consultation Requested."
          image="/images/hero desktop.jpg"
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
              Thank you, {formData.name.split(' ')[0]}.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-charcoal/60 text-lg max-w-md mx-auto mb-10"
            >
              Your consultation request has been received. We will contact you on WhatsApp within 24 hours to discuss your needs.
            </motion.p>
            {referenceNumber && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="bg-white border border-charcoal/10 rounded-lg p-6 max-w-md mx-auto mb-10"
              >
                <p className="text-charcoal/60 text-xs uppercase tracking-editorial mb-2">Your Reference Number</p>
                <p className="font-display text-2xl text-charcoal tracking-wider">{referenceNumber}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referenceNumber);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="mt-3 inline-flex items-center gap-2 text-orange-500 text-xs uppercase tracking-editorial font-semibold hover:text-orange-600"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy Reference Number'}
                </button>
              </motion.div>
            )}

            {/* Email notification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {emailSent && formData.email ? (
                <p className="text-green-600 text-sm mb-8 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  A confirmation email has been sent to {formData.email}.
                </p>
              ) : (
                <p className="text-charcoal/50 text-sm mb-8">
                  Please save your reference number above. We will follow up via WhatsApp.
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
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
                  onClick={() => {
                    setStatus('idle');
                    setStep(0);
                    setFormData({
                      name: '',
                      phone: '',
                      whatsapp: '',
                      email: '',
                      consultationType: '',
                      preferredDate: '',
                      preferredTime: '',
                      description: '',
                    });
                  }}
                className="group inline-flex items-center gap-2 border border-charcoal/20 text-charcoal hover:bg-charcoal/5 px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 justify-center"
              >
                Submit Another Request
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
        label="Consultation"
        title="Request a Consultation."
        description="Tell us about your needs and we will contact you to discuss how we can help."
        image="/images/hero desktop.jpg"
      />

      <section className="pt-16 pb-32 md:pt-24 md:pb-40 bg-ivory border-b border-charcoal/10">
        <div className="container-wide max-w-3xl">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            {steps.map((s, i) => (
              <div key={s.number} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                      i === step
                        ? 'bg-charcoal text-white border-charcoal'
                        : i < step
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-transparent text-charcoal/30 border-charcoal/15'
                    )}
                  >
                    {i < step ? (
                      <Check className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <s.icon className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      'mt-2 text-[10px] uppercase tracking-editorial font-body font-medium hidden md:block transition-colors',
                      i === step ? 'text-charcoal' : 'text-charcoal/40'
                    )}
                  >
                    {s.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      'h-px flex-1 mx-2 md:mx-4 transition-colors duration-300',
                      i < step ? 'bg-orange-500' : 'bg-charcoal/15'
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white border border-charcoal/10 rounded-2xl p-6 md:p-10 shadow-sm">
            <AnimatePresence mode="wait">
              {/* Step 1: About You */}
              {step === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl md:text-3xl font-medium text-charcoal mb-2">
                    About You
                  </h2>
                  <p className="text-charcoal/50 text-sm mb-8">
                    Let us know how to reach you.
                  </p>

                  <div className="space-y-5">
                    <FormField
                      label="Full Name"
                      required
                      value={formData.name}
                      onChange={(v) => updateField('name', v)}
                      error={errors.name}
                      placeholder="Your full name"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        label="Phone"
                        required
                        value={formData.phone}
                        onChange={(v) => updateField('phone', v)}
                        error={errors.phone}
                        placeholder="05XXXXXXXX"
                      />
                      <FormField
                        label="WhatsApp"
                        value={formData.whatsapp}
                        onChange={(v) => updateField('whatsapp', v)}
                        placeholder="WhatsApp number"
                      />
                    </div>
                    <FormField
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(v) => updateField('email', v)}
                      placeholder="your@email.com"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Consultation Details */}
              {step === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl md:text-3xl font-medium text-charcoal mb-2">
                    Consultation Details
                  </h2>
                  <p className="text-charcoal/50 text-sm mb-8">
                    Tell us what you need and when.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-editorial font-body font-medium text-charcoal/70 mb-3">
                        Consultation Type <span className="text-orange-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {consultationTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => updateField('consultationType', type)}
                            className={cn(
                              'px-4 py-2.5 text-sm rounded-full border transition-all duration-300',
                              formData.consultationType === type
                                ? 'bg-charcoal text-white border-charcoal'
                                : 'bg-transparent text-charcoal/60 border-charcoal/15 hover:border-charcoal/30'
                            )}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      {errors.consultationType && (
                        <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.consultationType}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        label="Preferred Date"
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(v) => updateField('preferredDate', v)}
                        error={errors.preferredDate}
                      />
                      <FormField
                        label="Preferred Time"
                        type="time"
                        required
                        value={formData.preferredTime}
                        onChange={(v) => updateField('preferredTime', v)}
                        error={errors.preferredTime}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Your Needs */}
              {step === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl md:text-3xl font-medium text-charcoal mb-2">
                    Your Needs
                  </h2>
                  <p className="text-charcoal/50 text-sm mb-8">
                    Describe what you are looking for so we can prepare for your consultation.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-editorial font-body font-medium text-charcoal/70 mb-3">
                        Description of Needs
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        rows={5}
                        placeholder="Tell us about your goals, any specific questions, or details that will help us prepare for your consultation..."
                        className="w-full bg-ivory/50 border border-charcoal/15 rounded-lg px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {step === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl md:text-3xl font-medium text-charcoal mb-2">
                    Confirmation
                  </h2>
                  <p className="text-charcoal/50 text-sm mb-8">
                    Please review your details before submitting.
                  </p>

                  <div className="space-y-4">
                    <SummaryRow label="Name" value={formData.name} />
                    <SummaryRow label="Phone" value={formData.phone} />
                    {formData.whatsapp && (
                      <SummaryRow label="WhatsApp" value={formData.whatsapp} />
                    )}
                    {formData.email && <SummaryRow label="Email" value={formData.email} />}
                    {formData.consultationType && (
                      <SummaryRow label="Consultation Type" value={formData.consultationType} />
                    )}
                    {formData.preferredDate && (
                      <SummaryRow label="Preferred Date" value={formData.preferredDate} />
                    )}
                    {formData.preferredTime && (
                      <SummaryRow label="Preferred Time" value={formData.preferredTime} />
                    )}
                    {formData.description && (
                      <div className="pt-2">
                        <p className="text-xs uppercase tracking-editorial text-charcoal/40 mb-1">
                          Description of Needs
                        </p>
                        <p className="text-sm text-charcoal/70 leading-relaxed">
                          {formData.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {status === 'error' && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">
                        Something went wrong. Please try again or contact us on WhatsApp.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-charcoal/10">
              {step > 0 ? (
                <button
                  onClick={prevStep}
                  disabled={status === 'loading'}
                  className="group inline-flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal transition-colors disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button onClick={nextStep} showArrow={false}>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  showArrow={false}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                     'Book a Consultation'
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* WhatsApp alternative */}
          <div className="mt-8 text-center">
            <p className="text-charcoal/40 text-sm mb-4">Prefer WhatsApp?</p>
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

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-charcoal/5 last:border-0">
      <span className="text-xs uppercase tracking-editorial text-charcoal/40 shrink-0">
        {label}
      </span>
      <span className="text-sm text-charcoal/80 text-right">{value}</span>
    </div>
  );
}
