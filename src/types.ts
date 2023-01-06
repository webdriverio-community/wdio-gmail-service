

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
    credentialsJsonPath: string;
    tokenJsonPath: string;
    intervalSec?: number;
    timeoutSec?: number;
  }
