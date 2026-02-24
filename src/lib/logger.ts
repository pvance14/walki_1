type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

type LogFields = Record<string, unknown>;

type Logger = {
  trace: (msg: string, fields?: LogFields) => void;
  debug: (msg: string, fields?: LogFields) => void;
  info: (msg: string, fields?: LogFields) => void;
  warn: (msg: string, fields?: LogFields) => void;
  error: (msg: string, fields?: LogFields) => void;
  fatal: (msg: string, fields?: LogFields) => void;
  child: (bindings: LogFields) => Logger;
};

type StructuredLogEntry = {
  level: number;
  time: string;
  msg: string;
  app: 'walki-web';
  env: string;
  sessionId: string;
  seq: number;
} & LogFields;

declare global {
  interface Window {
    __walkiLogs?: StructuredLogEntry[];
  }
}

const LEVEL_VALUES: Record<LogLevel, number> = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const MAX_BUFFERED_LOGS = 500;
const LOGGER_SESSION_ID = Math.random().toString(36).slice(2, 10);
let sequence = 0;

const coerceLogLevel = (raw: string | undefined): LogLevel => {
  const normalized = raw?.toLowerCase();
  if (normalized === 'trace' || normalized === 'debug' || normalized === 'info' || normalized === 'warn' || normalized === 'error' || normalized === 'fatal') {
    return normalized;
  }
  return import.meta.env.DEV ? 'debug' : 'info';
};

const minLevel = coerceLogLevel(import.meta.env.VITE_LOG_LEVEL);
const minLevelValue = LEVEL_VALUES[minLevel];

const sanitizeFields = (fields: LogFields | undefined): LogFields => {
  if (!fields) {
    return {};
  }

  const next: LogFields = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value instanceof Error) {
      next[key] = {
        name: value.name,
        message: value.message,
        stack: value.stack,
      };
      continue;
    }
    next[key] = value;
  }
  return next;
};

const pushToBuffer = (entry: StructuredLogEntry) => {
  if (typeof window === 'undefined') {
    return;
  }

  const existing = window.__walkiLogs ?? [];
  existing.push(entry);
  if (existing.length > MAX_BUFFERED_LOGS) {
    existing.splice(0, existing.length - MAX_BUFFERED_LOGS);
  }
  window.__walkiLogs = existing;
};

const emit = (level: LogLevel, msg: string, bindings: LogFields, fields?: LogFields) => {
  const levelValue = LEVEL_VALUES[level];
  if (levelValue < minLevelValue) {
    return;
  }

  const entry: StructuredLogEntry = {
    level: levelValue,
    time: new Date().toISOString(),
    msg,
    app: 'walki-web',
    env: import.meta.env.MODE,
    sessionId: LOGGER_SESSION_ID,
    seq: sequence++,
    ...bindings,
    ...sanitizeFields(fields),
  };

  const serialized = JSON.stringify(entry);
  if (levelValue >= LEVEL_VALUES.error) {
    console.error(serialized);
  } else if (levelValue >= LEVEL_VALUES.warn) {
    console.warn(serialized);
  } else {
    console.log(serialized);
  }

  pushToBuffer(entry);
};

const createLogger = (bindings: LogFields = {}): Logger => ({
  trace: (msg, fields) => emit('trace', msg, bindings, fields),
  debug: (msg, fields) => emit('debug', msg, bindings, fields),
  info: (msg, fields) => emit('info', msg, bindings, fields),
  warn: (msg, fields) => emit('warn', msg, bindings, fields),
  error: (msg, fields) => emit('error', msg, bindings, fields),
  fatal: (msg, fields) => emit('fatal', msg, bindings, fields),
  child: (childBindings) => createLogger({ ...bindings, ...childBindings }),
});

export const logger = createLogger();
export type { Logger, LogFields, StructuredLogEntry };
