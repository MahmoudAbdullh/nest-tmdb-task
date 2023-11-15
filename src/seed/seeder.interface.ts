export interface SeederInterface {
  seed(): Promise<void>;
}

export interface IGener {
  id: number;
  name: string;
}

export interface IMovie {
  id: number;
  title: string;
  overview: string;
  genre_ids: number[];
}
