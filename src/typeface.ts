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
      // Get the typefaces from the theme
      const typefaces = theme(configKey) as TypefaceSets // Assure-toi que TypeScript valide l'objet

      // Get the spacing from the theme
      const spacing = theme('spacing')

      // Initialize the new utilities
      const newUtilities: Record<string, any> = {}

      // Loop through the typefaces
      Object.keys(typefaces).forEach((key) => {
        // Get the styles
        const styles = typefaces[key]

        // Get the extends and other styles
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

        // Merge the styles overridding the extends
        const newUtility = {
          ..._extends,
          ...fontFamily,
          ...fontSize,
          ...lineHeight,
          ...letterSpacing,
          ...fontWeight,
        }

        // Update the theme object so that it can be extended
        theme(configKey)![key] = newUtility

        // Add the new utility
        newUtilities[`.${e(`${configKey}-${key}`)}`] = newUtility
      })

      // Add the new utilities
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
  // Return the typeface sets as is.
  // This function is only used to help autocompletion in the editor
  return typefaceSets
}
