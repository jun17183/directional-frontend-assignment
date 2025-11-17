import { apiClient } from '@/shared/lib/axios';
import type {
  CoffeeBrand,
  WeeklyMoodTrend,
  CoffeeConsumptionResponse,
} from './charts.types';

/**
 * 인기 커피 브랜드 조회
 * GET /mock/top-coffee-brands
 */
export const fetchCoffeeBrands = async (): Promise<CoffeeBrand[]> => {
  const response = await apiClient.get<CoffeeBrand[]>('/mock/top-coffee-brands');
  return response.data;
};

/**
 * 주간 무드 트렌드 조회
 * GET /mock/weekly-mood-trend
 */
export const fetchWeeklyMoodTrend = async (): Promise<WeeklyMoodTrend[]> => {
  const response = await apiClient.get<WeeklyMoodTrend[]>('/mock/weekly-mood-trend');
  return response.data;
};

/**
 * 팀별 커피 소비 데이터 조회
 * GET /mock/coffee-consumption
 */
export const fetchCoffeeConsumption = async (): Promise<CoffeeConsumptionResponse> => {
  const response = await apiClient.get<CoffeeConsumptionResponse>('/mock/coffee-consumption');
  return response.data;
};

