import type { Credentials } from 'gmail-tester'

export interface CheckInboxOptions {
    includeBody?: boolean;
    from?: string;
    to?: string;
    subject?: string;
    before?: Date;
    after?: Date;
    label?: string;
    includeAttachments?: boolean;
  }

export interface WdioGmailServiceOptions {
    credentials: string | Credentials;
    token: string | Record<string, unknown>;
    intervalSec?: number;
    timeoutSec?: number;
  }
