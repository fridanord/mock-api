"use client";

import { HttpMethod } from "./EndpointEditor";

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
      <h1 className="mb-6 text-azure-11">Bygg endpoint</h1>

      <div className="mb-5">
        <label className="mb-2 block text-azure-27">HTTP Method</label>

        <select
          value={method}
          onChange={(e) => onMethodChange(e.target.value as HttpMethod)}
          className="input-base w-full"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-azure-27">Path</label>

        <input
          value={path}
          onChange={(e) => onPathChange(e.target.value)}
          placeholder="/users"
          className="input-base w-full"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-azure-27">JSON-response</label>

        <textarea
          value={responseBody}
          onChange={(e) => onResponseBodyChange(e.target.value)}
          rows={14}
          className="input-base w-full resize-y font-mono"
        />
      </div>

      <button onClick={onSave} disabled={isSaving} className="btn-primary">
        {isSaving ? "Sparar..." : "Spara endpoint"}
      </button>

      {error && (
        <p className="mt-4 text-sm" style={{ color: "var(--color-invalid)" }}>
          {error}
        </p>
      )}

      {success && (
        <p className="mt-4 text-sm" style={{ color: "var(--color-valid)" }}>
          {success}
        </p>
      )}
    </div>
  );
}