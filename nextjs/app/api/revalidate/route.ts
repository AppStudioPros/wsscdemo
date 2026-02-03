import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret');

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const body = await req.json();
    const { type, path, tag } = body;

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, tag });
    }

    // Default: revalidate homepage
    revalidatePath('/', 'page');
    return NextResponse.json({ revalidated: true, path: '/' });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
