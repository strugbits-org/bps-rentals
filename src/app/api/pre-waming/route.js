import { NextResponse } from 'next/server';

const BASE_URL = process.env.BASE_URL;

async function callPreWarmAPI(batchSize, startIndex, concurrent) {
  try {
    const response = await fetch(`${BASE_URL}/api/prewarm?batchSize=${batchSize}&startIndex=${startIndex}&concurrent=${concurrent}`, {
      method: 'GET',
      headers: {
        authorization: process.env.NEXT_PUBLIC_REVALIDATE_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in pre-warming API call:', error.message);
    return null;
  }
}

const isAuthorized = (authHeader) => authHeader && authHeader === process.env.NEXT_PUBLIC_REVALIDATE_TOKEN;

export async function GET(req) {
  const authHeader = req.headers.get('authorization');

  if (!isAuthorized(authHeader)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const batchSize = 20;
  let startIndex = 0;
  const concurrent = 5;
  let progress = 0;

  while (progress < 100) {
    const result = await callPreWarmAPI(batchSize, startIndex, concurrent);

    if (!result) {
      console.log('Error occurred or API call failed');
      return NextResponse.json({ message: 'Error in pre-warming' }, { status: 500 });
    }

    console.log(`Batch ${startIndex} - Status: ${result.progress}`);
    progress = parseInt(result.progress.match(/(\d+)%/)[1]);

    if (result.nextBatchIndex) {
      startIndex = result.nextBatchIndex;
    } else {
      console.log('No more batches, all pages are warmed.');
      return NextResponse.json({ message: 'Pre-warming complete' }, { status: 200 });
    }
  }

  console.log('Pre-warming process complete');
  return NextResponse.json({ message: 'Pre-warming complete' }, { status: 200 });
}