import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

const useUser = () => {
  // REDUX
  const [user, setUser] = useState();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(({ username, attributes }) => setUser({ username, attributes }))
      .catch((err) => console.log(err));
  }, []);

  return {
    user,
  };
};

export default useUser;
