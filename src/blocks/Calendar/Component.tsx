"use client";

import type {
	CalendarBlock as CalendarBlockProps,
	Event,
} from "src/payload-types";

import { cn } from "@/utilities/ui";
import type React from "react";
import type { View } from "react-big-calendar";
import { useState, useEffect, useMemo } from "react";
import { Calendar, type CalendarEvent } from "@/components/Calendar";
import { EventModal, type EventModalData } from "@/components/EventModal";

const baseClass = "calendar-block";

type Props = {
	className?: string;
	events?: Event[];
} & CalendarBlockProps;

export const CalendarBlock: React.FC<Props> = ({
	className,
	title,
	height = 500,
	view = "month",
	events = [],
}) => {
	const [isClient, setIsClient] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<EventModalData | null>(
		null,
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [currentView, setCurrentView] = useState<View>(view as View);

	useEffect(() => {
		setIsClient(true);
	}, []);

	// Transform events for the calendar component
	const calendarEvents: CalendarEvent[] = useMemo(() => {
		if (events && events.length > 0) {
			return events.map((event) => ({
				title: event.title,
				start: new Date(event.start),
				end: new Date(event.end),
				description: event.description,
				allDay: event.allDay,
			}));
		}
		return [];
	}, [events]);

	// Ensure height has a valid value for styling
	const calendarHeight = height || 500;

	const handleNavigate = (date: Date) => {
		setCurrentDate(date);
	};

	const handleViewChange = (viewName: View) => {
		setCurrentView(viewName);
	};

	const handleEventClick = (event: CalendarEvent) => {
		setSelectedEvent(event as EventModalData);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedEvent(null);
	};

	// Don't render the calendar until client-side hydration is complete
	if (!isClient) {
		return (
			<div
				className={cn(
					baseClass,
					"mx-auto my-8 px-4 sm:px-6 lg:px-8",
					className,
				)}
			>
				<div className="max-w-7xl mx-auto">
					{title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
					<div
						style={{ height: calendarHeight }}
						className="flex items-center justify-center bg-gray-100 rounded"
					>
						<div className="text-gray-600">Loading calendar...</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={cn(baseClass, "mx-auto my-8 px-4 sm:px-6 lg:px-8", className)}
		>
			<div className="max-w-7xl mx-auto">
				{title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
				<Calendar
					events={calendarEvents}
					height={calendarHeight}
					view={currentView}
					date={currentDate}
					onNavigate={handleNavigate}
					onView={handleViewChange}
					onSelectEvent={handleEventClick}
				/>

				<EventModal
					event={selectedEvent}
					isOpen={isModalOpen}
					onClose={closeModal}
				/>
			</div>
		</div>
	);
};
