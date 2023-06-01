/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
//                        [0, 1, 2,  3,  4,  5,  6,  7,  8,  9, 10,  11,  12]
// export const spacing = [0, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 112, 128]

export const spacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const

export type Spacing = keyof typeof spacing
