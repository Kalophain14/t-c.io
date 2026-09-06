export function formatDate(dateString: string) {
  if (!dateString) {
    return ''
  }

  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}