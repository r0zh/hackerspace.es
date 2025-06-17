"use client";

import type React from "react";
import {
	Calendar as BigCalendar,
	momentLocalizer,
	type View,
} from "react-big-calendar";
import moment from "moment";
import { cn } from "@/utilities/ui";
import "./index.scss";

const localizer = momentLocalizer(moment);

export interface CalendarEvent {
	title: string;
	start: Date;
	end: Date;
	description?: string | null;
	allDay?: boolean | null;
}

interface CalendarProps {
	className?: string;
	events: CalendarEvent[];
	height?: number | string;
	view?: View;
	date?: Date;
	onNavigate?: (date: Date) => void;
	onView?: (view: View) => void;
	onSelectEvent?: (event: CalendarEvent) => void;
}

const baseClass = "calendar-component";

export const Calendar: React.FC<CalendarProps> = ({
	className,
	events = [],
	height = "100%",
	view = "month",
	date = new Date(),
	onNavigate,
	onView,
	onSelectEvent,
}) => {
	// Custom title accessor to show only the event title without time
	const eventTitleAccessor = (event: CalendarEvent) => {
		return event.title;
	};

	// Custom formats to prevent time from being added to event titles
	const formats = {
		eventTimeRangeFormat: () => "",
	};

	// Custom event component to display only the title
	const EventComponent = ({ event }: { event: CalendarEvent }) => {
		return <div className="calendar-event-title">{event.title}</div>;
	};

	return (
		<div className={cn(baseClass, className)} style={{ height }}>
			<BigCalendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				titleAccessor={eventTitleAccessor}
				allDayAccessor="allDay"
				view={view}
				date={date}
				onNavigate={onNavigate}
				onView={onView}
				onSelectEvent={onSelectEvent}
				formats={formats}
				components={{
					event: EventComponent,
				}}
				style={{ height: "100%" }}
			/>
		</div>
	);
};
