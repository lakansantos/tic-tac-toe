export type Game = {
  player1_name: string;
  player2_name: string;
  scores: {
    player1_score: number;
    player2_score: number;
  };
  draw_count: number;
  game_room_name: string;
  winner: string;
  game_id: string;
  created_at: string;
};

export type Games = Game[];
