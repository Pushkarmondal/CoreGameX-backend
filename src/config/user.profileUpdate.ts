import { z } from "zod";

export const updateUserProfile = z.object({
  email: z.email(),
  username: z.string().min(3),
  bio: z.string().min(3),
  profilePic: z.url(),
});

