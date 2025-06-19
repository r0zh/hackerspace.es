import { getPayload } from "payload";
import config from "@payload-config";
import type { Sponsor } from "src/payload-types";
import type { Where } from "payload";

interface GetSponsorsOptions {
	limit?: number;
	where?: Where;
	sort?: string;
}

export async function getSponsors(
	options: GetSponsorsOptions = {},
): Promise<Sponsor[]> {
	const { limit = 50, where = {}, sort = "-priority" } = options;

	try {
		const payload = await getPayload({ config });

		const sponsors = await payload.find({
			collection: "sponsors",
			limit,
			sort,
			where: {
				active: { equals: true },
				...where,
			},
		});

		return sponsors.docs;
	} catch (error) {
		console.error("Error fetching sponsors:", error);
		return [];
	}
}

export async function getAllActiveSponsors(): Promise<Sponsor[]> {
	return getSponsors({
		sort: "-priority",
		where: {
			active: { equals: true },
		},
	});
}
