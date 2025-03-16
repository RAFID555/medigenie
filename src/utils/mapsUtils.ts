
// Google Maps API utilities

// Function to get nearby places of a specific type
export const getNearbyPlaces = async (
  position: GeolocationPosition,
  type: 'hospital' | 'pharmacy' | 'blood_bank',
  apiKey: string
) => {
  try {
    const { latitude, longitude } = position.coords;
    
    // Convert blood_bank to a query since it's not a standard place type
    const searchType = type === 'blood_bank' ? 'establishment' : type;
    const query = type === 'blood_bank' ? 'blood bank' : '';

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${searchType}${query ? `&keyword=${query}` : ''}&key=${apiKey}`;
    
    // We'll call this API from our edge function
    const response = await fetch(`/api/proxy-google-maps?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.results || [];
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    throw error;
  }
};

// Function to get distance and duration to a place
export const getDistanceMatrix = async (
  position: GeolocationPosition,
  destination: string,
  apiKey: string
) => {
  try {
    const { latitude, longitude } = position.coords;
    const origin = `${latitude},${longitude}`;
    
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    
    // We'll call this API from our edge function
    const response = await fetch(`/api/proxy-google-maps?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    if (!data.rows || !data.rows[0] || !data.rows[0].elements || !data.rows[0].elements[0]) {
      throw new Error("Invalid response format from Distance Matrix API");
    }
    
    return {
      distance: data.rows[0].elements[0].distance?.text || "Unknown distance",
      duration: data.rows[0].elements[0].duration?.text || "Unknown time",
      distanceValue: data.rows[0].elements[0].distance?.value || 0,
      durationValue: data.rows[0].elements[0].duration?.value || 0
    };
  } catch (error) {
    console.error("Error fetching distance matrix:", error);
    throw error;
  }
};

// Rank facilities based on distance, rating, and availability
export const rankFacilities = (facilities: any[]) => {
  return facilities.sort((a, b) => {
    // Calculate score based on distance and rating
    const scoreA = (a.rating || 0) * 0.7 - (a.distanceValue || 5000) * 0.0002;
    const scoreB = (b.rating || 0) * 0.7 - (b.distanceValue || 5000) * 0.0002;
    
    return scoreB - scoreA; // Higher score first
  });
};
