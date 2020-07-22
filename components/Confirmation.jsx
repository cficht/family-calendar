import React, { useState } from 'react';
import { confirmSignUp } from '../pages/api/auth';

export default function Confirmation() {
  const [userName, setUserName] = useState('');
  const [confirmation, setConfirmation] = useState('');

  return (
    <section className="auth-box">
      <h3>Confirm Your Account</h3>
      <form onSubmit={(e) => confirmSignUp(e, userName, confirmation)}>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
        <input type="text" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} placeholder="Code" />
        <button type="submit">Confirm</button>
      </form>
    </section>
  );
}
