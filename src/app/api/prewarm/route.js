import { NextResponse } from 'next/server';
import { fetchProductPaths } from '@/Services/ProductsApis';

const isAuthorized = (authHeader) => authHeader && authHeader === process.env.NEXT_PUBLIC_REVALIDATE_TOKEN;
const BASE_URL = process.env.BASE_URL;

export async function GET(req) {

  const authHeader = req.headers.get('authorization');
  if (!isAuthorized(authHeader)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const batchSize = parseInt(url.searchParams.get('batchSize') || '20');
    const startIndex = parseInt(url.searchParams.get('startIndex') || '0');
    const concurrentRequests = parseInt(url.searchParams.get('concurrent') || '5');


    const productsLoadStartTime = Date.now();
    const res = await fetchProductPaths({ limit: batchSize, skip: startIndex });
    const productsLoadDuration = Date.now() - productsLoadStartTime;

    const products = res.paths.map(({ slug }) => (`${BASE_URL}/product/${slug}`));
    const totalCount = res.totalCount || 0;
    const results = [];

    for (let i = 0; i < products.length; i += concurrentRequests) {
      const concurrentBatch = products.slice(i, i + concurrentRequests);


      const batchPromises = concurrentBatch.map(async (url) => {
        try {
          const startTime = Date.now();
          let response;
          let attempts = 0;
          const maxRetries = 3;

          while (attempts < maxRetries) {
            try {
              response = await fetch(url, { method: 'GET' });
              if (response.ok) break; // Exit loop if request is successful
            } catch (error) {
              // Log error and retry
            }
            attempts++;
          }

          if (!response || !response.ok) {
            throw new Error(`Failed to fetch ${url} after ${maxRetries} attempts`);
          }
          const duration = Date.now() - startTime;

          return {
            url,
            status: response.status,
            warmed: response.status === 200,
            duration: `${duration}ms`
          };
        } catch (error) {
          return {
            url,
            status: 'error',
            warmed: false,
            error: error.message
          };
        }
      });


      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }

    return NextResponse.json({
      message: 'Pre-warming batch completed',
      productsLoadDuration: `${productsLoadDuration}ms`,
      warmedBatch: {
        start: startIndex,
        end: startIndex + batchSize - 1,
        size: totalCount
      },
      results,
      nextBatchIndex: startIndex + batchSize < totalCount ? startIndex + batchSize : null,
      progress: `${Math.min(startIndex + batchSize, totalCount)}/${totalCount} (${Math.round((Math.min(startIndex + batchSize, totalCount) / totalCount) * 100)}%)`
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Error during pre-warming',
      error: error.message
    }, { status: 500 });
  }
}