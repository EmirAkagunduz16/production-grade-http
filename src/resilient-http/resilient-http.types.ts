import { AgentOptions as HttpAgentOptions } from 'http';
import { AgentOptions as HttpsAgentOptions } from 'https';

export interface KeepAliveOptions {
  keepAlive?: boolean;
  keepAliveMsecs?: number;
  maxSockets?: number;
  maxFreeSockets?: number;
  http?: HttpAgentOptions;
  https?: HttpsAgentOptions;
}
