import config from '../lib/config';

describe('lib/config', () => {
  test('exposes basic app defaults', () => {
    expect(config.app.name).toBe('ES.Database');
    expect(typeof config.app.url).toBe('string');
  });

  test('allowedEmails defaults to empty array', () => {
    expect(Array.isArray(config.allowedEmails)).toBe(true);
  });
});
