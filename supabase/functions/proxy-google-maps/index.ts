
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Handling OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if this is a key request
    if (req.method === 'POST') {
      const body = await req.json();
      console.log("Received POST request with body:", body);
      
      if (body?.getKey) {
        console.log("Handling API key request");
        const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
        console.log("Retrieved API key:", apiKey ? "Key exists" : "No key found");
        
        if (!apiKey) {
          console.error("Google Maps API key is not set in the environment");
          return new Response(
            JSON.stringify({ 
              error: 'Google Maps API key is not configured',
              details: 'Please check Supabase secrets configuration'
            }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }
        
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
    console.log("Handling proxy request for URL:", url);
    
    if (!url) {
      console.error("URL parameter is missing");
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
    
    if (!apiKey) {
      console.error("Google Maps API key is not set in the environment");
      return new Response(
        JSON.stringify({ 
          error: 'Google Maps API key is not configured',
          details: 'Please check Supabase secrets configuration'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const finalUrl = url.replace('API_KEY', apiKey);
    console.log(`Proxying request to Google Maps API`);

    // Make the request to Google Maps API
    const response = await fetch(finalUrl);
    
    if (!response.ok) {
      console.error(`Google API responded with status ${response.status}`);
      const errorText = await response.text();
      console.error(`Error details: ${errorText}`);
      
      return new Response(
        JSON.stringify({ 
          error: `Google API responded with status ${response.status}`,
          details: errorText
        }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const data = await response.json();
    console.log("Google API response status:", data.status);

    // Check for API-specific errors
    if (data.status === "REQUEST_DENIED") {
      console.error("Google API request denied:", data.error_message);
      return new Response(
        JSON.stringify({ 
          error: 'Google API request denied', 
          details: data.error_message
        }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

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
      JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
