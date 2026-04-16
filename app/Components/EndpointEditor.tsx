"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import EndpointForm from "./EndpointForm";
import JsonPreview from "./JsonPreview";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const PROJECT_ID = "69bbd7e8257df51484ad3002";

type EndpointEditorProps = {
  endpointId?: string;
};

type EndpointFromApi = {
  _id: string;
  method: HttpMethod;
  path: string;
  responseBody: unknown;
};

export default function EndpointEditor({ endpointId }: EndpointEditorProps) {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [path, setPath] = useState("/users");
  const [responseBody, setResponseBody] = useState(`{
  "name": "Anna",
  "age": 22,
  "address": { "city": "Bromma" }
}`);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!endpointId) return;

    let cancelled = false;

    (async () => {
      try {
        setError("");
        setSuccess("");

        const res = await fetch(`/api/endpoints/${endpointId}`);
        const data: EndpointFromApi = await res.json();

        if (!res.ok) throw new Error((data as any)?.message || "Kunde inte hämta endpoint.");

        if (cancelled) return;

        setMethod(data.method);
        setPath(data.path);
        setResponseBody(JSON.stringify(data.responseBody, null, 2));
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Något gick fel.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [endpointId]);

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!path.trim()) {
      setError("Path maste fyllas i.");
      return;
    }

    if (!path.startsWith("/")) {
      setError("Path maste borja med /.");
      return;
    }

    let parsedJson: unknown;

    try {
      parsedJson = JSON.parse(responseBody);
    } catch {
      setError("JSON-response maste vara giltig JSON.");
      return;
    }

    const endpointName = `${method} ${path}`;

    try {
      setIsSaving(true);

      const url = endpointId ? `/api/endpoints/${endpointId}` : "/api/endpoints";
      const httpMethod = endpointId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: httpMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // for PUT: your API ignores fields it doesn't allow updating, so this is OK
          name: endpointName,
          projectId: PROJECT_ID,
          method,
          path,
          requestBody: null,
          responseBody: parsedJson,
          generateList: Array.isArray(parsedJson),
          listCount: Array.isArray(parsedJson) ? parsedJson.length : 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Kunde inte spara endpoint.");
      }

      setSuccess("Endpoint sparades i databasen.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nagot gick fel.");
    } finally {
      setIsSaving(false);
    }
  };

  let previewData: unknown;

  try {
    const parsed = JSON.parse(responseBody);

    previewData = {
      name: `${method} ${path}`,
      projectId: PROJECT_ID,
      method,
      path,
      requestBody: null,
      responseBody: parsed,
      generateList: Array.isArray(parsed),
      listCount: Array.isArray(parsed) ? parsed.length : 0,
    };
  } catch {
    previewData = {
      name: `${method} ${path}`,
      projectId: PROJECT_ID,
      method,
      path,
      requestBody: null,
      responseBody,
    };
  }

  return (
    <section className="h-full w-full overflow-y-auto p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div>
          <p className="mb-3">
            <Link href="/start/endpoints" className="btn-ghost">
              Tillbaka
            </Link>
          </p>

          <h1 className="text-azure-11">Redigera endpoint</h1>
          <p className="mt-2 text-azure-34">Projekt: Webshop API</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card-base">
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

          <div className="card-base">
            <JsonPreview data={previewData} />
          </div>
        </div>
      </div>
    </section>
  );
}