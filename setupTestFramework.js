/* eslint-disable @emotion/no-vanilla */
import '@testing-library/jest-dom/extend-expect';
import fetch from 'node-fetch';
import { MessageChannel } from 'node:worker_threads';
import { TextDecoder, TextEncoder } from 'node:util';

jest.mock('path', () => {
  const actual = jest.requireActual('path');
  return {
    ...actual.posix,
  };
});

window.fetch = fetch;
window.URL.createObjectURL = jest.fn();

// jsdom doesn't expose these globals; react-dom/server (and friends) need them.
if (typeof globalThis.MessageChannel === 'undefined') {
  // Node's MessageChannel keeps the event loop alive, which makes Jest hang
  // after each suite. Unref both ports so they don't block process exit.
  class UnrefMessageChannel extends MessageChannel {
    constructor() {
      super();
      this.port1.unref?.();
      this.port2.unref?.();
    }
  }
  globalThis.MessageChannel = UnrefMessageChannel;
}
if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder;
}
if (typeof globalThis.TextDecoder === 'undefined') {
  globalThis.TextDecoder = TextDecoder;
}
