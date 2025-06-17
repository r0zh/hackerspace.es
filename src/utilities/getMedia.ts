import { getPayload } from "payload";
import config from "@payload-config";
import type { Media } from "src/payload-types";
import type { Where } from "payload";

interface GetMediaOptions {
	limit?: number;
	where?: Where;
	sort?: string;
}

export async function getMedia(
	options: GetMediaOptions = {},
): Promise<Media[]> {
	const { limit = 50, where = {}, sort = "createdAt" } = options;

	try {
		const payload = await getPayload({ config });

		const media = await payload.find({
			collection: "media",
			limit,
			sort,
			where,
		});

		return media.docs;
	} catch (error) {
		console.error("Error fetching media:", error);
		return [];
	}
}

export async function getMediaByEvent(
	eventId: number | string,
): Promise<Media[]> {
	return getMedia({
		where: {
			linkedEvent: {
				equals: eventId,
			},
		},
		sort: "createdAt",
	});
}

export async function getAllMedia(): Promise<Media[]> {
	return getMedia({
		sort: "createdAt",
	});
}
