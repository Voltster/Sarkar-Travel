# Universal Lead Management & Inquiry System

This document outlines the complete, end-to-end flow of the new Universal Lead Management Architecture. This system is designed to handle multiple travel services (Flights, Hotels, Packages, Visas, Transfers, etc.) across multiple clients (`tenantId`) without requiring separate database tables or schemas.

## 1. The Lead Flow (End-to-End)

1. **Submission (Frontend):** A user fills out a form on the public website (e.g., a Flight Inquiry form). The frontend sends a POST request to `/api/inquiries`.
2. **Dashboard Review (Admin):** The lead appears in the CMS under **Customer Management > Inquiries**. It starts with a `new` status.
3. **Admin Actions:** 
   * **View Details:** The admin can view all dynamically submitted data (flights, dates, etc.) perfectly formatted in the "View Details" modal.
   * **Mark Contacted / Cancelled:** Updates the lead's status.
   * **Move to Junk:** The lead is moved out of the main view and sent to the **Junk Leads** page (where it can be restored if needed).
4. **Automated Conversion (Confirmed Bookings):** 
   * When an admin selects **Mark Confirmed**, the backend automatically creates a **Pending Booking** inside the `Bookings` collection.
   * It carries over the customer's name, email, phone, travel dates, and ALL dynamic `additionalFields`.
   * It links the Inquiry to the Booking via `bookingId` to prevent duplicate conversions.
5. **Booking Management:** The admin moves to the **Confirmed Bookings** page to add payment details, change the final amount, and manage the final trip delivery.

---

## 2. API & Data Architecture

The magic of the Universal Architecture lies in the `inquiryType` and `additionalFields` schema.

### Core Required Fields:
Every inquiry **MUST** contain these fields:
* `tenantId` (String) - Maps the lead to the correct client/business.
* `inquiryType` (String) - Can be `package`, `flight`, `hotel`, `visa`, `transport`, or `custom`.
* `customerName` (String)
* `phone` (String)

### Standard Optional Fields:
* `email` (String)
* `message` (String)

### The `additionalFields` Object (The Secret Sauce)
Instead of hardcoding columns like `hotelName` or `flightClass` into the database, you place **all** service-specific data inside the `additionalFields` JSON object. The CMS admin dashboard will automatically loop through this object and display it beautifully to the admin.

---

## 3. How to Build Frontend Forms

When building your public-facing Next.js websites, you will create different forms for different services. Here is how you should structure the API payloads for each type of service when sending a `POST` request to `/api/inquiries`.

> **Note:** The CMS automatically converts camelCase keys in `additionalFields` into readable labels (e.g., `departureDate` becomes "Departure Date"). Keep your keys clean!

### Pro Tip: Hidden vs User-Input Fields
Not everything in `additionalFields` needs to be typed by the customer! 
If a user clicks "Inquire Now" on a specific "Maldives Package" page, the form should only ask for their Name and Phone. Your frontend code should **automatically** inject the `packageTitle: "Maldives Package"` into the `additionalFields` behind the scenes before sending the API request. This provides a magical experience for the user while giving admins full context.

### Example 1: Package Inquiry Form
```json
{
  "tenantId": "client_123",
  "inquiryType": "package",
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "message": "Looking for a honeymoon package.",
  "additionalFields": {
    "packageId": "pkg_bali_01",
    "packageTitle": "Romantic Bali Getaway",
    "travelDate": "2026-10-12",
    "budgetPerPerson": "50000 INR"
  }
}
```

### Example 2: Flight Booking Form
```json
{
  "tenantId": "client_123",
  "inquiryType": "flight",
  "customerName": "Rahul Sharma",
  "phone": "+91-9999999999",
  "additionalFields": {
    "fromCity": "New Delhi (DEL)",
    "toCity": "Dubai (DXB)",
    "departureDate": "2026-05-20",
    "returnDate": "2026-05-28",
    "cabinClass": "Economy",
    "passengers": 4,
    "preferredAirline": "Emirates"
  }
}
```

### Example 3: Visa Application Form
```json
{
  "tenantId": "client_123",
  "inquiryType": "visa",
  "customerName": "Anita Desai",
  "phone": "+91-8888888888",
  "additionalFields": {
    "countryForVisa": "Schengen (France)",
    "visaType": "Tourist",
    "nationality": "Indian",
    "travelDate": "2026-07-01",
    "hasPreviousRejections": "No"
  }
}
```

### Example 4: Transfer / Transport Form
```json
{
  "tenantId": "client_123",
  "inquiryType": "transport",
  "customerName": "Vikram Singh",
  "phone": "+91-7777777777",
  "additionalFields": {
    "pickupLocation": "Mumbai Airport (BOM)",
    "dropoffLocation": "Taj Mahal Palace, Colaba",
    "pickupDateTime": "2026-05-15 14:30",
    "vehicleType": "Luxury SUV",
    "numberOfBags": 3
  }
}
```

## Summary
By using this architecture, you never need to alter the database schema to support a new travel service. Just add a new form on the frontend, populate the `additionalFields` object, and the CMS handles the rest automatically—from lead generation all the way to final booking confirmation!


# Inquiries Integration Guide

## Base API

- `GET /api/inquiries?tenantId=travelworld`
- `GET /api/inquiries/:id?tenantId=travelworld`
- `POST /api/inquiries`
- `PUT /api/inquiries/:id`
- `DELETE /api/inquiries/:id`

## Required Fields

- `tenantId`
- `inquiryType`
- `customerName`
- `phone`

## Optional Fields

- `email`
- `message`
- `status`
- `additionalFields`

## Inquiry Types

- `package`
- `flight`
- `hotel`
- `visa`
- `transport`
- `custom`

## Package Inquiry Payload

Frontend should attach:

- `packageId`
- `packageTitle`
- `destination`
- `sourceUrl`

inside `additionalFields`.

## Notes

- Inquiries are universal lead records.
- Keep the payload minimal and conversion-focused.
