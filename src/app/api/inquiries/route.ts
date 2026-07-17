import { NextRequest, NextResponse } from "next/server";

type InquiryType =
  | "package"
  | "flight"
  | "hotel"
  | "visa"
  | "transport"
  | "custom";

interface InquiryBody {
  tenantId: string;
  inquiryType: InquiryType;
  customerName: string;
  phone: string;
  email?: string;
  message?: string;
  status?: string;
  additionalFields?: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const body: InquiryBody = await request.json();

    // Fallback to default tenant ID if not provided in the request
    if (!body.tenantId) {
      body.tenantId = (process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID || "travelworld") as string;
    }

    const missing: string[] = [];
    if (!body.tenantId?.trim()) missing.push("tenantId");
    if (!body.inquiryType?.trim()) missing.push("inquiryType");
    if (!body.customerName?.trim()) missing.push("customerName");
    if (!body.phone?.trim()) missing.push("phone");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    if (
      body.inquiryType === "flight" &&
      body.additionalFields?.departureDate &&
      typeof body.additionalFields.departureDate === "string"
    ) {
      const departureDate = new Date(body.additionalFields.departureDate);
      if (Number.isNaN(departureDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid departure date format" },
          { status: 400 }
        );
      }
    }

    console.log("=== Universal Inquiry Received ===");
    console.log("Tenant:", body.tenantId);
    console.log("Type:", body.inquiryType);
    console.log("Customer:", body.customerName);
    console.log("Phone:", body.phone);
    console.log("==================================");

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const response = await fetch(`${baseUrl}/api/public/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(body.tenantId ? { "x-tenant-id": body.tenantId } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Backend error:", response.status, errorData);
      return NextResponse.json(
        { error: errorData?.error || "Failed to submit inquiry to backend" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
