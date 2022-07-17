import type { User } from "@/types/User.ts";
import { githubAPI } from "@/utils/github.ts";
import { supabase } from "@supabase"; 

/**
 * This hook returns the user data from the database.
 * If the user data is not found, it returns null.
 * 
 * @param access_token Access token from GitHub API
 * @returns The user data or null.
 */
export const useUserServerSide = async (access_token: string): Promise<User | null> => {
	let githubData: User | null = null;

	githubData = await githubAPI.getUserData(access_token);
	
	const { data } = await supabase.from<User>("users")
		.select("*")
		.eq("id", githubData.id)
		.single();

	if (!data) return null;
	
	return data;
}