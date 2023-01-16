// @deno-types="pocketbase-types"
import PocketBase, { Record as RecordPocket } from "pocketbase";
import { App } from "@/types/App.ts";

const DEV = Deno.env.get("DENO_DEPLOYMENT_ID") === undefined;
export const pocketbase = new PocketBase(DEV ? "http://localhost:8090" : "https://pocketbase.io");


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

export const getApp = async (appId: string): Promise<AppResult> => {
	try {
		const record = await pocketbase.collection("apps")
		.getOne(appId);

		const app = record.export() as App;

		return {
			app: {
				...app,
				icon: pocketbase.getFileUrl(record, record.icon),
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

export const getApps = async (page: number, perPage: number, queryParams?: Record<string, string>): Promise<AppsResult> => {
	try {
		const records = await pocketbase.collection("apps")
			.getList(page, perPage, queryParams)
		
		return {
			apps: records.items.map((record: RecordPocket) => {
				const app = record.export() as App;

				return {
					...app,
					icon: pocketbase.getFileUrl(record, record.icon),
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

export {
	RecordPocket
}
