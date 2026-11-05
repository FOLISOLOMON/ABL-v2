'use client';

import { useState, useId } from 'react';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

const consultationOptions = [
  {
    number: '01',
    title: 'Custom Design',
    subtitle: 'Bespoke garment tailored from initial sketch and measurements to final fitting.',
  },
  {
    number: '02',
    title: 'Bridal Consultation',
    subtitle: 'Private bridal fitting, lace & fabric curation, and couture gown design.',
  },
  {
    number: '03',
    title: 'Fabric Consultation',
    subtitle: 'Expert guidance on Kente, lace, silk, and premium textile selection.',
  },
  {
    number: '04',
    title: 'Style Advice',
    subtitle: 'Personal wardrobe direction and silhouette styling for special occasions.',
  },
  {
    number: '05',
    title: 'General Consultation',
    subtitle: 'Discuss alterations, group outfits, or custom atelier requests.',
  },
];

const steps = [
  { number: '01', title: 'Client Profile', icon: User },
  { number: '02', title: 'Atelier Appointment', icon: Calendar },
  { number: '03', title: 'Garment Brief', icon: MessageCircle },
  { number: '04', title: 'Dossier Review', icon: CheckCircle2 },
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

  const todayIso = new Date().toISOString().split('T')[0];

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = 'Please enter your name';
      if (!formData.phone.trim()) {
        newErrors.phone = 'Please enter your phone number';
      } else if (!/^[+\d\s()-]{7,20}$/.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
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
              className="w-20 h-20 rounded-none border border-green-600/30 bg-green-50 flex items-center justify-center mx-auto mb-8"
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
              Your consultation dossier has been registered. We will contact you on WhatsApp within 24 hours to finalize your appointment.
            </motion.p>
            {referenceNumber && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="bg-white border border-charcoal/15 rounded-none p-8 max-w-md mx-auto mb-10"
              >
                <p className="text-charcoal/50 text-[10px] uppercase tracking-editorial-wide mb-2">
                  Atelier Reference Number
                </p>
                <p className="font-display text-3xl text-orange-600 tracking-wider">{referenceNumber}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referenceNumber);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="mt-4 inline-flex items-center gap-2 text-charcoal text-xs uppercase tracking-editorial font-semibold hover:text-orange-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy Reference Number'}
                </button>
              </motion.div>
            )}

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
                className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-none transition-all duration-300 justify-center"
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
                className="group inline-flex items-center gap-2 border border-charcoal/20 text-charcoal hover:bg-charcoal/5 px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-none transition-all duration-300 justify-center"
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
          {/* Editorial Step Progress */}
          <div className="grid grid-cols-4 border border-charcoal/15 bg-white mb-10">
            {steps.map((s, i) => {
              const active = i === step;
              const completed = i < step;
              return (
                <div
                  key={s.number}
                  className={cn(
                    'p-4 md:p-5 border-r last:border-r-0 border-charcoal/15 transition-colors duration-300',
                    active ? 'bg-charcoal text-white' : completed ? 'bg-orange-50/60 text-charcoal' : 'bg-white text-charcoal/40'
                  )}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={cn(
                        'font-display italic text-xs md:text-sm',
                        active ? 'text-orange-400' : completed ? 'text-orange-600' : 'text-charcoal/35'
                      )}
                    >
                      {s.number}
                    </span>
                    {completed ? (
                      <Check className="w-3.5 h-3.5 text-orange-600" />
                    ) : (
                      <s.icon className={cn('w-3.5 h-3.5', active ? 'text-orange-400' : 'text-charcoal/30')} />
                    )}
                  </div>
                  <p className="text-[10px] uppercase tracking-editorial font-semibold truncate">
                    {s.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bespoke "Atelier Dossier" Card */}
          <div className="bg-white border border-charcoal/15 rounded-none shadow-[0_20px_60px_-20px_rgba(26,26,26,0.07)]">
            {/* Dossier Top Metadata Strip */}
            <div className="px-6 md:px-10 py-4 bg-ivory/70 border-b border-charcoal/10 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-editorial-wide text-orange-600 font-semibold">
                ABL Atelier Dossier — Private Consultation
              </span>
              <span className="font-display italic text-xs text-charcoal/60">
                Step 0{step + 1} of 04
              </span>
            </div>

            <div className="p-6 md:p-10">
              <AnimatePresence mode="wait">
                {/* Step 1: Client Profile */}
                {step === 0 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-display text-2xl md:text-3xl font-medium text-charcoal mb-2">
                      Client Profile
                    </h2>
                    <p className="text-charcoal/50 text-sm mb-8">
                      Enter your contact details for our studio register.
                    </p>

                    <div className="space-y-7">
                      <FormField
                        label="Full Name"
                        required
                        value={formData.name}
                        onChange={(v) => updateField('name', v)}
                        error={errors.name}
                        placeholder="Your full name"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <FormField
                          label="Primary Phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(v) => updateField('phone', v)}
                          error={errors.phone}
                          placeholder="05XXXXXXXX"
                        />
                        <FormField
                          label="WhatsApp Number"
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(v) => updateField('whatsapp', v)}
                          placeholder="WhatsApp number (optional)"
                        />
                      </div>
                      <FormField
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(v) => updateField('email', v)}
                        error={errors.email}
                        placeholder="your@email.com (for dossier confirmation)"
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
                      Atelier Appointment
                    </h2>
                    <p className="text-charcoal/50 text-sm mb-8">
                      Select the nature of your commission and preferred fitting schedule.
                    </p>

                    <div className="space-y-8">
                      <div>
                        <label className="block text-[11px] uppercase tracking-editorial-wide font-body font-semibold text-charcoal/60 mb-4">
                          Commission Type <span className="text-orange-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {consultationOptions.map((option) => {
                            const selected = formData.consultationType === option.title;
                            return (
                              <button
                                key={option.title}
                                type="button"
                                onClick={() => updateField('consultationType', option.title)}
                                className={cn(
                                  'group text-left p-4 md:p-5 rounded-none border transition-all duration-300 flex items-start justify-between gap-4',
                                  selected
                                    ? 'bg-charcoal text-white border-charcoal shadow-md'
                                    : 'bg-ivory/40 text-charcoal border-charcoal/15 hover:border-orange-500/50 hover:bg-ivory'
                                )}
                              >
                                <div className="flex items-baseline gap-3.5">
                                  <span
                                    className={cn(
                                      'font-display italic text-sm shrink-0',
                                      selected ? 'text-orange-400' : 'text-orange-600'
                                    )}
                                  >
                                    {option.number}
                                  </span>
                                  <div>
                                    <p className="font-display text-lg font-medium leading-snug">
                                      {option.title}
                                    </p>
                                    <p
                                      className={cn(
                                        'text-xs mt-1 leading-relaxed',
                                        selected ? 'text-white/70' : 'text-charcoal/55'
                                      )}
                                    >
                                      {option.subtitle}
                                    </p>
                                  </div>
                                </div>
                                <div
                                  className={cn(
                                    'w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                                    selected
                                      ? 'border-orange-500 bg-orange-500 text-white'
                                      : 'border-charcoal/25 group-hover:border-orange-500'
                                  )}
                                >
                                  {selected && <Check className="w-3 h-3" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        {errors.consultationType && (
                          <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.consultationType}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 pt-2">
                        <FormField
                          label="Preferred Date"
                          type="date"
                          min={todayIso}
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

                {/* Step 3: Garment Brief */}
                {step === 2 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-display text-2xl md:text-3xl font-medium text-charcoal mb-2">
                      Garment & Styling Brief
                    </h2>
                    <p className="text-charcoal/50 text-sm mb-8">
                      Share occasion details, fabric preferences, or silhouette inspiration so our master tailor can prepare.
                    </p>

                    <div>
                      <label
                        htmlFor="book-description"
                        className="block text-[11px] uppercase tracking-editorial-wide font-body font-semibold text-charcoal/60 mb-3"
                      >
                        Notes for the Atelier
                      </label>
                      <textarea
                        id="book-description"
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        rows={5}
                        placeholder="Describe your occasion, preferred colors, fabrics, or any specific design notes..."
                        className="w-full bg-transparent border-0 border-b border-charcoal/25 rounded-none px-0 py-3 text-base text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                      />
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
                      Dossier Verification
                    </h2>
                    <p className="text-charcoal/50 text-sm mb-8">
                      Please verify your consultation specifications before registering.
                    </p>

                    <div className="border-t border-charcoal/15">
                      <SummaryRow label="Client Name" value={formData.name} />
                      <SummaryRow label="Primary Phone" value={formData.phone} />
                      {formData.whatsapp && (
                        <SummaryRow label="WhatsApp" value={formData.whatsapp} />
                      )}
                      {formData.email && <SummaryRow label="Email" value={formData.email} />}
                      {formData.consultationType && (
                        <SummaryRow label="Commission Type" value={formData.consultationType} />
                      )}
                      {formData.preferredDate && (
                        <SummaryRow label="Preferred Date" value={formData.preferredDate} />
                      )}
                      {formData.preferredTime && (
                        <SummaryRow label="Preferred Time" value={formData.preferredTime} />
                      )}
                      {formData.description && (
                        <div className="py-4 border-b border-charcoal/10">
                          <p className="text-[10px] uppercase tracking-editorial-wide text-charcoal/45 mb-1.5">
                            Atelier Brief
                          </p>
                          <p className="text-sm text-charcoal/80 leading-relaxed">
                            {formData.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {status === 'error' && (
                      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-none flex items-start gap-3">
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
                    className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-editorial font-semibold text-charcoal/60 hover:text-charcoal transition-colors disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous Step
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <Button onClick={nextStep} showArrow={false}>
                    Proceed
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
                        Registering...
                      </>
                    ) : (
                      'Confirm Consultation'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* WhatsApp alternative */}
          <div className="mt-8 text-center">
            <p className="text-charcoal/40 text-xs uppercase tracking-editorial mb-3">
              Prefer Direct Concierge?
            </p>
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-charcoal hover:text-orange-600 transition-colors text-sm font-body font-medium"
            >
              <MessageCircle className="w-4 h-4 text-orange-500" />
              <span className="link-underline">Speak with the Atelier on WhatsApp</span>
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
  min,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  min?: string;
}) {
  const inputId = useId();
  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-[11px] uppercase tracking-editorial-wide font-body font-semibold text-charcoal/60 mb-1.5"
      >
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full bg-transparent border-0 border-b rounded-none px-0 py-3 text-base text-charcoal placeholder:text-charcoal/30 focus:outline-none transition-colors',
          error
            ? 'border-red-400 focus:border-red-600'
            : 'border-charcoal/25 focus:border-orange-500'
        )}
      />
      {error && (
        <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline gap-4 py-3.5 border-b border-charcoal/10">
      <span className="text-[10px] uppercase tracking-editorial-wide text-charcoal/45 shrink-0">
        {label}
      </span>
      <span className="text-sm font-medium text-charcoal text-right">{value}</span>
    </div>
  );
}