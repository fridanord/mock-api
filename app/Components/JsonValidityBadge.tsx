type JsonValidityBadgeProps = {
  status: number;
};

export default function JsonValidityBadge({
  status,
}: JsonValidityBadgeProps) {
  const label =
    status === 200
      ? "200 OK"
      : status === 404
      ? "404 Not Found"
      : status === 500
      ? "500 Internal Error"
      : `${status}`;

  const statusClass =
    status >= 200 && status < 300
      ? "status-valid"
      : status >= 400 && status < 500
      ? "status-warning"
      : "status-invalid";

  return (
    <span className={`status-badge ${statusClass}`}>
      {label}
    </span>
  );
}