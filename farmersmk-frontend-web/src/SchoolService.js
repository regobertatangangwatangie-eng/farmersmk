import React, { useState } from 'react';

function SchoolSignup({ onSignup }) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    proprietor: '',
    payNumber: '',
    payMethod: '',
    extra: ''
  });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <div style={{ maxWidth: 420, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 28 }}>
      <h2>School Sign Up</h2>
      <input name="name" placeholder="School Name" value={form.name} onChange={handleChange} style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
      <input name="location" placeholder="Location/Place" value={form.location} onChange={handleChange} style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
      <input name="proprietor" placeholder="Proprietor Name" value={form.proprietor} onChange={handleChange} style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
      <input name="payNumber" placeholder="Number for Paying Fees" value={form.payNumber} onChange={handleChange} style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
      <input name="payMethod" placeholder="Method for Paying Fees (e.g. MTN, Orange, Bank, Card)" value={form.payMethod} onChange={handleChange} style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
      <input name="extra" placeholder="Other Details" value={form.extra} onChange={handleChange} style={{ width: '100%', marginBottom: 18, padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
      <button style={{ padding: '12px 28px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16 }} onClick={() => onSignup(form)} disabled={!form.name || !form.location || !form.proprietor || !form.payNumber || !form.payMethod}>Sign Up</button>
    </div>
  );
}

function SchoolLogin({ onLogin, schoolName }) {
  const [school, setSchool] = useState(schoolName || '');
  return (
    <div style={{ maxWidth: 400, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24 }}>
      <h2>School Sign In</h2>
      <input
        placeholder="School Name"
        value={school}
        onChange={e => setSchool(e.target.value)}
        style={{ width: '100%', marginBottom: 16, padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <button style={{ padding: '10px 24px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => onLogin(school)} disabled={!school}>Sign In</button>
    </div>
  );
}

function StudentRegistration({ students, setStudents }) {
  const [name, setName] = useState('');
  return (
    <div style={{ margin: '24px 0' }}>
      <h3>Register Students</h3>
      <input
        placeholder="Student Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ width: 220, marginRight: 8, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <button onClick={() => { if (name) { setStudents([...students, { name, payments: [] }]); setName(''); } }} style={{ padding: '8px 18px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }}>Add</button>
      <ul style={{ marginTop: 12 }}>
        {students.map((s, i) => <li key={i}>{s.name}</li>)}
      </ul>
    </div>
  );
}

function FeePayment({ student, onPay }) {
  const [amount, setAmount] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  return (
    <div style={{ margin: '18px 0', padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
      <h4>Pay Fees for {student.name}</h4>
      <div>MoMo Number: <b>675 142 175</b></div>
      <input
        placeholder="Amount to Pay"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        style={{ width: 120, margin: '10px 0', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <input type="file" accept="image/*" onChange={e => setScreenshot(e.target.files[0])} />
      <button style={{ marginLeft: 8, padding: '8px 18px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => onPay(amount, screenshot)} disabled={!amount || !screenshot}>Pay & Upload Screenshot</button>
    </div>
  );
}

function PaymentTable({ student }) {
  const total = 100000;
  const paid = student.payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const balance = total - paid;
  return (
    <div style={{ margin: '18px 0' }}>
      <h4>Payment Record for {student.name}</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th>Paid Before</th>
            <th>Paid Now</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{paid - (student.payments[student.payments.length - 1]?.amount || 0)}</td>
            <td>{student.payments[student.payments.length - 1]?.amount || 0}</td>
            <td>{balance}</td>
          </tr>
        </tbody>
      </table>
      <ul style={{ marginTop: 10 }}>
        {student.payments.map((p, i) => <li key={i}>Paid {p.amount} on {p.date}</li>)}
      </ul>
    </div>
  );
}

function BalanceSheet({ students }) {
  const total = students.length * 100000;
  const paid = students.reduce((sum, s) => sum + s.payments.reduce((sp, p) => sp + Number(p.amount), 0), 0);
  return (
    <div style={{ margin: '24px 0', padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
      <h3>Monthly Balance Sheet</h3>
      <div>Total Students: {students.length}</div>
      <div>Total Fees: {total}</div>
      <div>Total Paid: {paid}</div>
      <div>Balance: {total - paid}</div>
    </div>
  );
}

export default function SchoolService() {
  const [step, setStep] = useState('signup'); // signup | signin | dashboard
  const [schoolName, setSchoolName] = useState('');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([{ name: 'John Doe', account: '675142176' }, { name: 'Jane Smith', account: '675142177' }]);
  const [selected, setSelected] = useState(null);
  const [dashboardSection, setDashboardSection] = useState('');
  const [teacherPays, setTeacherPays] = useState({});
  const [paySlips, setPaySlips] = useState([]);

  // Show both Sign Up and Sign In in the same place before dashboard
  if (step !== 'dashboard') {
    return (
      <div style={{ maxWidth: 440, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <button
            style={{
              padding: '10px 32px',
              borderRadius: 6,
              border: step === 'signup' ? '2px solid #4CAF50' : '1px solid #ccc',
              background: step === 'signup' ? '#e8f5e9' : '#f9f9f9',
              color: step === 'signup' ? '#388e3c' : '#333',
              fontWeight: step === 'signup' ? 700 : 500,
              marginRight: 8,
              cursor: 'pointer'
            }}
            onClick={() => setStep('signup')}
          >
            Sign Up
          </button>
          <button
            style={{
              padding: '10px 32px',
              borderRadius: 6,
              border: step === 'signin' ? '2px solid #2196F3' : '1px solid #ccc',
              background: step === 'signin' ? '#e3f2fd' : '#f9f9f9',
              color: step === 'signin' ? '#1565c0' : '#333',
              fontWeight: step === 'signin' ? 700 : 500,
              marginLeft: 8,
              cursor: 'pointer'
            }}
            onClick={() => setStep('signin')}
          >
            Sign In
          </button>
        </div>
        {step === 'signup' && (
          <SchoolSignup onSignup={form => { setSchoolName(form.name); setStep('signin'); }} />
        )}
        {step === 'signin' && (
          <SchoolLogin schoolName={schoolName} onLogin={name => setStep('dashboard')} />
        )}
      </div>
    );
  }

  // Mini dashboard buttons
  const dashboardButtons = [
    { label: 'Registration of Student / Pupil / Kids', section: 'register' },
    { label: 'Class List', section: 'classlist' },
    { label: 'Class Subject List', section: 'subjectlist' },
    { label: 'Fees Payment', section: 'fees' },
    { label: 'Balance Sheet', section: 'balancesheet' },
    { label: 'Payment of Teachers', section: 'payteachers' },
    { label: 'Pay Slip Generation', section: 'payslips' },
  ];

  // Class list logic
  const classList = {};
  students.forEach(s => {
    const cls = s.class || 'Unassigned';
    if (!classList[cls]) classList[cls] = [];
    classList[cls].push(s.name);
  });

  // Subject list logic (simple static demo)
  const subjectList = {
    Nursery: ['Drawing', 'Counting', 'Story Time'],
    Primary: ['Math', 'English', 'Science'],
    Secondary: ['Math', 'English', 'Biology', 'Chemistry', 'Physics']
  };

  // Pay slip logic
  function generatePaySlips() {
    const slips = teachers.map(t => {
      const gross = Number(teacherPays[t.name] || 0);
      const insurance = gross * 0.05;
      const tax = gross * 0.10;
      const net = gross - insurance - tax;
      return { name: t.name, gross, insurance, tax, net };
    });
    setPaySlips(slips);
  }

  return (
    <div style={{ maxWidth: 900, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24 }}>
      <h2>School Service Dashboard</h2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        {dashboardButtons.map(btn => (
          <button key={btn.section} style={{ padding: '12px 18px', borderRadius: 8, border: 'none', background: dashboardSection === btn.section ? '#2196F3' : '#4CAF50', color: '#fff', fontWeight: 600, minWidth: 180, marginBottom: 8 }} onClick={() => setDashboardSection(btn.section)}>{btn.label}</button>
        ))}
      </div>

      {/* Registration Section */}
      {dashboardSection === 'register' && <StudentRegistration students={students} setStudents={setStudents} />}

      {/* Class List Section */}
      {dashboardSection === 'classlist' && (
        <div style={{ margin: '24px 0' }}>
          <h3>Class List</h3>
          {Object.keys(classList).length === 0 && <div>No students registered yet.</div>}
          {Object.entries(classList).map(([cls, names]) => (
            <div key={cls} style={{ marginBottom: 10 }}>
              <b>{cls}:</b> {names.join(', ')}
            </div>
          ))}
        </div>
      )}

      {/* Class Subject List Section */}
      {dashboardSection === 'subjectlist' && (
        <div style={{ margin: '24px 0' }}>
          <h3>Class Subject List</h3>
          {Object.keys(classList).length === 0 && <div>No students registered yet.</div>}
          {Object.entries(classList).map(([cls, names]) => (
            <div key={cls} style={{ marginBottom: 10 }}>
              <b>{cls}:</b> {subjectList[cls] ? subjectList[cls].join(', ') : 'No subjects defined'}
            </div>
          ))}
        </div>
      )}

      {/* Fees Payment Section */}
      {dashboardSection === 'fees' && (
        <div style={{ margin: '24px 0' }}>
          <h3>Fees Payment</h3>
          {students.length === 0 && <div>No students registered yet.</div>}
          {students.map((s, i) => (
            <div key={i} style={{ marginBottom: 10, padding: 10, border: '1px solid #eee', borderRadius: 8 }}>
              <b>{s.name}</b>
              <button style={{ marginLeft: 12, padding: '6px 14px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => setSelected(i)}>Pay Fees</button>
              {selected === i && <FeePayment student={s} onPay={(amount, screenshot) => {
                const date = new Date().toLocaleDateString();
                const updated = [...students];
                updated[i].payments = [...(updated[i].payments || []), { amount, date, screenshot }];
                setStudents(updated);
                setSelected(null);
              }} />}
              {s.payments && s.payments.length > 0 && <PaymentTable student={s} />}
            </div>
          ))}
        </div>
      )}

      {/* Balance Sheet Section */}
      {dashboardSection === 'balancesheet' && <BalanceSheet students={students} />}

      {/* Payment of Teachers Section */}
      {dashboardSection === 'payteachers' && (
        <div style={{ margin: '24px 0' }}>
          <h3>Payment of Teachers</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th>Name</th>
                <th>Account</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(t => (
                <tr key={t.name}>
                  <td>{t.name}</td>
                  <td>{t.account}</td>
                  <td><input type="number" value={teacherPays[t.name] || ''} onChange={e => setTeacherPays({ ...teacherPays, [t.name]: e.target.value })} style={{ width: 100 }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={{ padding: '10px 24px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }} onClick={generatePaySlips}>Generate Pay Slips & Pay</button>
        </div>
      )}

      {/* Pay Slip Generation Section */}
      {dashboardSection === 'payslips' && (
        <div style={{ margin: '24px 0' }}>
          <h3>Pay Slip Generation</h3>
          {paySlips.length === 0 && <div>No pay slips generated yet.</div>}
          {paySlips.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th>Name</th>
                  <th>Gross Pay</th>
                  <th>Insurance (5%)</th>
                  <th>Tax (10%)</th>
                  <th>Net Pay</th>
                </tr>
              </thead>
              <tbody>
                {paySlips.map(slip => (
                  <tr key={slip.name}>
                    <td>{slip.name}</td>
                    <td>{slip.gross}</td>
                    <td>{slip.insurance}</td>
                    <td>{slip.tax}</td>
                    <td>{slip.net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Payments & Commission Section (always visible) */}
      <div style={{ margin: '32px 0', padding: 18, border: '2px solid #2196F3', borderRadius: 10, background: '#f7fbff' }}>
        <h3>Payments & Commission</h3>
        <ol style={{ lineHeight: 1.7 }}>
          <li><b>School Registration:</b> A school registers on the system for <b>$5</b>. Once registered, the school is integrated into the platform.</li>
          <li><b>Fee Collection:</b> Parents pay school fees directly to the school’s account (MTN Mobile Money, Orange Money, Bank, or Card). The school provides its payment details during setup. Parents can pay from home, and funds go straight to the school’s provided number/account.</li>
          <li><b>Platform Commission:</b> For every fee payment, <b>$0.25</b> is automatically sent to the platform’s account.<br/>
            <span style={{ color: '#185a9d' }}>Platform Mobile Money Number (Cameroon): <b>+237 675 142 175</b></span>
          </li>
          <li><b>Receipts & Notifications:</b> When a parent pays fees, a receipt is generated and sent to the parent’s phone. A copy stays in the office. The system updates the balance and notifies the parent with the mobile money number to use for payment.</li>
          <li><b>Future:</b> Electronic card payments will be supported for international payments.</li>
        </ol>
      </div>
    </div>
  );
}
