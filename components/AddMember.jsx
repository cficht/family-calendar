import React, { useState } from 'react';
import useUser from '../hooks/userHooks';
import styles from '../styles/admin.module.css';

export default function AddMember() {
  const [memberName, setMemberName] = useState('');
  const [memberColor, setMemberColor] = useState(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  const { handleAddMember, handleNotification } = useUser();

  return (
    <section className={styles.member_box}>
      <h2>Add Family Member:</h2> 
      <form onSubmit={(e) => {
        try {
          handleAddMember(e, memberName, memberColor, setMemberName, setMemberColor);
        } catch(error) {
          handleNotification(error);
        }
      }}>
        <label>Name:<input type="text" value={memberName} onChange={(e) => setMemberName(e.target.value)}/></label>
        <label>Color:<input type="color" value={memberColor} onChange={(e) => setMemberColor(e.target.value)}/></label>
        <button type="submit">Add</button>
      </form>
    </section>
  );
}
