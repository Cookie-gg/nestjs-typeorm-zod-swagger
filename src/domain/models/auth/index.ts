import { createZodDto } from '@anatine/zod-nestjs';
import { zAuth, zLoginInput } from '@cookie-gg/shared';

export class Auth extends createZodDto(zAuth) {}

export class LoginInput extends createZodDto(zLoginInput) {}
