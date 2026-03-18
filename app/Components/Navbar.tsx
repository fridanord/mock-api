"use client";

type NavbarProps = {
    email?: string;
};

export default function Navbar({ email = "student@example.com" }: NavbarProps) {
    return (
        <nav className="flex w-auto flex-col items-start px-6 lg:px-24 2xl:px-[30rem] bg-white border-b border-gray-200">
            <section className="flex h-16 w-full items-center justify-between">
                <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                        <span className="text-center text-base font-bold leading-6 text-gray-800">M</span>
                    </div>

                    <div className="flex flex-col items-start pl-3">
                        <div className="flex flex-col items-start">
                            <h1 className="flex w-full flex-col items-start text-sm font-bold leading-[1.09375rem] text-gray-900">
                                Mockdata.API
                            </h1>
                            <p className="text-xs text-gray-500">Frontend Prototyp v1</p>
                        </div>
                    </div>
                </div>

                <section className="flex items-center gap-3">
                    <div className="flex flex-col items-start">
                        <p className="text-sm text-gray-600">{email}</p>
                    </div>

                    <div>
                        <button
                            type="button"
                            aria-label="Toggle theme"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3c0 .27-.01.54-.01.81A9 9 0 0 0 21 12.79z" />
                            </svg>
                        </button>
                    </div>

                    <div>
                        <button
                            type="button"
                            className="inline-flex h-9 items-center rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-800 hover:bg-gray-100"
                        >
                            Logga ut
                        </button>
                    </div>
                </section>
            </section>
        </nav>
    );
}