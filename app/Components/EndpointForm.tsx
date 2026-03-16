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
    <div className="p-8 text-white">
      <h1 className="mb-6 text-3xl font-semibold">Bygg endpoint</h1>

      <div className="mb-5">
        <label htmlFor="method" className="mb-2 block font-medium">
          HTTP Method
        </label>
        <select
          id="method"
          value={method}
          onChange={(e) => onMethodChange(e.target.value as HttpMethod)}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="path" className="mb-2 block font-medium">
          Path
        </label>
        <input
          id="path"
          type="text"
          value={path}
          onChange={(e) => onPathChange(e.target.value)}
          placeholder="/users"
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="responseBody" className="mb-2 block font-medium">
          JSON-response
        </label>
        <textarea
          id="responseBody"
          value={responseBody}
          onChange={(e) => onResponseBodyChange(e.target.value)}
          rows={14}
          placeholder='[{ "id": 1, "name": "Anna" }]'
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white"
        />
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="rounded-lg bg-white px-5 py-3 font-medium text-black disabled:opacity-50"
      >
        {isSaving ? "Sparar..." : "Spara endpoint"}
      </button>

      {error && <p className="mt-4 text-red-400">{error}</p>}
      {success && <p className="mt-4 text-green-400">{success}</p>}
    </div>
  );
}