import { NextResponse } from 'next/server';

export async function POST(req) {
  const url = 'https://api.hyperbolic.xyz/v1/chat/completions';
  const { message } = await req.json();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.HYPERBOLIC_API_KEY,
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3.2-3B-Instruct',
        messages: [
          {
            role: 'system',
            content: "Provide recommendations based on a list of events. The events are categorized by type (e.g., conference, workshop, networking dinner, etc.). Each event includes details like title, organizer, date, time, tags, and a brief summary. For example, the 'Scroll SDK & Gadgets Conference' is on 11th September 2024, focused on building the foundation for Ethereum's multichain future. Other events include a 'Workshop: Intro to Scroll SDK' on 12th September 2024, a 'Networking Dinner: Blockchain Enthusiasts' on 13th September 2024, a 'Drinking Party: Celebrating Ethereum Layer 2' on 14th September 2024, a 'Blockchain Summit: Exploring the Future of Multichain' on 15th September 2024, and a 'DeFi Workshop: Building dApps on Scroll' on 16th September 2024. Recommend an event based on the user's interests (e.g., Ethereum, blockchain, networking, etc.) or date preferences."
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 14143,
        temperature: 0.7,
        top_p: 0.9,
        stream: false
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const json = await response.json();
    const output = json.choices[0].message.content;

    return NextResponse.json({ output });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch response' }, { status: 500 });
  }
}