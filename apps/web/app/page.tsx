"use client";

import { useState, useEffect } from "react";
interface ApiResponse {
  message: string;
  data?: {
    framework: string;
    language: string;
    environment: string;
  };
  timestamp?: string;
}

export default function Home() {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/hello");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setApiData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Silas React Sandbox
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Playground para exercícios e paradigmas do React
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Frontend Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🎨 Frontend
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Framework:</strong> Next.js 14
              </p>
              <p>
                <strong>Language:</strong> TypeScript
              </p>
              <p>
                <strong>Styling:</strong> Tailwind CSS
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-green-600">✅ Running</span>
              </p>
            </div>
          </div>

          {/* Backend Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ⚡ Backend
            </h2>
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-gray-600">Connecting...</span>
              </div>
            ) : error ? (
              <div className="text-red-600">
                <p>
                  <strong>Status:</strong> ❌ Error
                </p>
                <p className="text-sm mt-2">{error}</p>
              </div>
            ) : (
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Framework:</strong> {apiData?.data?.framework}
                </p>
                <p>
                  <strong>Language:</strong> {apiData?.data?.language}
                </p>
                <p>
                  <strong>Environment:</strong> {apiData?.data?.environment}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-600">✅ Connected</span>
                </p>
                <p className="text-sm text-gray-500 mt-3">
                  Response: &quot;{apiData?.message}&quot;
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            🎯 Próximos Exercícios
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-gray-800">Dashboard Search</h4>
              <p className="text-sm text-gray-600 mt-1">
                Performance com milhares de resultados
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-gray-800">State Management</h4>
              <p className="text-sm text-gray-600 mt-1">
                Context vs Redux vs Zustand
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-gray-800">Real-time Features</h4>
              <p className="text-sm text-gray-600 mt-1">
                WebSockets e notificações
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
