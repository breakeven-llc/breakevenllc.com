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
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23374151' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative z-10 text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-xs uppercase tracking-wider text-gray-500 px-3 py-1 border border-gray-800 rounded-full inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Enterprise Ready
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 glitch" data-text="BREAKEVEN LLC">
            BREAKEVEN LLC
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            <span className="text-primary">Professional solutions</span>{' '}
            <span className="text-gray-400">for</span>{' '}
            <span className="text-accent">modern business challenges</span>
          </p>
          
          <div className="flex items-center justify-center gap-4 text-lg mb-8">
            <div className="group px-6 py-3 border border-primary/30 rounded-lg text-gray-300 hover:border-primary/60 transition-all duration-300 hover:shadow-primary hover:scale-105 hover:text-primary">
              <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Core</span>
              Strategy
            </div>
            <div className="group px-6 py-3 border border-primary/30 rounded-lg text-gray-300 hover:border-primary/60 transition-all duration-300 hover:shadow-primary hover:scale-105 hover:text-primary">
              <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Build</span>
              Technology
            </div>
            <div className="group px-6 py-3 border border-primary/30 rounded-lg text-gray-300 hover:border-primary/60 transition-all duration-300 hover:shadow-primary hover:scale-105 hover:text-primary">
              <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Lead</span>
              Innovation
            </div>
          </div>

          {/* Command hint */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Try running</span>
            <code className="px-2 py-1 bg-gray-900 border border-gray-800 rounded text-primary font-mono">podcast</code>
            <span>in the terminal below</span>
          </div>
        </div>

        {/* Terminal Component */}
        <div className="w-full max-w-5xl mb-20 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
          <div className="relative">
            <Terminal />
          </div>
        </div>

      </section>

      {/* Additional sections can be added here */}
    </main>
  );
}