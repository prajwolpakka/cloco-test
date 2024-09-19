import { User, UserArtist, UserArtistManager, UserSuperAdmin } from "types/user";
import { http } from "utils/http";

export async function createUser(data: UserSuperAdmin | UserArtistManager | UserArtist) {
	try {
		const response = await http.post(`/users`, data);
		return response.data;
	} catch (err: any) {
		if (err?.response?.data?.name === "ZodError") {
			const errorMessages = err.response.data.issues.map((issue: any) => `${issue.message}`).join(", ");
			return { error: errorMessages };
		} else {
			return { error: err?.response?.data?.error ?? "An unknown error occurred" };
		}
	}
}

export async function deleteUser(data: User) {
	try {
		const response = await http.delete(`/users/${data.id}`);
		return response.data;
	} catch (err: any) {
		return { error: err?.response?.data?.error ?? "An unknown error occurred" };
	}
}
