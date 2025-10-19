import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase";
import type { UserProfile } from "~/types/user-profile.types";

const USER_PROFILES_COLLECTION = "user_profiles";

export const userProfileService = {
  /**
   * Get user profile document from Firestore
   */
  async find(uid: string): Promise<UserProfile | null> {
    const userDoc = await getDoc(doc(db, USER_PROFILES_COLLECTION, uid));

    if (!userDoc.exists()) {
      return null;
    }

    const data = userDoc.data();

    return {
      userId: data.userId,
      email: data.email,
      displayName: data.displayName,
      photoURL: data.photoURL,
    } satisfies UserProfile;
  },

  /**
   * Create a new user profile document
   */
  async create(userProfile: UserProfile): Promise<UserProfile> {
    await setDoc(
      doc(db, USER_PROFILES_COLLECTION, userProfile.userId),
      userProfile,
    );

    return {
      userId: userProfile.userId,
      email: userProfile.email,
      displayName: userProfile.displayName,
      photoURL: userProfile.photoURL,
    } satisfies UserProfile;
  },

  /**
   * Find or create user profile document
   */
  async findOrCreate(userProfile: UserProfile): Promise<UserProfile> {
    if (userProfile.userId) {
      const existingUser = await this.find(userProfile.userId);

      if (existingUser) {
        return existingUser;
      }
    }

    return await this.create(userProfile);
  },
};
