import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret');

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const body = await req.json();
    const { path } = body;

    if (path) {
      revalidatePath(path, 'page');
      return NextResponse.json({ revalidated: true, path });
    }

    // Default: revalidate homepage
    revalidatePath('/', 'page');
    return NextResponse.json({ revalidated: true, path: '/' });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
