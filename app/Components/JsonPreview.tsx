type JsonPreviewProps = {
  data: unknown;
};

export default function JsonPreview({ data }: JsonPreviewProps) {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-azure-11">Förhandsvisning</h2>
        <p className="mt-2 text-azure-34">
          Så här ser endpoint-datan ut just nu.
        </p>
      </div>

      <div className="rounded-card border border-azure-84 bg-azure-11 p-5">
        <pre className="overflow-x-auto font-mono text-sm text-grey-96">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}