import React from 'react'
import type { CalendarBlock as CalendarBlockProps, Event } from 'src/payload-types'
import { CalendarBlock } from './Component'
import { getUpcomingEvents, getEventsByDateRange, getEventsByCategory } from '@/utilities/getEvents'

interface CalendarWithEventsProps extends CalendarBlockProps {
  className?: string
  fetchMode?: 'upcoming' | 'dateRange' | 'category' | 'all'
  fetchOptions?: {
    limit?: number
    category?: string
    startDate?: Date
    endDate?: Date
  }
}

export async function CalendarWithEvents({
  className,
  fetchMode = 'all',
  fetchOptions = {},
  ...calendarProps
}: CalendarWithEventsProps) {
  let events: Event[] = []

  try {
    switch (fetchMode) {
      case 'upcoming':
        events = await getUpcomingEvents(fetchOptions.limit || 10)
        break
      case 'dateRange':
        if (fetchOptions.startDate && fetchOptions.endDate) {
          events = await getEventsByDateRange(fetchOptions.startDate, fetchOptions.endDate)
        }
        break
      case 'category':
        if (fetchOptions.category) {
          events = await getEventsByCategory(fetchOptions.category, fetchOptions.limit || 50)
        }
        break
      case 'all':
      default:
        // Use the events from the CalendarBlock config
        events = []
        break
    }
  } catch (error) {
    console.error('Error fetching events for calendar:', error)
    events = []
  }

  return (
    <CalendarBlock
      {...calendarProps}
      className={className}
      eventsList={events.length > 0 ? events : null}
    />
  )
}

// Export the original CalendarBlock for cases where you want to use it directly
export { CalendarBlock }
