'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import type { TenantAnalytics } from '@/types/tenant';

interface Props {
  analytics: TenantAnalytics;
}

export function AnalyticsInit({ analytics }: Props) {
  const { gaId, fbPixelId, posthogKey, posthogHost } = analytics;

  // PostHog init
  useEffect(() => {
    if (!posthogKey) return;
    import('posthog-js').then(({ default: posthog }) => {
      posthog.init(posthogKey, {
        api_host: posthogHost ?? 'https://eu.posthog.com',
        capture_pageview: true,
        capture_pageleave: true,
      });
    });
  }, [posthogKey, posthogHost]);

  return (
    <>
      {/* Google Analytics 4 */}
      {gaId && (
        <>
          <Script
            id="ga4-script"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { send_page_view: true });
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel */}
      {fbPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}

/**
 * Track a conversion event across all configured analytics providers.
 * Call this from form submit handlers.
 */
export function trackLead(params?: Record<string, string>) {
  // GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', params ?? {});
  }
  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', params ?? {});
  }
  // PostHog
  import('posthog-js').then(({ default: posthog }) => {
    posthog.capture('lead_submitted', params);
  }).catch(() => {});
}
