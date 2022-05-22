import { createZodDto } from '@anatine/zod-nestjs';
import { zUser } from '@cookie-gg/shared';

export class User extends createZodDto(zUser) {}

export class CreateUserInput extends createZodDto(
  zUser.omit({
    createdAt: true,
    updatedAt: true,
  }),
) {}

export class UpdateUserInput extends createZodDto(
  zUser.omit({
    createdAt: true,
    updatedAt: true,
  }),
) {}
