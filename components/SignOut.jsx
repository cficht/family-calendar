import React from 'react';
import useUser from '../hooks/userHooks';

export default function SignOut() {
  const { handleSignOut } = useUser();
  
  return (
    <section className="left-button">
      <button type="button" onClick={(e) => handleSignOut(e)}>Sign Out</button>
    </section>
  );
}
