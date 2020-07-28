import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useUser from '../hooks/userHooks';
import styles from '../styles/admin.module.css';

export default function UpdateMember({ member }) {
  const [memberName, setMemberName] = useState(member.name);
  const [memberColor, setMemberColor] = useState(member.color);
  const { handleUpdateMember, handleDeleteMember, handleNotification } = useUser();
  
  return (
    <li key={member.id} style={{ backgroundColor: member.color }} className={styles.member_node}>
      <h3>{member.name}</h3>
      <form onSubmit={(e) => {
        try {
          handleUpdateMember(e, member.id, memberName, memberColor);
        } catch(error) {
          handleNotification(error);
        }
      }} className={styles.member_node_update}>
        <label>Name:<input type="text" value={memberName} onChange={(e) => setMemberName(e.target.value)}/></label>
        <label>Color:<input type="color" value={memberColor} onChange={(e) => setMemberColor(e.target.value)}/></label>
        <button>Update</button>
      </form>
      <button onClick={(e) => handleDeleteMember(e, member.id)}>Delete</button>
    </li>
  );
}

UpdateMember.propTypes = {
  member: PropTypes.object
};
