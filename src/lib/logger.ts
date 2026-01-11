/**
 * Simple Logger utility
 * Provides consistent logging across the application
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const formatLog = (level: LogLevel, message: string, data?: unknown): LogEntry => {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
  };

  if (data) {
    entry.data = data;
  }

  return entry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (level: LogLevel, message: string, data?: any) => {
  const entry = formatLog(level, message, data);

  if (isProduction) {
    // In production, only log errors and warnings
    if (level === 'error' || level === 'warn') {
      console.log(JSON.stringify(entry));
    }
  } else if (isDevelopment) {
    // In development, log everything with colors
    const colors = {
      info: '\x1b[36m', // cyan
      warn: '\x1b[33m', // yellow
      error: '\x1b[31m', // red
      debug: '\x1b[35m', // magenta
    };
    const reset = '\x1b[0m';
    const color = colors[level];
    console.log(
      `${color}[${entry.timestamp}] [${level.toUpperCase()}]${reset} ${message}`,
      data ? data : ''
    );
  }
};

export const logger = {
  /**
   * Log informational messages
   */
  info: (message: string, data?: unknown) => log('info', message, data),

  /**
   * Log warning messages
   */
  warn: (message: string, data?: unknown) => log('warn', message, data),

  /**
   * Log error messages
   */
  error: (message: string, error?: unknown) => {
    if (error instanceof Error) {
      log('error', message, {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      log('error', message, error);
    }
  },

  /**
   * Log debug messages (development only)
   */
  debug: (message: string, data?: unknown) => {
    if (isDevelopment) {
      log('debug', message, data);
    }
  },

  /**
   * Log performance metrics
   */
  perf: (label: string, duration: number) => {
    const msg = `${label}: ${duration}ms`;
    if (duration > 1000) {
      log('warn', msg);
    } else {
      log('debug', msg);
    }
  },
};
