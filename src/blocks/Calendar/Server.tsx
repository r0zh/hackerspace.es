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
	dataSource = "manual",
	categoryFilter,
	eventLimit = 50,
	...calendarProps
}: CalendarServerProps) {
	let events: Event[] = [];

	try {
		switch (dataSource) {
			case "upcoming":
				events = await getUpcomingEvents(eventLimit || 50);
				break;
			case "category":
				if (categoryFilter) {
					events = await getEventsByCategory(categoryFilter, eventLimit || 50);
				}
				break;
			case "all":
				events = await getEvents({ limit: eventLimit || 50 });
				break;
			case "manual":
				// Use the events from the CalendarBlock config
				events = [];
				break;
		}
	} catch (error) {
		console.error("Error fetching events for calendar:", error);
		events = [];
	}

	return (
		<CalendarBlock
			{...calendarProps}
			className={className}
			dataSource={dataSource}
			categoryFilter={categoryFilter}
			eventLimit={eventLimit}
			eventsList={events.length > 0 ? events : null}
		/>
	);
}
