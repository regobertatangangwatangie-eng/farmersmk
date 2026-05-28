import React, { useState } from 'react';

function GrantMenu({ onSelect }) {
  return (
    <div style={{ textAlign: 'center', marginTop: 32 }}>
      <h2>Grant Service</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '24px 0' }}>
        <button onClick={() => onSelect('signup')} style={{ padding: '14px 32px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 8, fontSize: 18 }}>Sign Up</button>
        <button onClick={() => onSelect('signin')} style={{ padding: '14px 32px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 8, fontSize: 18 }}>Sign In</button>
      </div>
      <div style={{ marginTop: 18, color: '#888', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
        <b>How It Works</b><br />
        1. Sign up to register your grant application, or sign in if you already have an account.<br />
        2. Registration costs <b>$50</b>. After payment, upload a <b>2.5-minute video</b> for public voting.<br />
        3. Share your voting link. Each vote costs <b>$1</b> (pay to <b>675 142 175</b>). Vote count updates after payment.<br />
        4. After voting, upload a <b>5-minute pitching video</b> for admin review.<br />
        5. Total grant amount: <b>2,500,000</b>.<br />
      </div>
    </div>
  );
}



function GrantRegistration({ onNext }) {
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/grants/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'demo-user', phone, whatsapp })
      });
      if (!res.ok) throw new Error('Registration failed');
      onNext();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24 }}>
      <h3>Grant Registration</h3>
      <div style={{ margin: '12px 0' }}>
        <b>Pay $50 registration fee to continue.</b>
      </div>
      <input
        placeholder="Phone number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        style={{ width: '100%', marginBottom: 10, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <input
        placeholder="WhatsApp number"
        value={whatsapp}
        onChange={e => setWhatsapp(e.target.value)}
        style={{ width: '100%', marginBottom: 10, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <button
        style={{ padding: '10px 24px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }}
        onClick={handleRegister}
        disabled={loading || !phone || !whatsapp}
      >
        {loading ? 'Registering...' : 'Pay & Continue'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </div>
  );
}

function ProjectSubmission({ onNext }) {
  const [desc, setDesc] = useState('');
  return (
    <div style={{ maxWidth: 400, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24 }}>
      <h3>Project Submission</h3>
      <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe your project and what you want the grant to sponsor..." style={{ width: '100%', minHeight: 80, marginBottom: 16, borderRadius: 6, border: '1px solid #ccc', padding: 10 }} />
      <button style={{ padding: '10px 24px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }} onClick={onNext} disabled={!desc.trim()}>Next: Upload Video</button>
    </div>
  );
}

function VideoUpload({ onNext }) {
  const [file, setFile] = useState(null);
  return (
    <div style={{ maxWidth: 400, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24 }}>
      <h3>Upload 3-Minute Pitch Video</h3>
      <input type="file" accept="video/*" onChange={e => setFile(e.target.files[0])} />
      <div style={{ margin: '12px 0', color: '#888' }}>Max length: 3 minutes</div>
      <button style={{ padding: '10px 24px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }} onClick={onNext} disabled={!file}>Submit Project</button>
    </div>
  );
}

function VotingLink({ link }) {
  return (
    <div style={{ maxWidth: 400, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24, textAlign: 'center' }}>
      <h3>Voting Link</h3>
      <div style={{ margin: '12px 0' }}>Share this link to get votes for your project. Each vote costs $1.</div>
      <input value={link} readOnly style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 12 }} />
      <button onClick={() => navigator.clipboard.writeText(link)} style={{ padding: '8px 18px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }}>Copy Link</button>
    </div>
  );
}

export default function GrantService() {
  const [step, setStep] = useState('menu'); // menu | signup | signin | registration | project | video | voting | pitch | done
  const [votingLink, setVotingLink] = useState('https://farmersmk.com/vote/your-project-id');
  const [signedIn, setSignedIn] = useState(false);

  // Simple sign up/in forms (mocked)
  function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
      <div style={{ maxWidth: 400, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24 }}>
        <h3>Grant Service Sign Up</h3>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', marginBottom: 10, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', marginBottom: 18, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        <button style={{ padding: '10px 24px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => { setSignedIn(true); setStep('registration'); }}>Sign Up</button>
        <div style={{ marginTop: 12, color: '#2196F3', cursor: 'pointer' }} onClick={() => setStep('signin')}>Already have an account? Sign In</div>
      </div>
    );
  }
  function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
      <div style={{ maxWidth: 400, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24 }}>
        <h3>Grant Service Sign In</h3>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', marginBottom: 10, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', marginBottom: 18, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        <button style={{ padding: '10px 24px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => { setSignedIn(true); setStep('registration'); }}>Sign In</button>
        <div style={{ marginTop: 12, color: '#4CAF50', cursor: 'pointer' }} onClick={() => setStep('signup')}>Need an account? Sign Up</div>
      </div>
    );
  }

  // Registration fee and info
  function RegistrationStep() {
    return (
      <div style={{ maxWidth: 420, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 28 }}>
        <h3>Grant Registration</h3>
        <div style={{ margin: '12px 0' }}>
          <b>Pay $50 registration fee to continue.</b><br />
          Pay to: <b>675 142 175</b>
        </div>
        <button style={{ padding: '10px 24px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => setStep('project')}>I Have Paid</button>
      </div>
    );
  }

  // Project description
  function ProjectSubmission({ onNext }) {
    const [desc, setDesc] = useState('');
    return (
      <div style={{ maxWidth: 400, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24 }}>
        <h3>Project Submission</h3>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe your project and what you want the grant to sponsor..." style={{ width: '100%', minHeight: 80, marginBottom: 16, borderRadius: 6, border: '1px solid #ccc', padding: 10 }} />
        <button style={{ padding: '10px 24px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }} onClick={onNext} disabled={!desc.trim()}>Next: Upload 2.5-min Video</button>
      </div>
    );
  }

  // 2.5-min video for voting
  function VotingVideoUpload({ onNext }) {
    const [file, setFile] = useState(null);
    return (
      <div style={{ maxWidth: 400, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24 }}>
        <h3>Upload 2.5-Minute Video for Voting</h3>
        <input type="file" accept="video/*" onChange={e => setFile(e.target.files[0])} />
        <div style={{ margin: '12px 0', color: '#888' }}>Max length: 2.5 minutes</div>
        <button style={{ padding: '10px 24px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }} onClick={onNext} disabled={!file}>Generate Voting Link</button>
      </div>
    );
  }

  // Voting link and instructions
  function VotingLinkStep({ link, onNext }) {
    return (
      <div style={{ maxWidth: 420, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24, textAlign: 'center' }}>
        <h3>Voting Link</h3>
        <div style={{ margin: '12px 0' }}>Share this link to get votes for your project. Each vote costs <b>$1</b>.<br />
        Payment number: <b>675 142 175</b><br />
        Vote count updates after payment.</div>
        <input value={link} readOnly style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 12 }} />
        <button onClick={() => navigator.clipboard.writeText(link)} style={{ padding: '8px 18px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6, marginBottom: 16 }}>Copy Link</button>
        <div style={{ margin: '18px 0', color: '#888' }}>
          When voting is done, upload your 5-min pitching video for admin review.
        </div>
        <button style={{ padding: '10px 24px', background: '#1565c0', color: '#fff', border: 'none', borderRadius: 6 }} onClick={onNext}>Next: Upload Pitching Video</button>
      </div>
    );
  }

  // 5-min pitching video for admin
  function PitchingVideoUpload() {
    const [file, setFile] = useState(null);
    return (
      <div style={{ maxWidth: 400, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24 }}>
        <h3>Upload 5-Minute Pitching Video</h3>
        <input type="file" accept="video/*" onChange={e => setFile(e.target.files[0])} />
        <div style={{ margin: '12px 0', color: '#888' }}>Max length: 5 minutes<br />
        This video is for admin review. Explain your project, why you should be sponsored, the budget needed, and how you will use it.</div>
        <button style={{ padding: '10px 24px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => setStep('done')} disabled={!file}>Submit Pitching Video</button>
      </div>
    );
  }

  if (step === 'menu') return <GrantMenu onSelect={s => setStep(s)} />;
  if (step === 'signup') return <SignUpForm />;
  if (step === 'signin') return <SignInForm />;
  if (step === 'registration') return <RegistrationStep />;
  if (step === 'project') return <ProjectSubmission onNext={() => setStep('video')} />;
  if (step === 'video') return <VotingVideoUpload onNext={() => setStep('voting')} />;
  if (step === 'voting') return <VotingLinkStep link={votingLink} onNext={() => setStep('pitch')} />;
  if (step === 'pitch') return <PitchingVideoUpload />;
  if (step === 'done') return (
    <div style={{ maxWidth: 420, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 28, textAlign: 'center' }}>
      <h2>Thank You!</h2>
      <div style={{ margin: '18px 0' }}>Your application and videos have been submitted.<br />The admin will review your pitching video and contact you if you qualify for the grant.<br /><br />Total grant amount: <b>2,500,000</b></div>
    </div>
  );
  return null;
}
