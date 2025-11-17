/**
 * 커피 브랜드 인기도 데이터
 */
export interface CoffeeBrand {
  brand: string;
  popularity: number;
}

/**
 * 주간 무드 트렌드 데이터
 */
export interface WeeklyMoodTrend {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
}

/**
 * 커피 소비 시리즈 데이터
 */
export interface CoffeeConsumptionSeries {
  cups: number;
  bugs: number;
  productivity: number;
}

/**
 * 팀별 커피 소비 데이터
 */
export interface TeamConsumption {
  team: string;
  series: CoffeeConsumptionSeries[];
}

/**
 * 커피 소비 응답 데이터
 */
export interface CoffeeConsumptionResponse {
  teams: TeamConsumption[];
}

