import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { FilesService } from 'src/files/files.service';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService,
  ) {}

  async create(dto: CreatePostDto, image: any) {
    const imageName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: imageName });
    return post;
  }
}
