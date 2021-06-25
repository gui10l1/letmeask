import { useEffect, useState, useCallback, FC } from 'react';
import { createContext } from 'use-context-selector';
import { useHistory } from 'react-router-dom';

import { firebase, auth } from '../services/firebase';

interface IUser {
  id: string;
  name: string;
  avatar: string;
}

interface IAuthContext {
  signIn(): Promise<void>;
  user: IUser;
}

export const AuthContext = createContext({} as IAuthContext);

const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  const { push } = useHistory();

  useEffect(() => {
    const unsubscribeListener = auth.onAuthStateChanged(userFromState => {
      if (userFromState) {
        const { uid, photoURL, displayName } = userFromState;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from your Google account!');
        }

        setUser({
          id: uid,
          avatar: photoURL,
          name: displayName,
        });
      }
    });

    return () => {
      unsubscribeListener();
    };
  }, [push]);

  const signIn = useCallback(async () => {
    const service = new firebase.auth.GoogleAuthProvider();

    const authResult = await auth.signInWithPopup(service);

    if (authResult.user) {
      const { uid, photoURL, displayName } = authResult.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from your Google account!');
      }

      setUser({
        id: uid,
        avatar: photoURL,
        name: displayName,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
