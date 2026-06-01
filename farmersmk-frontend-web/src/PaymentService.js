import React, { useEffect, useState } from 'react';

const fallbackAccount = {
  userId: 'demo-user',
  status: 'registered',
  trialActive: true,
  recurringEnabled: false,
  paymentMethod: 'MTN Mobile Money',
};

const fallbackTransactions = [
  {
    id: 1,
    serviceName: 'Payment Service',
    featureName: 'Starter Trial',
    amount: 0,
    paymentMethod: 'Trial Access',
    status: 'paid',
    createdAt: new Date().toISOString(),
  },
];

async function readJsonOrThrow(response) {
  const contentType = response.headers.get('content-type') || '';
  if (!response.ok || !contentType.includes('application/json')) {
    throw new Error('Payment API unavailable');
  }
  return response.json();
}

export default function PaymentService() {
  const [account, setAccount] = useState(fallbackAccount);
  const [transactions, setTransactions] = useState(fallbackTransactions);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      fetch('http://localhost:8085/api/payments/account/demo-user').then(readJsonOrThrow),
      fetch('http://localhost:8085/api/payments/transactions/demo-user').then(readJsonOrThrow),
    ])
      .then(([accountData, transactionData]) => {
        if (!isMounted) {
          return;
        }
        setAccount(accountData);
        setTransactions(Array.isArray(transactionData) ? transactionData : fallbackTransactions);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }
        setAccount(fallbackAccount);
        setTransactions(fallbackTransactions);
        setNotice('Using local payment demo data because the payment API is not available.');
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const recordTransaction = async (featureName, amount, paymentMethod) => {
    const payload = {
      userId: 'demo-user',
      serviceName: 'Payment Service',
      featureName,
      amount,
      paymentMethod,
    };

    try {
      const response = await fetch('http://localhost:8085/api/payments/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await readJsonOrThrow(response);
      setTransactions((prev) => [data, ...prev]);
      setAccount((prev) => ({ ...prev, status: 'registered' }));
      setNotice(`${featureName} recorded successfully.`);
    } catch (error) {
      const localTransaction = {
        ...payload,
        id: Date.now(),
        status: 'paid',
        createdAt: new Date().toISOString(),
      };
      setTransactions((prev) => [localTransaction, ...prev]);
      setNotice(`${featureName} saved locally because the payment API is unavailable.`);
    }
  };

  const toggleRecurring = () => {
    setAccount((prev) => {
      const next = { ...prev, recurringEnabled: !prev.recurringEnabled };
      setNotice(next.recurringEnabled ? 'Recurring billing enabled.' : 'Recurring billing disabled.');
      return next;
    });
  };

  if (loading) {
    return <div style={{ padding: 32 }}>Loading payment service...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '48px 20px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24 }}>
        <section style={{ background: '#fff', borderRadius: 24, boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)', padding: 32 }}>
          <div style={{ display: 'inline-flex', padding: '8px 14px', borderRadius: 999, background: '#e0f2fe', color: '#0369a1', fontWeight: 700, marginBottom: 18 }}>
            Payment Service
          </div>
          <h2 style={{ fontSize: 34, margin: '0 0 12px', color: '#0f172a' }}>Manage collections, subscriptions, and service payments.</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', margin: '0 0 22px' }}>
            Register payment access, control recurring billing, and keep a visible ledger of transactions tied to Farmers MK services.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>Status</div>
              <div style={{ color: '#0f172a', fontWeight: 800, fontSize: 18 }}>{account.status}</div>
            </div>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>Trial</div>
              <div style={{ color: '#0f172a', fontWeight: 800, fontSize: 18 }}>{account.trialActive ? 'Active' : 'Inactive'}</div>
            </div>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>Recurring</div>
              <div style={{ color: '#0f172a', fontWeight: 800, fontSize: 18 }}>{account.recurringEnabled ? 'Enabled' : 'Disabled'}</div>
            </div>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>Payment Method</div>
              <div style={{ color: '#0f172a', fontWeight: 800, fontSize: 18 }}>{account.paymentMethod || 'Unassigned'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
            <button onClick={() => recordTransaction('Service Registration', 3, account.paymentMethod || 'MTN Mobile Money')} style={{ padding: '12px 18px', border: 'none', borderRadius: 10, background: '#0284c7', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
              Pay Registration
            </button>
            <button onClick={() => recordTransaction('Monthly Renewal', 5, account.paymentMethod || 'MTN Mobile Money')} style={{ padding: '12px 18px', border: 'none', borderRadius: 10, background: '#0f766e', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
              Pay Monthly Renewal
            </button>
            <button onClick={toggleRecurring} style={{ padding: '12px 18px', border: '1px solid #cbd5e1', borderRadius: 10, background: '#fff', color: '#0f172a', fontWeight: 700, cursor: 'pointer' }}>
              {account.recurringEnabled ? 'Disable Recurring' : 'Enable Recurring'}
            </button>
          </div>
          {notice ? <div style={{ borderRadius: 14, background: '#f8fafc', border: '1px solid #e2e8f0', padding: 14, color: '#334155' }}>{notice}</div> : null}
        </section>
        <aside style={{ background: '#fff', borderRadius: 24, boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)', padding: 32 }}>
          <h3 style={{ margin: '0 0 16px', color: '#0f172a' }}>Recent Transactions</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {transactions.map((transaction) => (
              <div key={transaction.id} style={{ border: '1px solid #e2e8f0', borderRadius: 16, padding: 16 }}>
                <div style={{ fontWeight: 800, color: '#0f172a' }}>{transaction.featureName}</div>
                <div style={{ color: '#475569', margin: '6px 0' }}>{transaction.serviceName}</div>
                <div style={{ color: '#0f766e', fontWeight: 700 }}>${Number(transaction.amount).toFixed(2)} via {transaction.paymentMethod}</div>
                <div style={{ color: '#64748b', fontSize: 13, marginTop: 6 }}>{new Date(transaction.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}