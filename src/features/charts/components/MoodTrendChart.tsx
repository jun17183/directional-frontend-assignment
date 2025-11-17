import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { useWeeklyMoodTrend } from '../hooks/useCharts.queries';

export const MoodTrendChart = () => {
  const { data, isLoading, error } = useWeeklyMoodTrend();

  if (isLoading) {
    return (
      <Paper
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
          주간 무드 트렌드
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, flex: 1 }}>
          <Typography color="text.secondary">로딩 중...</Typography>
        </Box>
      </Paper>
    );
  }

  if (error || !data) {
    return (
      <Paper
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
          주간 무드 트렌드
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, flex: 1 }}>
          <Typography color="error">데이터를 불러오는데 실패했습니다.</Typography>
        </Box>
      </Paper>
    );
  }

  // 날짜 포맷팅 (YYYY-MM-DD -> MM/DD)
  const formattedData = data.map((item) => ({
    ...item,
    week: new Date(item.week).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }),
  }));

  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600, fontSize: '1.1rem' }}>
        주간 무드 트렌드
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="week"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              unit="%"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                zIndex: 9999,
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area
              type="monotone"
              dataKey="happy"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.7}
              name="행복 (%)"
            />
            <Area
              type="monotone"
              dataKey="tired"
              stackId="1"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.7}
              name="피곤 (%)"
            />
            <Area
              type="monotone"
              dataKey="stressed"
              stackId="1"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.7}
              name="스트레스 (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

