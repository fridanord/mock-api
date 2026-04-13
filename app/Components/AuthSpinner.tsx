export default function AuthSpinner() {
  return (
    <span className="flex items-center justify-center gap-2">
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inset-0 animate-spin">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-light leading-none text-current">
            {"{"}
          </span>

          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-light leading-none text-current">
            {"}"}
          </span>

          <span className="absolute inset-[2px] rounded-full border border-current/30 border-t-transparent" />
        </span>

        <span className="relative z-10 text-[9px] font-bold leading-none">
          M
        </span>
      </span>

      <span>Laddar...</span>
    </span>
  );
}