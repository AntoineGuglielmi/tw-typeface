import plugin from 'tailwindcss/plugin'

/**
 * The typeface sets
 */
export type TypefaceSets = Record<
  string,
  {
    extends?: string
    fontFamily?: string
    fontSize?: string
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
>

/**
 * The typeface plugin
 * @param configKey The config key that will be used in config and utility classes
 * @returns The plugin
 */
export const typeface = (
  { configKey }: { configKey: string } = { configKey: 'typeface' },
) => {
  return plugin(
    function ({ addUtilities, theme, e }) {
      const typefaces = theme(configKey) as TypefaceSets // Assure-toi que TypeScript valide l'objet
      const spacing = theme('spacing')

      const newUtilities: Record<string, any> = {}

      Object.keys(typefaces).forEach((key) => {
        const styles = typefaces[key]
        const _extends = styles.extends ? typefaces[styles.extends] : {}
        const fontFamily = styles.fontFamily
          ? { fontFamily: styles.fontFamily }
          : {}
        const fontSize = styles.fontSize
          ? { fontSize: spacing![styles.fontSize] ?? styles.fontSize }
          : {}
        const lineHeight = styles.lineHeight
          ? { lineHeight: styles.lineHeight }
          : {}
        const letterSpacing = styles.letterSpacing
          ? { letterSpacing: styles.letterSpacing }
          : {}
        const fontWeight = styles.fontWeight
          ? { fontWeight: styles.fontWeight }
          : {}
        const newUtility = {
          ..._extends,
          ...fontFamily,
          ...fontSize,
          ...lineHeight,
          ...letterSpacing,
          ...fontWeight,
        }

        newUtilities[`.${e(`${configKey}-${key}`)}`] = newUtility
      })

      addUtilities(newUtilities)
    },
    {
      theme: {
        [configKey]: {
          body: {
            fontFamily: 'var(--font-nunito)',
            fontSize: 'base',
            fontWeight: '400',
            lineHeight: '1.5',
          },
        },
      },
    },
  )
}

/**
 * Define the typeface sets
 * @param typefaceSets The typeface sets
 * @returns The typeface sets
 */
export const defineTypeface = (typefaceSets: TypefaceSets): TypefaceSets => {
  return typefaceSets
}
