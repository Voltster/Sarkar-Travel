import { NextRequest, NextResponse } from "next/server";

interface FlightInquiryBody {
  tenantId: string;
  inquiryType: "flight";
  customerName: string;
  phone: string;
  email?: string;
  additionalFields: {
    fromCity: string;
    toCity: string;
    departureDate: string;
    returnDate: string | null;
    cabinClass: string;
    passengers: number;
    preferredAirline: string | null;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: FlightInquiryBody = await request.json();

    // Validate required fields
    const missing: string[] = [];
    if (!body.customerName?.trim()) missing.push("customerName");
    if (!body.phone?.trim()) missing.push("phone");
    if (!body.additionalFields?.fromCity?.trim()) missing.push("fromCity");
    if (!body.additionalFields?.toCity?.trim()) missing.push("toCity");
    if (!body.additionalFields?.departureDate) missing.push("departureDate");
    if (!body.additionalFields?.cabinClass) missing.push("cabinClass");
    if (!body.additionalFields?.passengers) missing.push("passengers");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate departure date is not in the past
    const departureDate = new Date(body.additionalFields.departureDate);
    if (isNaN(departureDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid departure date format" },
        { status: 400 }
      );
    }

    // Validate passengers is a positive number
    if (
      typeof body.additionalFields.passengers !== "number" ||
      body.additionalFields.passengers < 1
    ) {
      return NextResponse.json(
        { error: "Passengers must be a positive number" },
        { status: 400 }
      );
    }

    // In a real app, you would store this in a database or send to an external API
    // For now, we log and return success
    console.log("=== Flight Inquiry Received ===");
    console.log("Customer:", body.customerName);
    console.log("Phone:", body.phone);
    console.log("Email:", body.email || "N/A");
    console.log("Route:", body.additionalFields.fromCity, "→", body.additionalFields.toCity);
    console.log("Dates:", body.additionalFields.departureDate, "→", body.additionalFields.returnDate || "N/A");
    console.log("Class:", body.additionalFields.cabinClass);
    console.log("Passengers:", body.additionalFields.passengers);
    console.log("Airline:", body.additionalFields.preferredAirline || "Any");
    console.log("================================");

    // TODO: Store in database / Send email notification / Forward to CRM

    return NextResponse.json(
      {
        success: true,
        message: "Flight inquiry submitted successfully",
        data: {
          id: `FL-${Date.now()}`,
          ...body,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Flight inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
