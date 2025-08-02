'use client';

import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

export default function TerminalComponent() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    // Ensure the container has dimensions before initializing
    const initTerminal = () => {
      if (!terminalRef.current || terminalRef.current.offsetWidth === 0 || terminalRef.current.offsetHeight === 0) {
        // Retry after a short delay if container isn't ready
        setTimeout(initTerminal, 50);
        return;
      }

      const term = new Terminal({
      theme: {
        background: '#1a1a1a',
        foreground: '#e4e4e7',
        cursor: '#3b82f6',
        cursorAccent: '#1a1a1a',
        selectionBackground: 'rgba(59, 130, 246, 0.3)',
        black: '#000000',
        red: '#ef4444',
        green: '#10b981',
        yellow: '#f59e0b',
        blue: '#3b82f6',
        magenta: '#8b5cf6',
        cyan: '#06b6d4',
        white: '#e4e4e7',
        brightBlack: '#6b7280',
        brightRed: '#f87171',
        brightGreen: '#34d399',
        brightYellow: '#fbbf24',
        brightBlue: '#60a5fa',
        brightMagenta: '#a78bfa',
        brightCyan: '#22d3ee',
        brightWhite: '#f3f4f6'
      },
      fontFamily: 'monospace',
      fontSize: 14,
      lineHeight: 1.5,
      cursorBlink: true,
      cursorStyle: 'block',
      allowTransparency: true,
    });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      
      term.open(terminalRef.current);
      
      // Ensure terminal is properly initialized before fitting
      requestAnimationFrame(() => {
        try {
          fitAddon.fit();
        } catch (error) {
          console.error('Error during initial terminal fit:', error);
          // Try again after a short delay
          setTimeout(() => {
            try {
              fitAddon.fit();
            } catch (retryError) {
              console.error('Error during terminal fit retry:', retryError);
            }
          }, 100);
        }
      });

    // Welcome message
    term.writeln('\x1b[1;36m╔════════════════════════════════════════════════════════════════════╗\x1b[0m');
    term.writeln('\x1b[1;36m║\x1b[0m  \x1b[1;37mBREAKEVEN LLC TERMINAL\x1b[0m \x1b[1;90mv1.0.0\x1b[0m                                    \x1b[1;36m║\x1b[0m');
    term.writeln('\x1b[1;36m╚════════════════════════════════════════════════════════════════════╝\x1b[0m');
    term.writeln('');
    term.writeln('  \x1b[1;32m●\x1b[0m \x1b[1;37mPodcast-as-a-Service Terminal\x1b[0m');
    term.writeln('  \x1b[1;33m●\x1b[0m \x1b[90mProfessional Solutions Platform\x1b[0m');
    term.writeln('  \x1b[1;36m●\x1b[0m \x1b[90mType \x1b[1;36mhelp\x1b[0m\x1b[90m for available commands\x1b[0m');
    term.writeln('');
    term.writeln('\x1b[90m────────────────────────────────────────────────────────────────────\x1b[0m');
    term.writeln('');
    term.write('\x1b[1;36m$ \x1b[0m');

    // Focus immediately
    term.focus();

    // Handle user input
    let currentLine = '';
    let commandHistory: string[] = [];
    let historyIndex = -1;
    let isProcessingCommand = false;

    // Command processor
    const processCommand = (cmd: string) => {
      if (isProcessingCommand) return;
      isProcessingCommand = true;
      const args = cmd.split(' ');
      const command = args[0]?.toLowerCase();

      switch (command) {
        case 'help':
          term.writeln('\x1b[1;33mAvailable commands:\x1b[0m');
          term.writeln('');
          term.writeln('  \x1b[36mhelp\x1b[0m      - Show this help message');
          term.writeln('  \x1b[36mclear\x1b[0m     - Clear the terminal');
          term.writeln('  \x1b[36mdate\x1b[0m      - Show current date and time');
          term.writeln('  \x1b[36mecho\x1b[0m      - Echo back your message');
          term.writeln('  \x1b[36mabout\x1b[0m     - Learn about Breakeven LLC');
          term.writeln('  \x1b[36mstatus\x1b[0m    - Check system status');
          term.writeln('  \x1b[36mpodcast\x1b[0m   - Play/pause/stop the podcast');
          term.writeln('             \x1b[90mUsage: podcast [play|pause|stop]\x1b[0m');
          term.writeln('');
          term.writeln('\x1b[90mKeyboard shortcuts:\x1b[0m');
          term.writeln('  \x1b[90mCtrl+C - Cancel current input\x1b[0m');
          term.writeln('  \x1b[90mCtrl+L - Clear screen\x1b[0m');
          term.writeln('  \x1b[90m↑/↓    - Navigate command history\x1b[0m');
          break;
        
        case 'clear':
          term.clear();
          break;
        
        case 'date':
          term.writeln(new Date().toString());
          break;
        
        case 'echo':
          if (args.length > 1) {
            term.writeln(args.slice(1).join(' '));
          }
          break;
        
        case 'about':
          term.writeln('\x1b[1;36mBreakeven LLC\x1b[0m');
          term.writeln('\x1b[90m─────────────────────────────────────────\x1b[0m');
          term.writeln('Professional solutions for modern business challenges.');
          term.writeln('');
          term.writeln('\x1b[1;33mServices:\x1b[0m');
          term.writeln('  • Business Strategy Consulting');
          term.writeln('  • Technology Implementation');
          term.writeln('  • Innovation Leadership');
          term.writeln('');
          break;
        
        case 'status':
          term.writeln('\x1b[1;32m● System Status: Operational\x1b[0m');
          term.writeln(`\x1b[90mUptime: ${Math.floor(Math.random() * 999) + 1} days\x1b[0m`);
          term.writeln(`\x1b[90mLoad: ${(Math.random() * 2).toFixed(2)}\x1b[0m`);
          term.writeln(`\x1b[90mMemory: ${Math.floor(Math.random() * 50 + 50)}% free\x1b[0m`);
          break;
        
        case '':
          // Empty command, do nothing
          break;
        
        case 'podcast':
          const subCommand = args[1]?.toLowerCase();
          
          if (subCommand === 'stop') {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
              term.writeln('\x1b[1;33m⏹ Podcast stopped\x1b[0m');
            } else {
              term.writeln('\x1b[1;31mNo podcast is playing\x1b[0m');
            }
          } else if (subCommand === 'pause') {
            if (audioRef.current && !audioRef.current.paused) {
              audioRef.current.pause();
              term.writeln('\x1b[1;33m⏸ Podcast paused\x1b[0m');
            } else {
              term.writeln('\x1b[1;31mNo podcast is playing\x1b[0m');
            }
          } else if (subCommand === 'play' || !subCommand) {
            if (!audioRef.current) {
              audioRef.current = new Audio('/podcast.m4a');
              audioRef.current.volume = 0.7;
            }
            
            if (audioRef.current.paused) {
              term.writeln('\x1b[1;35m🎧 Playing podcast...\x1b[0m');
              term.writeln('\x1b[1;90mCommands: podcast pause | podcast stop\x1b[0m');
              audioRef.current.play().catch(err => {
                term.writeln('\x1b[1;31mError: Could not play podcast\x1b[0m');
                console.error(err);
              });
            } else {
              term.writeln('\x1b[1;33mPodcast is already playing\x1b[0m');
            }
          } else {
            term.writeln(`\x1b[1;31mUnknown podcast command: ${subCommand}\x1b[0m`);
            term.writeln('\x1b[1;90mUsage: podcast [play|pause|stop]\x1b[0m');
          }
          break;
        
        default:
          if (command) {
            term.writeln(`\x1b[1;31mCommand not found:\x1b[0m ${command}`);
            term.writeln('Type \x1b[1;36mhelp\x1b[0m for available commands');
          }
      }
      
      term.write('\x1b[1;36m$ \x1b[0m');
      isProcessingCommand = false;
    };

    term.onData((data) => {
      if (isProcessingCommand) return;
      
      const code = data.charCodeAt(0);
      
      // Handle special keys
      if (code === 127) { // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          term.write('\b \b');
        }
      } else if (code === 13) { // Enter
        term.writeln('');
        if (currentLine.trim()) {
          commandHistory.push(currentLine);
          historyIndex = commandHistory.length;
        }
        processCommand(currentLine.trim());
        currentLine = '';
      } else if (code === 27) { // Escape sequences (arrows)
        if (data === '\x1b[A') { // Up arrow
          if (historyIndex > 0) {
            // Clear current line
            term.write('\r\x1b[K');
            term.write('\x1b[1;36m$ \x1b[0m');
            historyIndex--;
            currentLine = commandHistory[historyIndex];
            term.write(currentLine);
          }
        } else if (data === '\x1b[B') { // Down arrow
          if (historyIndex < commandHistory.length - 1) {
            term.write('\r\x1b[K');
            term.write('\x1b[1;36m$ \x1b[0m');
            historyIndex++;
            currentLine = commandHistory[historyIndex];
            term.write(currentLine);
          } else if (historyIndex === commandHistory.length - 1) {
            term.write('\r\x1b[K');
            term.write('\x1b[1;36m$ \x1b[0m');
            historyIndex = commandHistory.length;
            currentLine = '';
          }
        }
      } else if (code === 3) { // Ctrl+C
        term.write('^C');
        term.writeln('');
        currentLine = '';
        term.write('\x1b[1;36m$ \x1b[0m');
      } else if (code === 12) { // Ctrl+L (clear)
        term.clear();
        term.write('\x1b[1;36m$ \x1b[0m');
        term.write(currentLine);
      } else if (code < 32) { // Other control characters
        // Ignore
      } else { // Regular characters
        currentLine += data;
        term.write(data);
      }
    });

      xtermRef.current = term;

      // Handle resize
      const handleResize = () => {
        if (fitAddon && xtermRef.current) {
          try {
            fitAddon.fit();
          } catch (error) {
            console.error('Error during terminal resize:', error);
          }
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        if (term) {
          term.dispose();
        }
      };
    };

    // Start the initialization
    initTerminal();
  }, []);

  return (
    <div className="terminal-container w-full" onClick={() => xtermRef.current?.focus()}>
      <div className="terminal-header">
        <div className="flex gap-2">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="flex-1 text-center text-sm text-gray-400">
          breakeven@llc:~$ business-terminal
        </div>
      </div>
      <div ref={terminalRef} className="h-[500px] bg-black/90 p-4 cursor-text" />
    </div>
  );
}