import type { RequiredDataFromCollectionSlug } from "payload";

export const sampleEvents: RequiredDataFromCollectionSlug<"events">[] = [
	{
		title: "Hackerspace.es - Building Inclusive Cybersecurity Communities",
		description:
			"Building the first physical hackerspace in Andalusia, focused on cybersecurity. Open to everyone from beginners to experts.",
		start: "2025-06-20T13:30:00.000Z",
		end: "2025-06-20T14:15:00.000Z",
		allDay: false,
		location: "La Térmica - Málaga; Sala Canillas - 13",
		category: "conference",
	},
	{
		title: "Hackers need Hugs too",
		description:
			"Join the hackers community as we build the first hackerspace in Andalucía - lets break and build cool stuff together!",
		start: "2025-06-23T16:00:00.000Z", // 18:00 CEST = 16:00 UTC
		end: "2025-06-23T18:00:00.000Z", // 20:00 CEST = 18:00 UTC
		allDay: false,
		location:
			"Polo Digital Content Málaga - Patio Principal de la IAT → Ground Floor → 1st Entrance on the Left, 15 Avenida de Sor Teresa Prat, 29003 Málaga",
		category: "social",
	},
];
