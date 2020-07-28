import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useUser from '../hooks/userHooks';
import styles from '../styles/admin.module.css';

export default function UpdateFamily(family) {
  const [familyName, setFamilyName] = useState('');
  const { handleUpdateFamily, handleNotification } = useUser();

  useEffect(() => {
    if(family?.family.name) setFamilyName(family?.family.name);
  }, [family]);

  return (
    <section className={styles.member_box}>
      <h2>Change Family Name:</h2> 
      <form onSubmit={(e) => {
        try {
          handleUpdateFamily(e, family.family.id, familyName);
        } catch(error) {
          handleNotification(error);
        }
      }}>
        <label>Name:<input type="text" value={familyName} onChange={(e) => setFamilyName(e.target.value)}/></label>
        <button type="submit">Update</button>
      </form>
    </section>
  );
}

UpdateFamily.propTypes = {
  family: PropTypes.object
};
