type JsonPreviewProps = {
  data: unknown;
};

export default function JsonPreview({ data }: JsonPreviewProps) {
  return (
    <div className="p-8 text-white">
      <h2 className="mb-4 text-2xl font-semibold">Förhandsvisning</h2>
      <pre className="overflow-x-auto rounded-xl bg-[#020817] p-6 text-sm text-slate-200">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}