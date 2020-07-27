import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useUser from '../hooks/userHooks';

export default function UpdateMember({ member }) {
  const { handleUpdateMember, handleDeleteMember, handleNotification } = useUser();
  const [memberName, setMemberName] = useState(member.name);
  const [memberColor, setMemberColor] = useState(member.color);

  return (
    <li key={member.id} style={{ backgroundColor: member.color }} className="member-node">
      <h3>{member.name}</h3>
      <form onSubmit={(e) => {
        try {
          handleUpdateMember(e, member.id, memberName, memberColor);
        } catch(error) {
          handleNotification(error);
        }
      }} className="member-node-update">
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
