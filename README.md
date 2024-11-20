# @antoineguglielmi/tw-typeface

A **TailwindCSS** typeface customizer.

## Basic usage

```bash
npm i @antoineguglielmi/tw-typeface
```

Then in `tailwind.config.ts` file:

```typescript
import { typeface, defineTypeface } from '@antoineguglielmi/tw-typeface'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typeface: defineTypeface({
        'heading-main': {
          fontFamily: 'var(--font-heading)',
          fontSize: 'lg-3',
        },
      }),
    },
  },

  plugins: [typeface()],
} satisfies Config
```

You can define a custom `configKey`:

```typescript
import { typeface, defineTypeface } from '@antoineguglielmi/tw-typeface'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // The custom configKey is used here to define typefaces
      myTypefaceKey: defineTypeface({
        'heading-main': {
          fontFamily: 'var(--font-heading)',
          fontSize: 'lg-3',
        },
      }),
    },
  },

  plugins: [typeface({ configKey: 'myTypefaceKey' })],
} satisfies Config
```

By default, the plugin defines a typeface `body`:

```typescript
defineTypeface({
  body: {
    fontFamily: 'var(--font-nunito)',
    fontSize: 'base',
    fontWeight: '400',
    lineHeight: '1.5',
  },
})
```

## `defineTypeface`

The `defineTypeface` function is not mandatory but provides autocompletion, providing a better developer experience.

## How to define a typeface

You can define a typeface with 6 properties:

### `extends`

By defining the key `extends`, you can copy the style from another typeface and override some styles. Provide, as a `string`, the key of the typeface you want to extend from, then set properties you want to override:

```typescript
defineTypeface({
  'body-small': {
    extends: 'body',
    fontSize: 'sm-1',
  },
})
```

### `fontFamily`,`fontSize`,`lineHeight`,`letterSpacing`,`fontWeight`

You can set the font family, size, weight, the letter spacing and line height:

```typescript
{
    extends?: string
    fontFamily?: string // Can be a css variable or a css value
    fontSize?: string // Can be a key of the spacings value or a css value
    lineHeight?: string | number
    letterSpacing?: string
    fontWeight?:
      | '100'
      | '200'
      | '300'
      | '400'
      | '500'
      | '600'
      | '700'
      | '800'
      | '900'
  }
```
