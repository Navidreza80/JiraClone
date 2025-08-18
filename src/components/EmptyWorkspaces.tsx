"use server";

import Head from "next/head";

export default async function EmptyWorkspace() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Head>
        <title>No Workspaces</title>
      </Head>

      <main className="w-full max-w-md mx-auto text-center">
        <div className="p-8 rounded-lg">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-2">
            You have no workspaces
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating a new workspace to organize your projects.
          </p>
        </div>
      </main>
    </div>
  );
}
