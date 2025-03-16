
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if this is a key request
    if (req.method === 'POST') {
      const { getKey } = await req.json();
      
      if (getKey) {
        const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
        return new Response(
          JSON.stringify({ key: apiKey }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }
    
    // Get the URL from the query parameters
    const url = new URL(req.url).searchParams.get('url');
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL parameter is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Replace the API key placeholder with the actual API key
    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    const finalUrl = url.replace('API_KEY', apiKey || '');

    console.log(`Proxying request to: ${finalUrl}`);

    // Make the request to Google Maps API
    const response = await fetch(finalUrl);
    const data = await response.json();

    // Return the response
    return new Response(
      JSON.stringify(data),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in proxy-google-maps function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
