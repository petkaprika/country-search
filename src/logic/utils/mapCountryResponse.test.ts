import { describe, expect, test } from '@jest/globals';
import { mapCountryResponse } from './mapCountryResponse.js';

describe('mapCountryResponse', () => {
  test('should map API country data to country card data', () => {
    const raw = {
      name: 'Israel',
      capital: 'Jerusalem',
      region: 'Asia',
      population: 9216900,
      flag: '🇮🇱',
      languages: [
        {
          iso639_1: 'he',
          iso639_2: 'heb',
          name: 'Hebrew',
          nativeName: 'עברית',
        },
      ],
    };

    expect(mapCountryResponse(raw)).toEqual({
      name: 'Israel',
      flag: '🇮🇱',
      capital: 'Jerusalem',
      region: 'Asia',
      population: 9216900,
      languages: ['Hebrew'],
    });
  });

  test('should map multiple languages', () => {
    const raw = {
      name: 'Belarus',
      capital: 'Minsk',
      region: 'Europe',
      population: 9398861,
      flag: '🇧🇾',
      languages: [{ name: 'Belarusian' }, { name: 'Russian' }],
    };

    expect(mapCountryResponse(raw).languages).toEqual(['Belarusian', 'Russian']);
  });
});
