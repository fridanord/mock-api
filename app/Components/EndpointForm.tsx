"use client";

import Link from "next/link";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type EndpointFormProps = {
  method: HttpMethod;
  path: string;
  responseBody: string;
  error: string;
  success: string;
  isSaving: boolean;
  onMethodChange: (value: HttpMethod) => void;
  onPathChange: (value: string) => void;
  onResponseBodyChange: (value: string) => void;
  onSave: () => void;
};

export default function EndpointForm({
  method,
  path,
  responseBody,
  error,
  success,
  isSaving,
  onMethodChange,
  onPathChange,
  onResponseBodyChange,
  onSave,
}: EndpointFormProps) {
  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-azure-11">Grundinstallningar</h2>
          <p className="mt-2 text-azure-34">
            Konfigurera metod, path och JSON-svar for endpointen.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/start/endpoints" className="btn-secondary">
            Avbryt
          </Link>

          <button onClick={onSave} disabled={isSaving} className="btn-primary">
            {isSaving ? "Sparar..." : "Spara"}
          </button>
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="method" className="mb-2 block text-azure-27">
          Method
        </label>

        <select
          id="method"
          value={method}
          onChange={(e) => onMethodChange(e.target.value as HttpMethod)}
          className="input-base w-full"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="path" className="mb-2 block text-azure-27">
          Path
        </label>

        <input
          id="path"
          value={path}
          onChange={(e) => onPathChange(e.target.value)}
          placeholder="/users"
          className="input-base w-full"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="responseBody" className="mb-2 block text-azure-27">
          Response (JSON)
        </label>

        <textarea
          id="responseBody"
          value={responseBody}
          onChange={(e) => onResponseBodyChange(e.target.value)}
          rows={16}
          className="input-base w-full resize-y font-mono"
        />
      </div>

      <div className="info-box mb-4">
        <span>i</span>
        <p>
          Tips: borja med GET + 200-svar. Lagg till POST/PUT-validering senare.
        </p>
      </div>

      {error && (
        <p className="status-invalid inline-flex items-center gap-2">
          {error}
        </p>
      )}

      {success && (
        <p className="status-valid inline-flex items-center gap-2">
          {success}
        </p>
      )}
    </div>
  );
}
