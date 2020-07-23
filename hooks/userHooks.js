import { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { setUser, setFamily, addMember, changeMember, subtractMember } from '../actions/userActions';
import { selectUser, selectFamily, selectMembers } from '../selectors/userSelectors';
import { getFamilyById } from '../pages/api/family';
import { nanoid } from 'nanoid';

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const family = useSelector(selectFamily);
  const members = useSelector(selectMembers);

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

  const handleAddMember = (e, memberName, memberColor, setMemberColor) => {
    e.preventDefault();
    const memberId = nanoid();
    const member = {
      id: memberId,
      name: memberName,
      color: memberColor,
      familyID: family.id
    };
    dispatch(addMember(member));
    setMemberColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  };

  const handleUpdateMember = (e, memberId, memberName, memberColor) => {
    e.preventDefault();
    const member = {
      id: memberId,
      name: memberName,
      color: memberColor
    };
    dispatch(changeMember(member));
  };

  const handleDeleteMember = (e, memberId) => {
    e.preventDefault();
    dispatch(subtractMember(memberId));
  };

  return {
    user,
    family,
    members,
    checkLog,
    handleAddMember,
    handleUpdateMember,
    handleDeleteMember
  };
};

export default useUser;
