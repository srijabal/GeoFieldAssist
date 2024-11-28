import { format } from 'date-fns';

export function formatTimestamp(timestamp: string): string {
  return format(new Date(timestamp), 'PPP p');
}

export function formatCoordinates(latitude: number, longitude: number): string {
  return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
}