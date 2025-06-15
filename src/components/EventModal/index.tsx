"use client";

import type React from "react";
import { useEffect } from "react";

type EventModalData = {
	title: string;
	start: Date;
	end: Date;
	description?: string | null;
	allDay?: boolean | null;
};

interface EventModalProps {
	event: EventModalData | null;
	isOpen: boolean;
	onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({
	event,
	isOpen,
	onClose,
}) => {
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

export type { EventModalData };
