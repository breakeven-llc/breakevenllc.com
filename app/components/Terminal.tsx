'use client';

import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

export default function TerminalComponent() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const visualizerInterval = useRef<NodeJS.Timeout | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

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
    term.writeln('\x1b[1;35m╔════════════════════════════════════════════════════════════════════╗\x1b[0m');
    term.writeln('\x1b[1;35m║\x1b[0m  \x1b[1;36m💼 BREAKEVEN LLC TERMINAL v1.0 💼\x1b[0m                                \x1b[1;35m║\x1b[0m');
    term.writeln('\x1b[1;35m╚════════════════════════════════════════════════════════════════════╝\x1b[0m');
    term.writeln('');
    term.writeln('\x1b[1;32mPodcast-as-a-Service Terminal\x1b[0m');
    term.writeln('');
    term.writeln('\x1b[33mType "help" to see available commands\x1b[0m');
    term.writeln('\x1b[35mTry "podcast play" to stream MLG #22: Vibe-Driven Development 🎧\x1b[0m');
    term.writeln('');
    term.write('\x1b[1;36m$ \x1b[0m');

    // Focus immediately
    term.focus();

    // Handle user input
    let currentLine = '';
    let commandHistory: string[] = [];
    let historyIndex = -1;
    let isPodcastPlaying = false;
    let podcastProgress = 0;
    let podcastDuration = 0;
    
    // Podcast data
    const podcasts = {
      mlg: {
        title: 'MLG #22: Vibe-Driven Development',
        url: 'https://ocdevel.com/files/mlg/machine-learning-guide-22.mp3',
        host: 'OCDevel',
        duration: '45:32'
      },
      sniped: {
        title: 'Sniped Podcast',
        url: 'https://sniped.com',
        host: 'Various',
        duration: 'N/A'
      }
    };
    
    // ASCII Visualizer Frames
    const visualizerFrames = [
      '▁▂▃▄▅▆▇█▇▆▅▄▃▂▁',
      '▂▃▄▅▆▇█▇▆▅▄▃▂▁▂',
      '▃▄▅▆▇█▇▆▅▄▃▂▁▂▃',
      '▄▅▆▇█▇▆▅▄▃▂▁▂▃▄',
      '▅▆▇█▇▆▅▄▃▂▁▂▃▄▅',
      '▆▇█▇▆▅▄▃▂▁▂▃▄▅▆',
      '▇█▇▆▅▄▃▂▁▂▃▄▅▆▇',
      '█▇▆▅▄▃▂▁▂▃▄▅▆▇█'
    ];
    let visualizerFrame = 0;
    
    // Format time helper
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    // ASCII Progress Bar
    const generateProgressBar = (current: number, total: number, width: number = 30) => {
      const percentage = total > 0 ? current / total : 0;
      const filled = Math.floor(percentage * width);
      const empty = width - filled;
      return `[${'>'.repeat(filled)}${'-'.repeat(empty)}] ${Math.floor(percentage * 100)}%`;
    };

    // Command processor
    const processCommand = (cmd: string) => {
      const args = cmd.split(' ');
      const command = args[0]?.toLowerCase();

      switch (command) {
        case 'help':
          term.writeln('\x1b[1;33mAvailable commands:\x1b[0m');
          term.writeln('  \x1b[36mhelp\x1b[0m     - Show this help message');
          term.writeln('  \x1b[36mclear\x1b[0m    - Clear the terminal');
          term.writeln('  \x1b[36mdate\x1b[0m     - Show current date and time');
          term.writeln('  \x1b[36mecho\x1b[0m     - Echo back your message');
          term.writeln('');
          term.writeln('  \x1b[35m🎙️  Podcast Commands:\x1b[0m');
          term.writeln('  \x1b[36mpodcast list\x1b[0m   - List available podcasts');
          term.writeln('  \x1b[36mpodcast play\x1b[0m   - Play the MLG vibe coding episode');
          term.writeln('  \x1b[36mpodcast pause\x1b[0m  - Pause playback');
          term.writeln('  \x1b[36mpodcast stop\x1b[0m   - Stop playback');
          term.writeln('  \x1b[36mpodcast status\x1b[0m - Show playback status');
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
        
        case '':
          // Empty command, do nothing
          break;
        
        case 'podcast':
          const subCmd = args[1]?.toLowerCase();
          
          switch (subCmd) {
            case 'list':
              term.writeln('\x1b[1;35m🎙️  Available Podcasts:\x1b[0m');
              term.writeln('');
              Object.entries(podcasts).forEach(([key, podcast]) => {
                term.writeln(`  \x1b[36m${key}\x1b[0m - ${podcast.title}`);
                term.writeln(`       Host: ${podcast.host} | Duration: ${podcast.duration}`);
                term.writeln('');
              });
              break;
              
            case 'play':
              if (!audioRef.current) {
                audioRef.current = new Audio();
                audioRef.current.addEventListener('loadedmetadata', () => {
                  podcastDuration = audioRef.current!.duration;
                });
                audioRef.current.addEventListener('ended', () => {
                  isPodcastPlaying = false;
                  if (visualizerInterval.current) {
                    clearInterval(visualizerInterval.current);
                  }
                  if (progressInterval.current) {
                    clearInterval(progressInterval.current);
                  }
                  term.writeln('\n\x1b[1;32m✓ Podcast finished\x1b[0m');
                  term.write('\x1b[1;36m$ \x1b[0m');
                });
              }
              
              term.writeln('\x1b[1;33m⏳ Loading MLG #22: Vibe-Driven Development...\x1b[0m');
              term.writeln('');
              
              // Simulate wget-style download
              let downloadProgress = 0;
              const downloadInterval = setInterval(() => {
                term.write(`\r\x1b[K\x1b[1;32mDownloading:\x1b[0m ${generateProgressBar(downloadProgress, 100, 40)}`);
                downloadProgress += Math.random() * 15;
                if (downloadProgress >= 100) {
                  clearInterval(downloadInterval);
                  term.writeln(`\r\x1b[K\x1b[1;32mDownloading:\x1b[0m ${generateProgressBar(100, 100, 40)}`);
                  term.writeln('\n\x1b[1;32m✓ Download complete\x1b[0m');
                  term.writeln('');
                  
                  // Start playback
                  audioRef.current!.src = podcasts.mlg.url;
                  audioRef.current!.play().then(() => {
                    isPodcastPlaying = true;
                    term.writeln('\x1b[1;35m▶️  Now Playing: MLG #22: Vibe-Driven Development\x1b[0m');
                    term.writeln('');
                    
                    // Start visualizer
                    visualizerInterval.current = setInterval(() => {
                      if (isPodcastPlaying && audioRef.current) {
                        const time = formatTime(audioRef.current.currentTime);
                        const duration = formatTime(podcastDuration);
                        const progress = generateProgressBar(audioRef.current.currentTime, podcastDuration);
                        const viz = visualizerFrames[visualizerFrame % visualizerFrames.length];
                        
                        term.write(`\r\x1b[K\x1b[1;32m♪\x1b[0m ${viz} \x1b[1;36m[${time} / ${duration}]\x1b[0m ${progress}`);
                        visualizerFrame++;
                      }
                    }, 100);
                  }).catch(err => {
                    term.writeln('\x1b[1;31m✗ Error loading podcast\x1b[0m');
                    console.error(err);
                  });
                }
              }, 100);
              break;
              
            case 'pause':
              if (audioRef.current && isPodcastPlaying) {
                audioRef.current.pause();
                isPodcastPlaying = false;
                if (visualizerInterval.current) {
                  clearInterval(visualizerInterval.current);
                }
                term.writeln('\n\x1b[1;33m⏸  Paused\x1b[0m');
              } else {
                term.writeln('\x1b[1;31mNo podcast playing\x1b[0m');
              }
              break;
              
            case 'resume':
              if (audioRef.current && !isPodcastPlaying && audioRef.current.src) {
                audioRef.current.play();
                isPodcastPlaying = true;
                term.writeln('\x1b[1;32m▶️  Resumed\x1b[0m');
              }
              break;
              
            case 'stop':
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                isPodcastPlaying = false;
                if (visualizerInterval.current) {
                  clearInterval(visualizerInterval.current);
                }
                if (progressInterval.current) {
                  clearInterval(progressInterval.current);
                }
                term.writeln('\n\x1b[1;31m⏹  Stopped\x1b[0m');
              }
              break;
              
            case 'status':
              if (audioRef.current && audioRef.current.src) {
                const status = isPodcastPlaying ? 'Playing' : 'Paused';
                const time = formatTime(audioRef.current.currentTime);
                const duration = formatTime(podcastDuration);
                term.writeln(`\x1b[1;35mStatus:\x1b[0m ${status}`);
                term.writeln(`\x1b[1;35mProgress:\x1b[0m ${time} / ${duration}`);
              } else {
                term.writeln('\x1b[1;31mNo podcast loaded\x1b[0m');
              }
              break;
              
            default:
              term.writeln('\x1b[1;31mUnknown podcast command\x1b[0m');
              term.writeln('Usage: podcast [list|play|pause|stop|status]');
          }
          break;
        
        default:
          if (command) {
            term.writeln(`\x1b[1;31mCommand not found:\x1b[0m ${command}`);
            term.writeln('Type \x1b[1;36mhelp\x1b[0m for available commands');
          }
      }
      
      term.write('\x1b[1;36m$ \x1b[0m');
    };

    term.onData((data) => {
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
            for (let i = 0; i < currentLine.length; i++) {
              term.write('\b \b');
            }
            historyIndex--;
            currentLine = commandHistory[historyIndex];
            term.write(currentLine);
          }
        } else if (data === '\x1b[B') { // Down arrow
          if (historyIndex < commandHistory.length - 1) {
            for (let i = 0; i < currentLine.length; i++) {
              term.write('\b \b');
            }
            historyIndex++;
            currentLine = commandHistory[historyIndex];
            term.write(currentLine);
          } else if (historyIndex === commandHistory.length - 1) {
            for (let i = 0; i < currentLine.length; i++) {
              term.write('\b \b');
            }
            historyIndex = commandHistory.length;
            currentLine = '';
          }
        }
      } else if (code === 3) { // Ctrl+C
        term.writeln('^C');
        currentLine = '';
        term.write('\x1b[1;36m$ \x1b[0m');
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
        if (visualizerInterval.current) {
          clearInterval(visualizerInterval.current);
        }
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
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
    <div className="terminal-container w-full h-[500px]" onClick={() => xtermRef.current?.focus()}>
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
      <div ref={terminalRef} className="h-[calc(100%-40px)] bg-black/90 p-4 cursor-text" />
    </div>
  );
}