import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../contexts/authContext';

interface IUser {
  id: string;
  name: string;
  avatar: string;
}

interface IUseAuth {
  user: IUser;
  signIn(): Promise<void>;
}

export function useAuth(): IUseAuth {
  const user = useContextSelector(AuthContext, authContext => authContext.user);
  const signIn = useContextSelector(
    AuthContext,
    authContext => authContext.signIn,
  );

  return {
    user,
    signIn,
  };
}
