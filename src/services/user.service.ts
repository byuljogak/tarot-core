import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteUser(userUuid: string) {
    await this.prisma.latestTarot.deleteMany({
      where: {
        userUuid,
      },
    });
  }
}
