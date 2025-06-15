import React from "react";
import type {
	CalendarBlock as CalendarBlockProps,
	Event,
} from "src/payload-types";
import { CalendarBlock } from "./Component";
import {
	getUpcomingEvents,
	getEventsByCategory,
	getEvents,
} from "@/utilities/getEvents";

interface CalendarServerProps extends CalendarBlockProps {
	className?: string;
}

export async function CalendarServer({
	className,
	dataSource = "all",
	categoryFilter,
	...calendarProps
}: CalendarServerProps) {
	let events: Event[] = [];

	try {
		switch (dataSource) {
			case "upcoming":
				events = await getUpcomingEvents();
				break;
			case "category":
				if (categoryFilter) {
					events = await getEventsByCategory(categoryFilter);
				}
				break;
			default:
				events = await getEvents();
				break;
		}
	} catch (error) {
		console.error("Error fetching events for calendar:", error);
		events = [];
	}

	return (
		<CalendarBlock {...calendarProps} className={className} events={events} />
	);
}
