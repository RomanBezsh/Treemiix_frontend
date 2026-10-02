import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  if (!YOUTUBE_API_KEY) {
    return NextResponse.json({ error: 'API Key is missing' }, { status: 500 });
  }

  function parseDuration(duration: string): string {
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      if (!match) return "0:00";
      const h = parseInt((match[1] || "").replace("H", "")) || 0;
      const m = parseInt((match[2] || "").replace("M", "")) || 0;
      const s = parseInt((match[3] || "").replace("S", "")) || 0;
      return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` : `${m}:${s.toString().padStart(2, '0')}`;
  }

  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    
    if (!searchData.items) return NextResponse.json([]);

    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(",");
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();

    const results = searchData.items.map((item: any) => {
        const details = detailsData.items?.find((d: any) => d.id === item.id.videoId);
        return {
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            channelTitle: item.snippet.channelTitle,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            duration: details ? parseDuration(details.contentDetails.duration) : "0:00"
        };
    });

    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
