import { NextResponse } from 'next/server';
import { fetchAllProductsPaths } from '@/Services/ProductsApis';

const isAuthorized = (authHeader) => authHeader && authHeader === process.env.NEXT_PUBLIC_REVALIDATE_TOKEN;
const BASE_URL = process.env.BASE_URL;

export async function GET(req) {
  // Check authorization
  const authHeader = req.headers.get('authorization');
  if (!isAuthorized(authHeader)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch all product paths
    const productsData = await fetchAllProductsPaths();
    
    // Optional: Sort products by priority if you have that data
    // productsData.sort((a, b) => b.priority - a.priority);
    
    const products = productsData.map(({ slug }) => (`${BASE_URL}/product/${slug}`));
    
    // Get query parameter for batch size, start index, and concurrent requests
    const url = new URL(req.url);
    const batchSize = parseInt(url.searchParams.get('batchSize') || '10');
    const startIndex = parseInt(url.searchParams.get('startIndex') || '0');
    const concurrentRequests = parseInt(url.searchParams.get('concurrent') || '3');
    
    // Select a batch of products to warm
    const batchToWarm = products.slice(startIndex, startIndex + batchSize);
    const results = [];
    
    // Create batches of concurrent requests
    for (let i = 0; i < batchToWarm.length; i += concurrentRequests) {
      const concurrentBatch = batchToWarm.slice(i, i + concurrentRequests);
      
      // Process concurrent batch
      const batchPromises = concurrentBatch.map(async (url) => {
        try {
          const startTime = Date.now();
          const response = await fetch(url, { method: 'GET' });
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
      
      // Wait for the concurrent batch to complete
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }
    
    return NextResponse.json({
      message: 'Pre-warming batch completed',
      totalProducts: products.length,
      warmedBatch: {
        start: startIndex,
        end: startIndex + batchSize - 1,
        size: batchToWarm.length
      },
      results,
      nextBatchIndex: startIndex + batchSize < products.length ? startIndex + batchSize : null,
      progress: `${Math.min(startIndex + batchSize, products.length)}/${products.length} (${Math.round((Math.min(startIndex + batchSize, products.length) / products.length) * 100)}%)`
    });
  } catch (error) {
    return NextResponse.json({ 
      message: 'Error during pre-warming', 
      error: error.message 
    }, { status: 500 });
  }
}