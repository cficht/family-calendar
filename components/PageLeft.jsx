import React from 'react';
import SignOut from './SignOut';
import useUser from '../hooks/userHooks';
import AddEvent from './AddEvent';
import AdminButton from './AdminButton';
import styles from '../styles/tools.module.css';
import LoginButton from './LoginButton';
import ConfirmationButton from './ConfirmationButton';
import TargetDate from './TargetDate';

export default function PageLeft() {
  const { user, members } = useUser();

  const memberNodes = members?.map(member => <li key={member.id} style={{ backgroundColor: member.color }}><h5>{member.name}</h5></li>);

  return (
    <section>
      <ul>
        <li><TargetDate /></li>
        { !user ? <li><LoginButton /></li> : null }
        { !user ? <li><ConfirmationButton /></li> : null }
        { user ? <li><AdminButton /></li> : null }
        { user ? <li>
          <section className={styles.member_display}>
            <h3>Members:</h3>
            <ul>
              {memberNodes}
            </ul>
          </section>
        </li>
          : null}
        {members?.length > 0 ? <li><AddEvent /></li> : null}
        { user ? <li><SignOut /></li> : null }
      </ul>
    </section>
  );
}
