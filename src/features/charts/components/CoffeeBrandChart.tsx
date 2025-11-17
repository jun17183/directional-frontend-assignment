import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import type { CoffeeBrand } from '../api/charts.types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useCoffeeBrands } from '../hooks/useCharts.queries';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

// 공통 로딩/에러 컴포넌트
const ChartWrapper = ({
  title,
  isLoading,
  error,
  children,
}: {
  title: string;
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
}) => {
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
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, flex: 1 }}>
          <Typography color="text.secondary">로딩 중...</Typography>
        </Box>
      </Paper>
    );
  }

  if (error) {
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
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, flex: 1 }}>
          <Typography color="error">데이터를 불러오는데 실패했습니다.</Typography>
        </Box>
      </Paper>
    );
  }

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
        {title}
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0 }}>{children}</Box>
    </Paper>
  );
};

export const CoffeeBrandBarChart = () => {
  const { data, isLoading, error } = useCoffeeBrands();

  return (
    <ChartWrapper title="커피 브랜드 인기도" isLoading={isLoading} error={error}>
      {data && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="brand"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            />
            <Bar
              dataKey="popularity"
              radius={[8, 8, 0, 0]}
              name="인기도 (%)"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartWrapper>
  );
};

export const CoffeeBrandPieChart = () => {
  const { data, isLoading, error } = useCoffeeBrands();

  return (
    <ChartWrapper title="커피 브랜드 분포" isLoading={isLoading} error={error}>
      {data && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data as unknown as Array<{ brand: string; popularity: number }>}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={((entry: CoffeeBrand) => `${entry.brand}: ${entry.popularity}%`) as any}
              outerRadius="80%"
              innerRadius="60%"
              fill="#6366f1"
              dataKey="popularity"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              formatter={((value: string, entry: { payload?: CoffeeBrand }) =>
                entry.payload?.brand || value) as any}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartWrapper>
  );
};

