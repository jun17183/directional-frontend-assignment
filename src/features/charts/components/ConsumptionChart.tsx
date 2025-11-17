import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useCoffeeConsumption } from '../hooks/useCharts.queries';

// 팀별 색상 정의
const TEAM_COLORS = {
  Frontend: '#6366f1', // 인디고
  Backend: '#10b981', // 에메랄드
  AI: '#f59e0b', // 앰버
} as const;

export const ConsumptionChart = () => {
  const { data, isLoading, error } = useCoffeeConsumption();

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
          팀별 커피 소비와 생산성
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
          팀별 커피 소비와 생산성
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, flex: 1 }}>
          <Typography color="error">데이터를 불러오는데 실패했습니다.</Typography>
        </Box>
      </Paper>
    );
  }

  // 데이터 변환: 팀별 데이터를 cups 기준으로 병합
  const transformedData: Array<{
    cups: number;
    [key: string]: number | string;
  }> = [];

  // 모든 팀의 cups 값 수집
  const allCups = new Set<number>();
  data.teams.forEach((team) => {
    team.series.forEach((item) => {
      allCups.add(item.cups);
    });
  });

  // 각 cups 값에 대해 모든 팀의 데이터 병합
  Array.from(allCups)
    .sort((a, b) => a - b)
    .forEach((cups) => {
      const item: { cups: number; [key: string]: number | string } = { cups };
      data.teams.forEach((team) => {
        const seriesItem = team.series.find((s) => s.cups === cups);
        if (seriesItem) {
          item[`${team.team}_bugs`] = seriesItem.bugs;
          item[`${team.team}_productivity`] = seriesItem.productivity;
        }
      });
      transformedData.push(item);
    });

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
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
          팀별 커피 소비와 생산성
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
          X축: 커피 잔 수 | 왼쪽 Y축: 버그 수 (실선) | 오른쪽 Y축: 생산성 % (점선)
        </Typography>
      </Box>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={transformedData} margin={{ top: 10, right: 50, left: 50, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="cups"
              label={{ value: '커피 잔 수', position: 'insideBottom', offset: -5 }}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              yAxisId="left"
              label={{ value: '버그 수', angle: 0, position: 'left', style: { textAnchor: 'middle' } }}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: '생산성 (%)', angle: 0, position: 'right', style: { textAnchor: 'middle' } }}
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
              formatter={(value: number, name: string) => {
                const [team, metric] = name.split(' - ');
                return [`${value}${metric === '생산성' ? '%' : ''}`, `${team} ${metric}`];
              }}
              labelFormatter={(label) => `커피 ${label}잔`}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              formatter={(value: string) => {
                const [team, metric] = value.split(' - ');
                return `${team} ${metric}`;
              }}
            />
            {data.teams.map((team) => {
              const color = TEAM_COLORS[team.team as keyof typeof TEAM_COLORS] || '#6366f1';
              return (
                <React.Fragment key={team.team}>
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey={`${team.team}_bugs`}
                    stroke={color}
                    strokeWidth={2.5}
                    dot={{ r: 5, fill: color }}
                    activeDot={{ r: 7 }}
                    name={`${team.team} - 버그`}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey={`${team.team}_productivity`}
                    stroke={color}
                    strokeWidth={2.5}
                    strokeDasharray="5 5"
                    dot={{ r: 5, fill: color }}
                    activeDot={{ r: 7 }}
                    name={`${team.team} - 생산성`}
                  />
                </React.Fragment>
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

