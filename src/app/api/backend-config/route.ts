import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  // 1. Check discovery file in workspace root or current directory
  try {
    const candidatePaths = [
      path.resolve(process.cwd(), "../.backend_url"),
      path.resolve(process.cwd(), ".backend_url"),
      path.resolve(process.cwd(), "../.backend_port"),
      path.resolve(process.cwd(), ".backend_port"),
    ];

    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, "utf-8").trim();
        if (content) {
          if (content.startsWith("http")) {
            const url = content.replace(/\/$/, "");
            const portMatch = url.match(/:(\d+)/);
            return NextResponse.json({
              backendUrl: url,
              port: portMatch ? parseInt(portMatch[1], 10) : null,
              source: "discovery_file",
            });
          } else if (!isNaN(Number(content))) {
            const portNum = parseInt(content, 10);
            return NextResponse.json({
              backendUrl: `http://127.0.0.1:${portNum}`,
              port: portNum,
              source: "discovery_file",
            });
          }
        }
      }
    }
  } catch (e) {
    // Ignore file read error
  }

  // 2. Check environment variable
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "");
    const portMatch = url.match(/:(\d+)/);
    return NextResponse.json({
      backendUrl: url,
      port: portMatch ? parseInt(portMatch[1], 10) : null,
      source: "env",
    });
  }

  // 3. Fallback
  return NextResponse.json({
    backendUrl: "http://127.0.0.1:8000",
    port: 8000,
    source: "default",
  });
}
