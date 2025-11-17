import { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { isAuthenticated } from '@/features/auth/hooks/useAuth';
import { Layout } from '@/shared/components/layout/Layout';
import { CoffeeBrandBarChart, CoffeeBrandPieChart } from '@/features/charts/components/CoffeeBrandChart';
import { MoodTrendChart } from '@/features/charts/components/MoodTrendChart';
import { ConsumptionChart } from '@/features/charts/components/ConsumptionChart';
import type { NextPageWithLayout } from '../_app';

const ChartsPage: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    // 로그인 체크
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <Box sx={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
        대시보드
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 2,
          flex: 1,
          minHeight: 0,
        }}
      >
        <Box sx={{ gridColumn: '1 / 2', gridRow: '1 / 2', minHeight: 0 }}>
          <CoffeeBrandBarChart />
        </Box>
        <Box sx={{ gridColumn: '2 / 3', gridRow: '1 / 2', minHeight: 0 }}>
          <CoffeeBrandPieChart />
        </Box>
        <Box sx={{ gridColumn: '1 / 2', gridRow: '2 / 3', minHeight: 0 }}>
          <MoodTrendChart />
        </Box>
        <Box sx={{ gridColumn: '2 / 3', gridRow: '2 / 3', minHeight: 0 }}>
          <ConsumptionChart />
        </Box>
      </Box>
    </Box>
  );
};

ChartsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ChartsPage;

