'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QuickBookingForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', mobile: '', service: '' });

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(form).toString();
    router.push(`/appointment?${params}`);
  };

  return (
    <div className="card p-6">
      <h3 className="font-bold text-lg text-slate-900 mb-1">Book Your Appointment</h3>
      <p className="text-xs text-slate-500 mb-4">Fill in your details, we'll take you to slot selection.</p>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          pattern="[6-9]{1}[0-9]{9}"
          maxLength={10}
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, '') })}
          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <input
          type="text"
          placeholder="Reason for Appointment (optional)"
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button type="submit" className="btn-primary w-full">Request Appointment</button>
        <p className="text-[11px] text-slate-400 text-center">For emergencies, please call us directly.</p>
      </form>
    </div>
  );
}
