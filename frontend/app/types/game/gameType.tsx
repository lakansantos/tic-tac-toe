export type Game = {
  players: {
    player1: {
      name: string;
      score: number;
    };
    player2: {
      name: string;
      score: number;
    };
  };
  draw_count: number;
  winner: string;
  game_id: string;
  created_at: string;
  rounds_count: number;
};

export type Games = Game[];
