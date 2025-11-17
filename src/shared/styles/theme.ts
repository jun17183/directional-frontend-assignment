import { createTheme } from '@mui/material/styles';

// 커스텀 색상 정의
export const colors = {
  sblPink: '#f23d67',
  lightGray: '#f6f7f9',
  paleGray: '#edeff2',
  softGray: '#e2e3e5',
  deepGray: '#717681',
  mediumGray: '#a7aab1',
  blackColor: '#282828',
  fontColor: '#2f3137',
  darkGray: '#3C4352',
} as const;

// MUI 테마 생성
export const theme = createTheme({
  palette: {
    primary: {
      main: colors.sblPink,
    },
    text: {
      primary: colors.fontColor,
      secondary: colors.deepGray,
    },
    background: {
      default: colors.lightGray,
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      '"Open Sans"',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // 입력 요소를 제외한 모든 요소에 user-select: none 적용
          userSelect: 'none',
          '& input, & textarea': {
            userSelect: 'text',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

