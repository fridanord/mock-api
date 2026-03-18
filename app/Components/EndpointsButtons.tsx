interface ButtonProps {
    onClick?: () => void;
}

export function EndpointEditButton({ onClick }: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50"
        >
            Edit
        </button>
    );
}

export function EndpointTestButton({ onClick }: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
        >
            <span className="inline-flex h-4 w-4 items-center justify-center">
                <svg
                    viewBox="0 0 14 14"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M4.67578 3.96479V10.0351C4.67578 10.4726 5.16797 10.7734 5.57812 10.4999L10.3086 7.49213C10.6641 7.27338 10.6641 6.7265 10.3086 6.50775L5.57812 3.49994C5.16797 3.2265 4.67578 3.52729 4.67578 3.96479Z" />
                </svg>
            </span>
            <span>Test</span>
        </button>
    );
}

export function EndpointDeleteButtonSm({ onClick }: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 p-1.5 text-white hover:bg-red-700"
        >
            <TrashIcon />
        </button>
    );
}

export function EndpointDeleteButton({ onClick }: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
        >
            <TrashIcon />
            <span>Delete</span>
        </button>
    );
}

function TrashIcon() {
    return (
        <span className="inline-flex h-4 w-4 items-center justify-center">
            <svg
                viewBox="0 0 14 14"
                className="h-3.5 w-3.5"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M3.5 11.0742C3.5 11.7305 4.01953 12.25 4.67578 12.25H9.32422C9.98047 12.25 10.5 11.7305 10.5 11.0742V5.25C10.5 4.62109 9.98047 4.07422 9.32422 4.07422H4.67578C4.01953 4.07422 3.5 4.62109 3.5 5.25V11.0742ZM5.25 5.25H8.75C9.07812 5.25 9.32422 5.52344 9.32422 5.82422V10.5C9.32422 10.8281 9.07812 11.0742 8.75 11.0742H5.25C4.92188 11.0742 4.67578 10.8281 4.67578 10.5V5.82422C4.67578 5.52344 4.92188 5.25 5.25 5.25ZM9.05078 2.32422L8.64062 1.91406C8.53125 1.80469 8.36719 1.75 8.23047 1.75H5.76953C5.63281 1.75 5.46875 1.80469 5.35938 1.91406L4.94922 2.32422H3.5C3.17188 2.32422 2.92578 2.59766 2.92578 2.92578C2.92578 3.22656 3.17188 3.5 3.5 3.5H10.5C10.8281 3.5 11.0742 3.22656 11.0742 2.92578C11.0742 2.59766 10.8281 2.32422 10.5 2.32422H9.05078Z" />
            </svg>
        </span>
    );
}