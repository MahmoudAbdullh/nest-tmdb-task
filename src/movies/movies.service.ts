import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Like, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UsersService } from 'src/users/users.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { CreateFavoriteDto } from 'src/favorites/dto/create-favorite.dto';
import { GenersService } from 'src/geners/geners.service';
import { FindMoviesFilter } from './dto/find-movies-filter.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private repo: Repository<Movie>,
    private userService: UsersService,
    private favoritesService: FavoritesService,
    private genersService: GenersService,
  ) {}

  async findAll(filter: FindMoviesFilter) {
    const query = this.repo
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.votes', 'vote');
    if (!!filter.search) {
      query.where('movie.title = :title OR movie.overview = :title', {
        title: Like(`%${filter.search}%`),
      });
    }
    if (!!filter.page && !!filter.limit) {
      query.take(filter.limit).skip((filter.page - 1) * filter.limit);
    }
    const [data, count] = await query.getManyAndCount();
    return {
      data,
      meta: {
        page: filter.page,
        limit: filter.limit,
        total: count,
      },
    };
  }

  findOneBy(id: number) {
    return this.repo.findOneBy({ id });
  }

  async create({ title, overview, tmdb_id, geners }: CreateMovieDto) {
    const duplicateMovie = await this.repo.findOneBy({ tmdb_id });
    if (!!duplicateMovie) throw new BadRequestException('already exist movie');
    // because we will user external api to fill movies database
    const generItems = await this.genersService.findManyByTmdbId(geners);

    const newMovie = this.repo.create({
      title,
      overview,
      tmdb_id,
    });
    newMovie.geners = generItems;
    return this.repo.save(newMovie);
  }

  async getFavorites(userId: number) {
    // !if we user auth middleware we don't needs to send id of user
    const user = await this.userService.findOne(userId);
    if (!user) throw new BadRequestException('user not found');
    return this.favoritesService.findAllByUser(user);
  }

  addFavorite(createFavorite: CreateFavoriteDto) {
    return this.favoritesService.create(createFavorite);
  }
}
