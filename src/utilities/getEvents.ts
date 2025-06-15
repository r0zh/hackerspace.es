import { getPayload } from "payload";
import config from "@payload-config";
import type { Event } from "src/payload-types";
import type { Where } from "payload";

interface GetEventsOptions {
	limit?: number;
	where?: Where;
	sort?: string;
}

export async function getEvents(
	options: GetEventsOptions = {},
): Promise<Event[]> {
	const { limit = 50, where = {}, sort = "start" } = options;

	try {
		const payload = await getPayload({ config });

		const events = await payload.find({
			collection: "events",
			limit,
			sort,
			where,
		});

		return events.docs;
	} catch (error) {
		console.error("Error fetching events:", error);
		return [];
	}
}

export async function getUpcomingEvents(): Promise<Event[]> {
	const now = new Date().toISOString();

	return getEvents({
		where: {
			start: {
				greater_than_equal: now,
			},
		},
		sort: "start",
	});
}

export async function getEventsByDateRange(
	startDate: Date,
	endDate: Date,
): Promise<Event[]> {
	return getEvents({
		where: {
			and: [
				{
					start: {
						greater_than_equal: startDate.toISOString(),
					},
				},
				{
					end: {
						less_than_equal: endDate.toISOString(),
					},
				},
			],
		},
		sort: "start",
	});
}

export async function getEventsByCategory(category: string): Promise<Event[]> {
	return getEvents({
		where: {
			category: {
				equals: category,
			},
		},
		sort: "start",
	});
}
