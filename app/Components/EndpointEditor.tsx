"use client";

import { useState } from "react";
import EndpointForm from "./EndpointForm";
import JsonPreview from "./JsonPreview";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export default function EndpointEditor() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [path, setPath] = useState("/users");
  const [responseBody, setResponseBody] = useState(`[
  { "id": 1, "name": "Anna" }
]`);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!path.trim()) {
      setError("Path måste fyllas i.");
      return;
    }

    if (!path.startsWith("/")) {
      setError("Path måste börja med /.");
      return;
    }

    let parsedJson: unknown;

    try {
      parsedJson = JSON.parse(responseBody);
    } catch {
      setError("JSON-response måste vara giltig JSON.");
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch("/api/endpoints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method,
          path,
          responseBody: parsedJson,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Kunde inte spara endpoint.");
      }

      setSuccess("Endpoint sparades.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Något gick fel.");
    } finally {
      setIsSaving(false);
    }
  };

  let previewData: unknown;

  try {
    previewData = {
      method,
      path,
      responseBody: JSON.parse(responseBody),
    };
  } catch {
    previewData = {
      method,
      path,
      responseBody,
    };
  }

  return (
    <section className="grid min-h-screen grid-cols-1 gap-6 p-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950">
        <EndpointForm
          method={method}
          path={path}
          responseBody={responseBody}
          error={error}
          success={success}
          isSaving={isSaving}
          onMethodChange={setMethod}
          onPathChange={setPath}
          onResponseBodyChange={setResponseBody}
          onSave={handleSave}
        />
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-950">
        <JsonPreview data={previewData} />
      </div>
    </section>
  );
}