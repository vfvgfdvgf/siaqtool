import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

function apiBase() {
  if (process.env.SIAQ_API_INTERNAL_URL) return process.env.SIAQ_API_INTERNAL_URL.replace(/\/$/, "");
  if (process.env.SIAQ_API_HOST) return `http://${process.env.SIAQ_API_HOST}:${process.env.SIAQ_API_PORT || "10000"}/api/v1`;
  return (process.env.SIAQ_API_URL || "http://127.0.0.1:8000/api/v1").replace(/\/$/, "");
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const contentType = request.headers.get("content-type") || "application/octet-stream";
  try {
    const upstream = await fetch(`${apiBase()}/tools/${encodeURIComponent(slug)}/process/`, {
      method: "POST",
      headers: { "content-type": contentType, accept: request.headers.get("accept") || "application/octet-stream, application/json", "x-forwarded-proto": "https" },
      body: await request.arrayBuffer(),
      cache: "no-store",
    });
    const headers = new Headers();
    for (const name of ["content-type", "content-disposition", "cache-control", "x-content-type-options"]) {
      const value = upstream.headers.get(name);
      if (value) headers.set(name, value);
    }
    return new Response(upstream.body, { status: upstream.status, headers });
  } catch {
    return Response.json({ ok: false, error: "محرك التحويل غير متصل الآن." }, { status: 503, headers: { "cache-control": "no-store" } });
  }
}
