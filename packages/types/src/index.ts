export type Sport = 'NBA' | 'NFL' | 'MLB' | 'NHL';

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface TrackedBet {
  id: string;
  userId: string;
  sport: Sport;
  gameId: string;
  marketType: 'spread' | 'moneyline' | 'total' | 'player_prop';
  stake: number;
  odds: number;
  createdAt: string;
}
