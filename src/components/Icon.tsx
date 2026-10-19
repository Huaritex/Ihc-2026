type IconName = 'book' | 'search' | 'filter' | 'reset' | 'chevron' | 'user' | 'calendar'

const paths: Record<IconName, string> = {
  book: 'M12 5v15M3 4h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5v15h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3Z',
  search: 'm21 21-4.5-4.5M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  filter: 'M4 7h9m4 0h3M4 17h3m4 0h9M13 4v6M7 14v6',
  reset: 'M3 10a9 9 0 1 1 2 8M3 4v6h6',
  chevron: 'm6 9 6 6 6-6',
  user: 'M20 21v-2a7 7 0 0 0-14 0v2M17 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  calendar: 'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
}

function Icon({ name }: { name: IconName }) {
  return (
    <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}

export default Icon
