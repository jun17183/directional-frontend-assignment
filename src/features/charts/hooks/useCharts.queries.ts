import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  fetchCoffeeBrands,
  fetchWeeklyMoodTrend,
  fetchCoffeeConsumption,
} from '../api/charts.api';
import type {
  CoffeeBrand,
  WeeklyMoodTrend,
  CoffeeConsumptionResponse,
} from '../api/charts.types';

/**
 * Query Keys
 */
export const chartKeys = {
  all: ['charts'] as const,
  coffeeBrands: () => [...chartKeys.all, 'coffeeBrands'] as const,
  weeklyMoodTrend: () => [...chartKeys.all, 'weeklyMoodTrend'] as const,
  coffeeConsumption: () => [...chartKeys.all, 'coffeeConsumption'] as const,
};

/**
 * 인기 커피 브랜드 조회 Hook
 */
export const useCoffeeBrands = (): UseQueryResult<CoffeeBrand[], Error> => {
  return useQuery({
    queryKey: chartKeys.coffeeBrands(),
    queryFn: fetchCoffeeBrands,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 주간 무드 트렌드 조회 Hook
 */
export const useWeeklyMoodTrend = (): UseQueryResult<WeeklyMoodTrend[], Error> => {
  return useQuery({
    queryKey: chartKeys.weeklyMoodTrend(),
    queryFn: fetchWeeklyMoodTrend,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 팀별 커피 소비 데이터 조회 Hook
 */
export const useCoffeeConsumption = (): UseQueryResult<CoffeeConsumptionResponse, Error> => {
  return useQuery({
    queryKey: chartKeys.coffeeConsumption(),
    queryFn: fetchCoffeeConsumption,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

