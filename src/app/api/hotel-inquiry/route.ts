import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      destination,
      checkIn,
      checkOut,
      guests,
      rooms,
      roomType,
      hotelType,
      budget,
      customerName,
      phone,
      email,
      specialRequests,
      hotelName,
      hotelId,
      tenantId = process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID as string,
    } = body;

    // Validate required fields (email is optional)
    if (!destination || !checkIn || !checkOut || !customerName || !phone) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Prepare inquiry data
    const inquiryData = {
      tenantId,
      inquiryType: "hotel",
      customerName,
      phone,
      email: email || undefined,
      message: `Hotel Inquiry:\n\nHotel: ${hotelName || "Not specified"}\nHotel ID: ${hotelId || "None"}\nDestination: ${destination}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\nRooms: ${rooms}\nRoom Type: ${roomType || "Standard"}\nProperty Type: ${hotelType || "Hotel"}\nBudget: ${budget || "Not specified"}\nSpecial Requests: ${specialRequests || "None"}`,
      additionalFields: {
        destination,
        checkIn,
        checkOut,
        guests,
        rooms,
        roomType,
        hotelType,
        budget,
        specialRequests,
        hotelName,
        hotelId,
      },
    };

    // Send to backend CMS API
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const response = await fetch(`${apiBaseUrl}/api/public/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(tenantId ? { "x-tenant-id": tenantId } : {}),
      },
      body: JSON.stringify(inquiryData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to submit inquiry to backend");
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: "Hotel inquiry submitted successfully",
      data,
    });
  } catch (error: any) {
    console.error("Hotel inquiry error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}