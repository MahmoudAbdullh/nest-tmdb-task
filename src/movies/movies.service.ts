import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
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

  async findAll({ search, gener_id, page = 1, limit = 10 }: FindMoviesFilter) {
    const query = this.repo
      .createQueryBuilder('movie')
      .leftJoin('movie.votes', 'vote')
      .leftJoinAndSelect('movie.geners', 'gener');
    // TODO Gtting Rating AV()
    if (!!search) {
      query.where('movie.title like :search OR movie.overview like :search ', {
        search: `%${search}%`,
      });
    }
    if (!!gener_id) {
      // TODO Filter with gener ID
    }

    if (!!page && !!limit) {
      query.take(limit).skip((page - 1) * limit);
    }

    const [data, count] = await query.getManyAndCount();
    return {
      data,
      meta: {
        page: page || 1,
        limit,
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
