import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { userProfileService } from "~/services/user-profile.service";
import { useAuthStore } from "~/store/auth";
import type { UserProfile } from "~/types/user-profile.types";

import { auth, googleAuthProvider } from "../firebase/index";

export function useAuth() {
  const setUser = useAuthStore(state => state.setUser);
  const setProfile = useAuthStore(state => state.setProfile);
  const setLoading = useAuthStore(state => state.setLoading);

  const register = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userProfile = await userProfileService.findOrCreate({
        userId: user.uid,
        email: user.email,
        displayName,
        photoURL: user.photoURL,
      } satisfies UserProfile);

      setUser(user);
      setProfile(userProfile);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw error;
      }
      throw new Error("Unexpected error during Google sign-in");
    }
  };

  const socialLogin = async () => {
    try {
      setLoading(true);
      const { user } = await signInWithPopup(auth, googleAuthProvider);

      const userProfile = await userProfileService.findOrCreate({
        userId: user.uid,
        email: user.email,
        displayName: user.displayName, // ! TODO TBF - can `displayName` from Google actually be null?
        photoURL: user.photoURL,
      });

      setUser(user);
      setProfile(userProfile);

      return user;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw error;
      }
      throw new Error("Unexpected error during Google sign-in");
    } finally {
      setLoading(false);
    }
  };

  const redirectLogin = async () => {
    try {
      setLoading(true);
      await signInWithRedirect(auth, new GoogleAuthProvider());
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof FirebaseError) {
        throw error;
      }
      throw new Error("Unexpected error during Google sign-in");
    }
  };

  const resolveRedirectLogin = async () => {
    try {
      setLoading(true);
      const response = await getRedirectResult(auth);

      if (!response) {
        return null;
      }

      const { user } = response;

      const userProfile = await userProfileService.findOrCreate({
        userId: user.uid,
        email: user.email,
        displayName: user.displayName, // ! TODO TBF - can `displayName` from Google actually be null?
        photoURL: user.photoURL,
      });

      setUser(user);
      setProfile(userProfile);

      return { user, userProfile };
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error("Redirect login error:", error);
        throw error;
      }
      throw new Error("Unexpected error resolving redirect login");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const userProfile = await userProfileService.find(user.uid);

      setUser(user);
      setProfile(userProfile);

      return user;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw error;
      }
      throw new Error("Unexpected error during sign-in");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      setProfile(null);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw error;
      }
      throw new Error("Unexpected error during sign-out");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    socialLogin,
    redirectLogin,
    resolveRedirectLogin,
    logout,
  };
}
