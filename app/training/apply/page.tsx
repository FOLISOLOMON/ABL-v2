'use client';

import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '@/components/sections/page-hero';
import { Button } from '@/components/ui/button-link';
import { siteConfig } from '@/data/site';
import { trainingPrograms } from '@/data/training';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  User,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Copy,
  MapPin,
  Clock,
  CreditCard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, label: 'Select Program', icon: GraduationCap },
  { id: 2, label: 'Your Details', icon: User },
];

export default function TrainingApplyPage() {
  const [step, setStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [copied, setCopied] = useState(false);

  const canProceed = () => {
    if (step === 1) return selectedProgram !== '';
    if (step === 2) {
      return (
        form.name.trim() !== '' &&
        form.email.trim() !== '' &&
        form.phone.trim() !== '' &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      );
    }
    return false;
  };

  const selectedProgramData = trainingPrograms.find((p) => p.id === selectedProgram);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed()) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/training', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          trainingProgramme: `${selectedProgramData?.duration} — ${selectedProgramData?.title}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      const data = await res.json();
      setReferenceNumber(data.referenceNumber || '');
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to submit your application. Please try again or contact us on WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const copyReferenceNumber = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <>
        <PageHero
          label="Application Submitted"
          title="Thank you for applying!"
          description="Your training application has been received. Please follow the steps below to complete your registration."
          image="/images/about-2.jpg"
        />
        <section className="py-24 md:py-32 bg-ivory">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-charcoal/15 p-8 md:p-14 shadow-[0_24px_60px_-20px_rgba(26,26,26,0.08)]"
            >
              {/* Dossier Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-6 mb-8 border-b border-charcoal/10">
                <span className="text-[10px] uppercase tracking-editorial-wide text-orange-600 font-semibold">
                  ABL Academy Dossier — Admissions Record
                </span>
                <span className="text-[10px] uppercase tracking-editorial text-charcoal/45">
                  Status: Awaiting Office Visit
                </span>
              </div>

              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/25 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-medium mb-3">
                  Application Registered
                </h2>
                <p className="text-warm-gray text-sm max-w-md mx-auto">
                  A confirmation email with these details has been sent to{' '}
                  <strong className="text-charcoal">{form.email}</strong>.
                </p>
              </div>

              {/* Reference Number Box */}
              <div className="bg-charcoal text-white p-6 md:p-8 text-center mb-8 border border-charcoal">
                <p className="text-[10px] uppercase tracking-editorial-wide text-orange-400 mb-2">
                  Your Reference Number
                </p>
                <div className="flex items-center justify-center gap-3">
                  <p className="font-mono text-2xl md:text-3xl font-bold tracking-wider">
                    {referenceNumber}
                  </p>
                  <button
                    onClick={copyReferenceNumber}
                    className="p-2 bg-white/10 hover:bg-white/20 transition-colors"
                    title="Copy reference number"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-orange-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-white/70" />
                    )}
                  </button>
                </div>
                <p className="text-white/50 text-xs mt-2">
                  Save this number — you will need it when visiting our office
                </p>
              </div>

              {/* Application Summary */}
              <div className="bg-ivory/70 border border-charcoal/10 p-6 mb-8 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-warm-gray">Applicant</span>
                  <span className="font-medium text-charcoal">{form.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-gray">Email</span>
                  <span className="font-medium text-charcoal">{form.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-gray">Phone</span>
                  <span className="font-medium text-charcoal">{form.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-gray">Programme</span>
                  <span className="font-medium text-charcoal">
                    {selectedProgramData?.duration} — {selectedProgramData?.title}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-charcoal/10">
                  <span className="text-warm-gray">Status</span>
                  <span className="text-orange-600 font-semibold text-xs uppercase tracking-editorial">
                    Awaiting Office Visit
                  </span>
                </div>
              </div>

              {/* Next Steps */}
              <div className="border-l-2 border-orange-500 bg-orange-500/5 p-6 mb-8">
                <h3 className="font-display text-lg font-medium text-charcoal mb-4">
                  Next Steps to Complete Your Registration
                </h3>
                <div className="space-y-4 text-sm text-warm-gray">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-charcoal">1. Visit Our Office</p>
                      <p>{siteConfig.location.full}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-charcoal">2. Present Your Reference Number</p>
                      <p>
                        Show your reference number (<strong className="text-charcoal">{referenceNumber}</strong>) at the front desk.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-charcoal">3. Pay the Application Form Fee</p>
                      <p>
                        Pay the <strong className="text-charcoal">GHS 150</strong> application form fee to collect your physical form and finalize enrollment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`https://wa.me/233548883475?text=${encodeURIComponent(
                    `Hello ABL Fashion, I have applied for the ${selectedProgramData?.duration} (${selectedProgramData?.title}) training programme. My reference number is ${referenceNumber}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 text-white text-xs uppercase tracking-editorial font-semibold hover:bg-orange-600 transition-colors"
                >
                  Confirm via WhatsApp
                </a>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setStep(1);
                    setSelectedProgram('');
                    setForm({ name: '', email: '', phone: '' });
                    setReferenceNumber('');
                  }}
                >
                  New Application
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        label="Training Application"
        title="Begin your fashion journey."
        description="Apply for a training programme at ABL Fashion Training Academy. Select your preferred duration and enter your details to get started."
        image="/images/about-2.jpg"
      />

      <section className="py-16 md:py-24 bg-ivory">
        <div className="container-narrow">
          {/* Editorial Dossier Stepper */}
          <div className="grid grid-cols-2 border border-charcoal/15 bg-white mb-12">
            {steps.map((s) => {
              const active = step === s.id;
              const completed = step > s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    if (s.id < step) setStep(s.id);
                  }}
                  className={cn(
                    'flex items-center justify-between px-6 py-4 text-left border-r last:border-r-0 border-charcoal/15 transition-colors duration-300',
                    active && 'bg-charcoal text-white',
                    completed && 'bg-orange-500/10 text-charcoal cursor-pointer hover:bg-orange-500/15',
                    !active && !completed && 'bg-white text-warm-gray cursor-default'
                  )}
                >
                  <div>
                    <span
                      className={cn(
                        'block text-[10px] uppercase tracking-editorial-wide mb-0.5',
                        active ? 'text-orange-400' : completed ? 'text-orange-600 font-semibold' : 'text-warm-gray/60'
                      )}
                    >
                      Step 0{s.id}
                    </span>
                    <span className="font-display text-sm md:text-base font-medium">
                      {s.label}
                    </span>
                  </div>
                  <div
                    className={cn(
                      'w-7 h-7 flex items-center justify-center border text-xs',
                      active && 'border-orange-500 bg-orange-500 text-white',
                      completed && 'border-orange-500/40 bg-orange-500/15 text-orange-600',
                      !active && !completed && 'border-charcoal/15 text-warm-gray/60'
                    )}
                  >
                    {completed ? <Check className="w-3.5 h-3.5" /> : `0${s.id}`}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Info Banner */}
          <div className="bg-white border border-charcoal/15 p-5 mb-10 flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <div className="text-xs text-warm-gray leading-relaxed">
              <strong className="text-charcoal uppercase tracking-editorial">How it works:</strong> Submit your application online to receive a unique reference number. Then visit our office in Kasoa with your reference number and pay the{' '}
              <strong className="text-charcoal">GHS 150 application form fee</strong> to complete your registration.
            </div>
          </div>

          {/* Form Content inside Dossier Sheet */}
          <div className="bg-white border border-charcoal/15 p-6 sm:p-10 md:p-14 shadow-[0_24px_60px_-20px_rgba(26,26,26,0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-8 border-b border-charcoal/10">
              <span className="text-[10px] uppercase tracking-editorial-wide text-orange-600 font-semibold">
                ABL Academy Dossier — Section 0{step} of 02
              </span>
              <span className="text-[10px] uppercase tracking-editorial text-charcoal/45">
                Kasoa Training Campus
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-display text-2xl md:text-3xl font-medium mb-2">
                      Choose your training programme
                    </h2>
                    <p className="text-warm-gray text-sm mb-8">
                      Select the programme duration that best matches your goals and experience level.
                    </p>

                    <div className="space-y-4">
                      {trainingPrograms.map((program, idx) => {
                        const selected = selectedProgram === program.id;
                        return (
                          <button
                            key={program.id}
                            type="button"
                            onClick={() => setSelectedProgram(program.id)}
                            className={cn(
                              'w-full text-left p-6 border transition-all duration-300',
                              selected
                                ? 'border-orange-500 bg-orange-500/5 shadow-sm'
                                : 'border-charcoal/15 bg-ivory/40 hover:border-charcoal/35 hover:bg-ivory'
                            )}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                  <span className="text-[10px] font-mono uppercase tracking-editorial text-orange-600 font-semibold">
                                    Tier 0{idx + 1}
                                  </span>
                                  <span className="font-display text-xl font-bold text-orange-600">
                                    {program.duration}
                                  </span>
                                  <span className="text-[10px] uppercase tracking-editorial px-2.5 py-0.5 border border-royal-700/20 bg-royal-700/10 text-royal-700 font-medium">
                                    {program.level}
                                  </span>
                                </div>
                                <h3 className="font-display text-lg font-medium text-charcoal mb-1">
                                  {program.title}
                                </h3>
                                <p className="text-warm-gray text-sm mb-3">
                                  {program.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {program.skills.map((skill) => (
                                    <span
                                      key={skill}
                                      className="text-xs bg-white border border-charcoal/10 text-charcoal/75 px-2.5 py-1"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div
                                className={cn(
                                  'w-5 h-5 border flex items-center justify-center shrink-0 mt-1 transition-colors',
                                  selected
                                    ? 'border-orange-500 bg-orange-500 text-white'
                                    : 'border-charcoal/25'
                                )}
                              >
                                {selected && <Check className="w-3 h-3" />}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-display text-2xl md:text-3xl font-medium mb-2">
                      Your personal details
                    </h2>
                    <p className="text-warm-gray text-sm mb-8">
                      We will send your confirmation and reference number to the email address you provide.
                    </p>

                    {/* Selected program summary */}
                    {selectedProgramData && (
                      <div className="bg-ivory/70 border border-charcoal/15 p-5 mb-8 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-editorial text-orange-600 font-semibold">
                            Selected Programme
                          </p>
                          <p className="font-display text-base font-medium text-charcoal mt-0.5">
                            {selectedProgramData.duration} — {selectedProgramData.title}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-xs uppercase tracking-editorial text-orange-600 hover:underline font-medium"
                        >
                          Change
                        </button>
                      </div>
                    )}

                    <div className="space-y-8">
                      <InputField
                        label="Full Name *"
                        value={form.name}
                        onChange={(v) => setForm({ ...form, name: v })}
                        placeholder="Enter your full name"
                        required
                      />
                      <InputField
                        label="Email Address *"
                        type="email"
                        value={form.email}
                        onChange={(v) => setForm({ ...form, email: v })}
                        placeholder="your@email.com"
                        required
                      />
                      <InputField
                        label="Phone / WhatsApp Number *"
                        type="tel"
                        value={form.phone}
                        onChange={(v) => setForm({ ...form, phone: v })}
                        placeholder="e.g. 0548883475"
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error banner */}
              {error && (
                <div className="mt-8 flex items-start gap-3 p-4 border border-red-200 bg-red-50 text-red-800 text-sm">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-charcoal/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-editorial font-semibold text-charcoal/70 hover:text-charcoal transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 2 ? (
                  <button
                    type="button"
                    disabled={!canProceed()}
                    onClick={() => setStep(step + 1)}
                    className={cn(
                      'inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-editorial font-semibold transition-all duration-300',
                      canProceed()
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-charcoal/10 text-warm-gray/50 cursor-not-allowed'
                    )}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Button type="submit" disabled={!canProceed() || submitting} showArrow={!submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-editorial-wide text-charcoal/65 font-semibold mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-0 py-3 bg-transparent border-0 border-b border-charcoal/25 text-sm text-charcoal placeholder:text-warm-gray/45 focus:outline-none focus:border-orange-500 transition-colors"
      />
    </div>
  );
}

