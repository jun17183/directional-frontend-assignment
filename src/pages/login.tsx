import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Box, TextField, Button, Paper, CircularProgress } from '@mui/material';
import { useLogin } from '@/features/auth/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { mutate: login, isPending } = useLogin();

  // 이메일 형식 검증
  const validateEmail = (email: string): boolean => {
    if (!email.trim()) {
      setEmailError('이메일을 입력해주세요');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다');
      return false;
    }
    
    setEmailError('');
    return true;
  };

  // 비밀번호 검증
  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    login(
      { email, password },
      {
        onSuccess: () => {
          router.push('/posts');
        },
        onError: () => {
          setEmailError('이메일 또는 비밀번호가 일치하지 않습니다');
        },
      }
    );
  };

  // 입력 시 에러 초기화
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordError) setPasswordError('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="이메일"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={() => email && validateEmail(email)}
              error={!!emailError}
              helperText={emailError}
              disabled={isPending}
              fullWidth
              autoFocus
            />
            
            <TextField
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onBlur={() => password && validatePassword(password)}
              error={!!passwordError}
              helperText={passwordError}
              disabled={isPending}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isPending}
              fullWidth
            >
              {isPending ? <CircularProgress size={24} /> : '로그인'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

