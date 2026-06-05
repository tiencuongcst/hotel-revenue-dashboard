"use client";

type Props = {
  error: Error;
};

export default function ErrorPage({
  error,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 text-red-600">
      {error.message}
    </div>
  );
}
