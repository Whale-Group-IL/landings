interface Props {
  hostname: string;
}

export function NotFound({ hostname }: Props) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl mb-4">🐋</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Tenant not configured
        </h1>
        <p className="text-gray-500 text-sm">
          No landing config found for <code className="bg-gray-100 px-1 rounded">{hostname}</code>.
          <br />
          Add a JSON config to your Cloudflare KV namespace under this key.
        </p>
      </div>
    </main>
  );
}
