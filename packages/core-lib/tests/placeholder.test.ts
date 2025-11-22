import { describe, it, expect } from 'vitest';
import { placeholder } from '../src';

describe('placeholder', () => {
  it('returns the library name', () => {
    expect(placeholder()).toBe('autocomplete-kit');
  });
});
