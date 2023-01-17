// @deno-types="pocketbase-types"
import PocketBase, { 
	Record as RecordPocket,
} from "pocketbase";
import { App } from "@/types/App.ts";
import { User } from "@/types/User.ts";

const DEV = Deno.env.get("DENO_DEPLOYMENT_ID") === undefined;
export const getPocketbase = () => {
	const pocketbase = new PocketBase(DEV ? "http://localhost:8090" : "https://pocketbase.io");
	pocketbase.autoCancellation(false);
	return pocketbase;
}

export interface AppResult {
	app: App | null; 
	error: {
		code: number,
		message: string,
	} | null;
}

export interface AppsResult {
	apps: App[] | null; 
	error: {
		code: number,
		message: string,
	} | null;
}

export const getApp = async (appId: string, thumbSize?: string): Promise<AppResult> => {
	const pocketbase = getPocketbase();
	try {
		const record = await pocketbase.collection("apps")
		.getOne(appId);

		const app = record.export() as App;

		return {
			app: {
				...app,
				icon: pocketbase.getFileUrl(record, record.icon, { thumbSize: thumbSize }),
				screenshots: record.screenshots?.map((screenshot: string) => pocketbase.getFileUrl(record, screenshot)) ?? null,
			},
			error: null,
		}
	} catch (e) {
		return {
			app: null,
			error: {
				code: e.code,
				message: e.message,
			}
		}
	}
}

export const getApps = async (page: number, perPage: number, queryParams?: Record<string, string>, thumbSize?: string): Promise<AppsResult> => {
	const pocketbase = getPocketbase();
	try {
		const records = await pocketbase.collection("apps")
			.getList(page, perPage, queryParams)
		
		return {
			apps: records.items.map((record: RecordPocket) => {
				const app = record.export() as App;

				return {
					...app,
					icon: pocketbase.getFileUrl(record, record.icon, { thumb: thumbSize || "48x48" }),
					screenshots: record.screenshots?.map((screenshot: string) => pocketbase.getFileUrl(record, screenshot)) ?? null,
				}
			}),
			error: null,
		}
	} catch(e) {
		return {
			apps: null,
			error: {
				code: e.code,
				message: e.message,
			}
		}
	}
}


export const getUser = async (pocketbase: PocketBase): Promise<User | null> => {
	if (!pocketbase.authStore.isValid) {
		return null;
	}

	const model = pocketbase.authStore.model;

	if (!model) {
		return null;
	}

	const record = await pocketbase.collection("users")
		.getOne(model.id);

	const user: User = {
		id: model.id,
		email: model.email,
		avatar_url: record.avatar_url,
		name: record.name,
		providers: await pocketbase.collection("users").listExternalAuths(model.id).then((providers) => providers.map((provider) => provider.provider)),
	}

	return user;
}

export type {
	RecordPocket
}
