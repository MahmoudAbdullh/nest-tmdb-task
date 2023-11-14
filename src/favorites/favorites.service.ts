import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { UsersService } from 'src/users/users.service';
import { MoviesService } from 'src/movies/movies.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite) private repo: Repository<Favorite>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => MoviesService))
    private moviesService: MoviesService,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const user = await this.usersService.findOne(createFavoriteDto.user_id);
    const movie = await this.moviesService.findOneBy(
      createFavoriteDto.movie_id,
    );
    const fav = await this.repo.findOne({
      where: { user },
      relations: { movies: true },
    });
    // TODO check for better update method
    if (!user) throw new NotFoundException('user not exist');
    if (!movie) throw new NotFoundException('movie not exist');
    if (fav) {
      fav.movies = [...new Set([...fav.movies, movie])];
      return this.repo.save(fav);
    }
    const newFav = this.repo.create({ user, movies: [movie] });
    return this.repo.save(newFav);
  }

  findAll() {
    return this.repo.find({ relations: { movies: true } });
  }

  findAllByUser(user: User) {
    return this.repo.find({ where: { user }, relations: { movies: true } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
