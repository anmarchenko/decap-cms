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
  globalThis.MessageChannel = MessageChannel;
}
if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder;
}
if (typeof globalThis.TextDecoder === 'undefined') {
  globalThis.TextDecoder = TextDecoder;
}
