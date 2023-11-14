import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote) private repo: Repository<Vote>,
    private usersService: UsersService,
    private moviesService: MoviesService,
  ) {}

  async findAll() {
    return this.repo.find({ relations: { user: true } });
  }

  async create(createVoteDto: CreateVoteDto) {
    const user = await this.usersService.findOne(createVoteDto.user_id);
    const movie = await this.moviesService.findOneBy(createVoteDto.movie_id);
    const voted = await this.repo.findOne({ where: { user } });

    if (!!voted) return new BadRequestException('already voted');
    if (!user) return new NotFoundException('user not exist');
    if (!movie) return new NotFoundException('movie not exist');
    const newVote = this.repo.create({
      user,
      movie,
      rate: createVoteDto.vote,
    });
    return this.repo.save(newVote);
  }

  async remove(id: number) {
    await this.repo.delete(id);
  }
}
