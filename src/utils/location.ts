/**
 * Get current location using the browser's geolocation API and save it to session storage.
 */
export function saveLocationOnSessionStorage(): void {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000
  }
  const onSuccess = (position: GeolocationPosition): void => {
    const { latitude, longitude } = position.coords
    const location = { latitude, longitude }

    sessionStorage.setItem('location', JSON.stringify(location))
  }

  const onError = (error: GeolocationPositionError): void => {
    console.error(error)
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
}

/**
 * Show the location on Google Maps.
 */
export function showLocationOnMaps(coords: { latitude: number, longitude: number }): void {
  const { latitude, longitude } = coords
  window.open('https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude, '_blank')
}
