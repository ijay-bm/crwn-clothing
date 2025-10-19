import { type User, onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";
import { auth } from "~/firebase";
import { userProfileService } from "~/services/user-profile.service";
import type { UserProfile } from "~/types/user-profile.types";

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  profile: null,
  loading: true,
  setUser: user => set({ user }),
  setProfile: profile => set({ profile }),
  setLoading: loading => set({ loading }),
}));

export function intitializeOnAuthStateChanged() {
  const unsubscribe = onAuthStateChanged(auth, async user => {
    useAuthStore.getState().setUser(user);

    if (user) {
      try {
        const profile = await userProfileService.find(user.uid);
        useAuthStore.getState().setProfile(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    } else {
      useAuthStore.getState().setProfile(null);
      useAuthStore.getState().setLoading(false);
    }
  });

  return unsubscribe;
}
