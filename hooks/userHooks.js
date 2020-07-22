import { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { setUser, setFamily, addMember } from '../actions/userActions';
import { selectUser, selectFamily } from '../selectors/userSelectors';
import { getFamilyById } from '../pages/api/family';
import { nanoid } from 'nanoid';
import { postMember } from '../pages/api/family';

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const family = useSelector(selectFamily);

  useEffect(() => {
    if(!user) {
      Auth.currentAuthenticatedUser()
        .then(({ username, attributes }) => dispatch(setUser({ id: attributes.sub, username, email: attributes.email })))
        .then(({ payload }) => getFamilyById(payload.id))
        .then((res) => dispatch(setFamily(res)))
        .catch((err) => console.log(err));
    }
  }, []);

  const checkLog = () => {
    Auth.currentAuthenticatedUser()
      .then((() => console.log('Logged in')))
      .catch(() => Router.push('/'));
  };

  const handleAddMember = (e, memberName, memberColor) => {
    e.preventDefault();
    const memberId = nanoid();
    const member = {
      id: memberId,
      name: memberName,
      color: memberColor,
      familyID: family.id
    };
    dispatch(addMember(member));
    // postMember(member)
    //   .then(res => console.log(res));
  };

  return {
    user,
    family,
    checkLog,
    handleAddMember
  };
};

export default useUser;
