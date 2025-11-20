export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Next.js + NestJS Monorepo
        </h1>
        <p className="text-lg mb-8">
          A scalable full-stack application with Domain-Driven Design and CQRS
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border border-gray-300 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Frontend 🚀</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Next.js 14 with App Router, TypeScript, and Tailwind CSS
            </p>
          </div>
          <div className="p-6 border border-gray-300 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Backend ⚡</h2>
            <p className="text-gray-600 dark:text-gray-400">
              NestJS with DDD, CQRS, and Event-Driven Architecture
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
