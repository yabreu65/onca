'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig, cn } from '@/lib/utils';
import { trackEvents } from '@/lib/analytics';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().min(1),
  message: z.string().min(20),
  privacy: z.boolean().refine((v) => v === true),
  honeypot: z.string().optional(), // Bot trap field
});

type FormData = z.infer<typeof schema>;

export default function ContactoPage() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { setStatus('success'); trackEvents.formSubmit('Contact'); reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <div className="min-h-screen">
      <section className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="section-title text-onca-orange mb-4">{t('formTitle')}</h1>
          <p className="text-gray-300 text-lg">{t('formSubtitle')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">{t('title')}</h2>
              <p className="text-gray-600 mb-8">{t('subtitle')}</p>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" onClick={() => trackEvents.whatsappClick()} className="btn-whatsapp w-full justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {t('whatsapp')}
              </a>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"><Phone className="text-onca-orange" /><div><p className="text-sm text-gray-500">Teléfono</p><a href={`tel:${siteConfig.phone}`} className="font-medium">{siteConfig.phone}</a></div></div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"><Mail className="text-onca-orange" /><div><p className="text-sm text-gray-500">Email</p><a href={`mailto:${siteConfig.email}`} className="font-medium">{siteConfig.email}</a></div></div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"><MapPin className="text-onca-orange" /><div><p className="text-sm text-gray-500">Ubicación</p><p className="font-medium">Buenos Aires, Argentina</p></div></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {status === 'success' ? (
              <div className="text-center py-12"><CheckCircle size={64} className="text-green-500 mx-auto mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">{t('form.success')}</h3></div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field - hidden from real users */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="honeypot">Leave this field empty</label>
                  <input
                    type="text"
                    id="honeypot"
                    {...register('honeypot')}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.name')} *</label>
                  <input {...register('name')} className={cn('input-field', errors.name && 'input-error')} />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{t('validation.nameRequired')}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.email')} *</label>
                    <input type="email" {...register('email')} className={cn('input-field', errors.email && 'input-error')} />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{t('validation.emailInvalid')}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.phone')}</label>
                    <input type="tel" {...register('phone')} className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.company')} *</label>
                  <input {...register('company')} className={cn('input-field', errors.company && 'input-error')} />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{t('validation.companyRequired')}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.message')} *</label>
                  <textarea {...register('message')} rows={4} className={cn('input-field resize-none', errors.message && 'input-error')} />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{t('validation.messageMin')}</p>}
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" {...register('privacy')} className="mt-1" />
                  <label className="text-sm text-gray-600">{t('form.privacy')} *</label>
                </div>
                {errors.privacy && <p className="text-red-500 text-sm">{t('validation.privacyRequired')}</p>}
                {status === 'error' && <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg"><AlertCircle size={20} />{t('form.error')}</div>}
                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full flex items-center justify-center gap-2">
                  {status === 'loading' ? t('form.sending') : <><Send size={18} />{t('form.submit')}</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
