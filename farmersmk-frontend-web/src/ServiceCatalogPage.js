import React, { useEffect, useState } from 'react';

const fallbackCatalogs = {
  'subscription-plans': {
    title: 'Subscription Plans',
    description: 'Subscription pricing for platform access tiers across Farmers MK services.',
    accent: '#0891b2',
    note: 'Choose the access level that matches your usage and upgrade when your service footprint grows.',
    items: [
      ['Free', '$0'],
      ['Standard', '$3'],
      ['Premium', '$2'],
      ['Business', '$5'],
      ['Enterprise', '$10'],
    ],
  },
  'common-library': {
    title: 'Common Library',
    description: 'Common learning and resource access for books, courses, certifications, and audio content.',
    accent: '#8b5cf6',
    note: 'Use this service to discover training materials, certification tracks, and reference content in one place.',
    items: [
      ['Monthly Access', '$2/month'],
      ['Annual Access', '$15/year'],
      ['E-books', '$1-$5'],
      ['Training Courses', '$10-$30'],
      ['Certification Courses', '$40'],
      ['Audio Books', '$2'],
    ],
  },
  'android-app': {
    title: 'Android App',
    description: 'Android app service for subscriptions and white-label mobile apps for institutions and businesses.',
    accent: '#f97316',
    note: 'Ideal for schools, churches, and businesses that want a branded Android presence with platform support.',
    items: [
      ['Premium Subscription', '$3/yearly'],
      ['White-label School App', '$250'],
      ['White-label Church App', '$250'],
      ['White-label Business App', '$400'],
      ['Institution Setup Fee', '$80'],
      ['Sponsored Section', '$15/month'],
    ],
  },
  'social-media': {
    title: 'Social Media',
    description: 'Social media integration for promotion, premium communities, live events, and business visibility inside Farmers MK.',
    accent: '#7c3aed',
    note: 'Use this service to promote products, communities, and events directly through the Farmers MK audience.',
    items: [
      ['Sponsored Post', '$3'],
      ['Business Advertisement', '$2/month'],
      ['Homepage Banner', '$5/week'],
      ['Premium Community', '$2/month'],
      ['Live Event Streaming', '$5/event'],
      ['Product Promotion', '$3'],
    ],
  },
};

async function fetchCatalog(slug) {
  const response = await fetch(`http://localhost:8085/api/catalogs/${slug}`);
  const contentType = response.headers.get('content-type') || '';
  if (!response.ok || !contentType.includes('application/json')) {
    throw new Error('Catalog unavailable');
  }
  return response.json();
}

export default function ServiceCatalogPage({ slug }) {
  const [catalog, setCatalog] = useState(fallbackCatalogs[slug] || null);

  useEffect(() => {
    let isMounted = true;

    fetchCatalog(slug)
      .then((data) => {
        if (isMounted && data) {
          const items = Array.isArray(data.items_json)
            ? data.items_json
            : Array.isArray(data.items)
              ? data.items
              : fallbackCatalogs[slug]?.items || [];
          setCatalog({
            title: data.title,
            description: data.description,
            accent: data.accent,
            note: data.note,
            items,
          });
        }
      })
      .catch(() => {
        if (isMounted) {
          setCatalog(fallbackCatalogs[slug] || null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!catalog) {
    return <div style={{ padding: 32 }}>Service details are not available right now.</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '48px 20px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', background: '#fff', borderRadius: 24, boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)', padding: 32 }}>
        <div style={{ display: 'inline-flex', padding: '8px 14px', borderRadius: 999, background: `${catalog.accent}18`, color: catalog.accent, fontWeight: 700, marginBottom: 18 }}>
          Farmers MK Service
        </div>
        <h2 style={{ fontSize: 34, margin: '0 0 12px', color: '#0f172a' }}>{catalog.title}</h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', margin: '0 0 24px' }}>{catalog.description}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, marginBottom: 24 }}>
          {catalog.items.map(([label, value]) => (
            <div key={`${label}-${value}`} style={{ border: '1px solid #e2e8f0', borderRadius: 18, padding: 18, background: '#fff' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{label}</div>
              <div style={{ color: catalog.accent, fontWeight: 800 }}>{value}</div>
            </div>
          ))}
        </div>
        {catalog.note ? (
          <div style={{ borderRadius: 18, background: '#f8fafc', border: '1px solid #e2e8f0', padding: 18, color: '#334155', lineHeight: 1.7 }}>
            {catalog.note}
          </div>
        ) : null}
      </div>
    </div>
  );
}