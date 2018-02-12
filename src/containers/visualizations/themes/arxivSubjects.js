/* global rgba */
import Spacing from 'material-ui/styles/spacing';
import { white } from 'material-ui/styles/colors';

export const colors = {
  PrimaryBright: '#F9736C',
  PrimaryDark: '#4f4b4d',
  NeutralDark: '#8c8889',
  NeutralLight: '#d5e2df',
  Accent: '#fdf1d8',
  Mint: '#36bc98',
  transMint: 'rgba(54, 188, 152, 0.4)',
  transAccent: 'rgba(253, 241, 216, 0.7)',
  transCoral: 'rgba(249, 115, 108, 0.1)',
  transWhite: 'rgba(255, 255, 255, 0.7)',
  transgrey: 'rgba(225, 221, 222, 0.4)',
  transDarkGrey: 'rgba(110, 106, 107, 0.8)'
};
export const theme = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: colors.PrimaryBright,
    primary2Color: colors.PrimaryDark,
    primary3Color: colors.Mint,
    accent1Color: colors.Accent,
    accent2Color: colors.Mint,
    accent3Color: colors.NeutralLight,
    textColor: colors.PrimaryBright,
    alternateTextColor: colors.NeutralDark,
    canvasColor: white,
    borderColor: colors.NeutralDark,
    pickerHeaderColor: colors.Accent
  },
  snackbar: {
    textColor: white,
    actionColor: colors.Mint
  }
};

// previous mints
// 31be9e
// 98FFDE
