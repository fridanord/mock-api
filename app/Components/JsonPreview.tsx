type JsonPreviewProps = {
  data: unknown;
};

export default function JsonPreview({ data }: JsonPreviewProps) {
  return (
    <div className="p-8">
      <h2 className="mb-4 text-azure-11">Förhandsvisning</h2>

      <div className="rounded-card border border-azure-84 bg-azure-11 p-4">
        <pre className="overflow-x-auto font-mono text-sm text-grey-96">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}