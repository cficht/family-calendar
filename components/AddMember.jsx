import React, { useState } from 'react';
import useUser from '../hooks/userHooks';

export default function AddMember() {
  const { handleAddMember } = useUser();
  const [memberName, setMemberName] = useState('');
  const [memberColor, setMemberColor] = useState(`#${Math.floor(Math.random() * 16777215).toString(16)}`);

  return (
    <section className="add-member-box">
      <h2>Add Family Member:</h2> 
      <form onSubmit={(e) => handleAddMember(e, memberName, memberColor)}>
        <label>Name:<input type="text" value={memberName} onChange={(e) => setMemberName(e.target.value)}/></label>
        <label>Color:<input type="color" value={memberColor} onChange={(e) => setMemberColor(e.target.value)}/></label>
        <button type="submit">Add</button>
      </form>
    </section>
  );
}
