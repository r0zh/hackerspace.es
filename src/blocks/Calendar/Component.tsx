"use client";

import type {
	CalendarBlock as CalendarBlockProps,
	Event,
} from "src/payload-types";

import { cn } from "@/utilities/ui";
import type React from "react";
import { Calendar, momentLocalizer, type View } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";

// TODO review code and style

const localizer = momentLocalizer(moment);

type Props = {
	className?: string;
	eventsList?: Event[] | null; // Optional external events list
} & CalendarBlockProps;

type EventModalData = {
	title: string;
	start: Date;
	end: Date;
	description?: string | null;
	allDay?: boolean | null;
};

const EventModal: React.FC<{
	event: EventModalData | null;
	isOpen: boolean;
	onClose: () => void;
}> = ({ event, isOpen, onClose }) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen || !event) return null;

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
			onClick={(e) => {
				// Only close if clicking directly on the backdrop, not on any child elements
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					onClose();
				}
			}}
			tabIndex={-1}
		>
			<div
				className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border-0 relative"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between items-start mb-4">
					<h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
					<button
						type="button"
						onClick={onClose}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								onClose();
							}
						}}
						className="text-gray-400 hover:text-gray-600 text-xl font-bold"
						aria-label="Close modal"
					>
						×
					</button>
				</div>

				<div className="space-y-3">
					<div>
						<p className="text-sm font-medium text-gray-600">Date</p>
						<p className="text-gray-900">{formatDate(event.start)}</p>
					</div>

					{!event.allDay && (
						<div>
							<p className="text-sm font-medium text-gray-600">Time</p>
							<p className="text-gray-900">
								{formatTime(event.start)} - {formatTime(event.end)}
							</p>
						</div>
					)}

					{event.description && (
						<div>
							<p className="text-sm font-medium text-gray-600">Description</p>
							<p className="text-gray-900">{event.description}</p>
						</div>
					)}
				</div>

				<div className="mt-6">
					<button
						type="button"
						onClick={onClose}
						className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export const CalendarBlock: React.FC<Props> = ({
	className,
	title,
	height = 500,
	view = "month",
	dataSource = "manual",
	categoryFilter,
	eventLimit = 50,
	events = [],
	eventsList = null,
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

	// Prioritize external events list over block events
	const sourceEvents = eventsList || events || [];

	// Transform the events data to match react-big-calendar format
	const transformedEvents = sourceEvents.map((event) => ({
		title: event.title,
		start: new Date(event.start),
		end: new Date(event.end),
		description: event.description,
		allDay: event.allDay,
	}));

	const calendarHeight = height || 500;

	// Use a static date for the sample event to prevent hydration mismatch when no events
	const hardCodedEvents =
		transformedEvents.length > 0
			? transformedEvents
			: [
					{
						title: "Sample Event",
						start: new Date(2025, 5, 15, 10, 0, 0), // June 15, 2025, 10:00 AM
						end: new Date(2025, 5, 15, 11, 0, 0), // June 15, 2025, 11:00 AM
						description: "This is a sample event description.",
						allDay: false,
					},
				];

	const handleNavigate = (date: Date) => {
		setCurrentDate(date);
	};

	const handleViewChange = (viewName: View) => {
		setCurrentView(viewName);
	};

	const handleEventClick = (event: EventModalData) => {
		setSelectedEvent(event);
		setIsModalOpen(true);
	};

	const handleSlotSelect = (slotInfo: {
		start: Date;
		end: Date;
		slots: Date[];
	}) => {
		console.log("Slot selected:", slotInfo);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedEvent(null);
	};

	// Don't render the calendar until client-side hydration is complete
	if (!isClient) {
		return (
			<div className={cn("mx-auto my-8 px-4 sm:px-6 lg:px-8", className)}>
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
		<div className={cn("mx-auto my-8 px-4 sm:px-6 lg:px-8", className)}>
			<div className="max-w-7xl mx-auto">
				{title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
				<div style={{ height: calendarHeight }}>
					<Calendar
						localizer={localizer}
						events={hardCodedEvents}
						startAccessor="start"
						endAccessor="end"
						titleAccessor="title"
						allDayAccessor="allDay"
						view={currentView}
						date={currentDate}
						onNavigate={handleNavigate}
						onView={handleViewChange}
						onSelectEvent={handleEventClick}
						onSelectSlot={handleSlotSelect}
						style={{ height: "100%" }}
					/>
				</div>

				<EventModal
					event={selectedEvent}
					isOpen={isModalOpen}
					onClose={closeModal}
				/>
			</div>
		</div>
	);
};
