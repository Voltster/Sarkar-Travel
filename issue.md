# Backend Issue: Flight Inquiry Submission

## Problem
Currently, when a user submits a flight inquiry on the frontend (`/flight`), the data does not reach the CMS backend.

## Root Cause
The frontend form submits the data to a local Next.js API route (`src/app/api/inquiries/route.ts`). This local route is currently just a **mock**: it logs the received data to the console and returns a fake success response (`{ success: true, id: 'INQ-...' }`), but it **never forwards the data** to the actual CMS backend.

## Action Required for CMS Backend Agent
1. **Verify/Implement the Endpoint:** Ensure the CMS backend has the `POST /api/inquiries` endpoint fully implemented to accept the payload documented in `CMS/inquire.md` (requiring `tenantId`, `inquiryType`, `customerName`, and `phone`).
2. **Proxy or Direct Fetch:** 
   - If the Next.js API route (`src/app/api/inquiries/route.ts`) is meant to be a proxy, please update it to forward the request to the real backend URL (e.g., `process.env.NEXT_PUBLIC_API_BASE_URL + '/api/inquiries'`).
   - Alternatively, change the frontend component to use the API client (`publicFetch`) to send the request directly to the backend.

*(The frontend form has been updated to be simplified and dynamic, capturing mainly Name and Phone number as the top priority.)*
