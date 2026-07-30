// Image Preset Catalog & Smart Location Auto-Matching Utility

export const PRESET_IMAGES = [
  { label: 'Dubai, UAE', value: '/images/dest-dubai.jpg' },
  { label: 'Paris, France', value: '/images/dest-paris.jpg' },
  { label: 'Switzerland Alps', value: '/images/dest-switzerland.jpg' },
  { label: 'Turkey / Istanbul', value: '/images/dest-turkey.jpg' },
  { label: 'Bali, Indonesia', value: '/images/dest-bali.jpg' },
  { label: 'Maldives Overwater', value: '/images/dest-maldives.jpg' },
  { label: 'Japan / Tokyo', value: '/images/dest-japan.jpg' },
  { label: 'Italy / Rome', value: '/images/dest-italy.jpg' },
  { label: 'New York, USA', value: '/images/dest-newyork.jpg' },
  { label: 'Santorini, Greece', value: '/images/dest-santorini.jpg' },
  { label: 'Cape Town, South Africa', value: '/images/dest-capetown.jpg' },
  { label: 'Bangkok, Thailand', value: '/images/dest-bangkok.jpg' },
  { label: 'Kenya Wildlife Safari', value: '/images/pkg-kenya.jpg' },
  { label: 'Swiss Package Cover', value: '/images/pkg-swiss.jpg' },
  { label: 'Bali Romance Villa', value: '/images/pkg-bali-romance.jpg' }
]

export function getSmartLocationImage(cityName = '', countryName = '') {
  const query = `${cityName} ${countryName}`.toLowerCase()
  if (query.includes('paris') || query.includes('france')) return '/images/dest-paris.jpg'
  if (query.includes('dubai') || query.includes('uae') || query.includes('emirates')) return '/images/dest-dubai.jpg'
  if (query.includes('swiss') || query.includes('switzerland') || query.includes('alps')) return '/images/dest-switzerland.jpg'
  if (query.includes('turkey') || query.includes('istanbul') || query.includes('cappadocia')) return '/images/dest-turkey.jpg'
  if (query.includes('bali') || query.includes('indonesia')) return '/images/dest-bali.jpg'
  if (query.includes('maldives') || query.includes('male')) return '/images/dest-maldives.jpg'
  if (query.includes('japan') || query.includes('tokyo') || query.includes('kyoto')) return '/images/dest-japan.jpg'
  if (query.includes('italy') || query.includes('rome') || query.includes('venice')) return '/images/dest-italy.jpg'
  if (query.includes('york') || query.includes('usa') || query.includes('america')) return '/images/dest-newyork.jpg'
  if (query.includes('greece') || query.includes('santorini')) return '/images/dest-santorini.jpg'
  if (query.includes('africa') || query.includes('cape') || query.includes('kenya')) return '/images/pkg-kenya.jpg'
  if (query.includes('thailand') || query.includes('bangkok')) return '/images/dest-bangkok.jpg'
  return '/images/dest-dubai.jpg'
}
