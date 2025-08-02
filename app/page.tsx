'use client';

import dynamic from 'next/dynamic';

const Terminal = dynamic(() => import('./components/Terminal'), {
  ssr: false,
  loading: () => (
    <div className="terminal-container w-full h-[500px] flex items-center justify-center">
      <div className="text-accent animate-pulse">Loading terminal...</div>
    </div>
  )
});

export default function HomePage() {
  return (
    <main className="container">
      <section className="min-h-screen flex flex-col items-center justify-center relative py-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            BREAKEVEN LLC
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            <span className="text-primary">Professional solutions</span>{' '}
            <span className="text-gray-400">for</span>{' '}
            <span className="text-accent">modern business challenges</span>
          </p>
          <div className="flex items-center justify-center gap-4 text-lg">
            <span className="px-4 py-2 border border-primary/30 rounded text-gray-300">
              Strategy
            </span>
            <span className="px-4 py-2 border border-primary/30 rounded text-gray-300">
              Technology
            </span>
            <span className="px-4 py-2 border border-primary/30 rounded text-gray-300">
              Innovation
            </span>
          </div>
        </div>

        {/* Terminal Component */}
        <div className="w-full max-w-5xl mb-20">
          <Terminal />
        </div>

      </section>


    </main>
  );
}