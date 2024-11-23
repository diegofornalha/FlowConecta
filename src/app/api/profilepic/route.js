// app/api/profile/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  
  const apiUrl = new URL('https://noun-api.com/beta/pfp');
  Object.keys(queryParams).forEach(key => 
    (key != "size") &&
    apiUrl.searchParams.append(key, queryParams[key])
  );

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const svgString = await response.text();
    
    // Resize the SVG
    const resizedSvg = svgString.replace(
      '<svg width="320" height="320" viewBox="0 0 320 320"',
      `<svg width="${queryParams.size ? queryParams.size : 100}" height="${queryParams.size ? queryParams.size : 100}" viewBox="0 0 320 320"`
    );

    return new NextResponse(resizedSvg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  } catch (error) {
    console.error('Error fetching SVG:', error);
    return NextResponse.json({ error: 'Failed to fetch SVG' }, { status: 500 });
  }
}