import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request: any): Promise<boolean> {
        const token = request.cookies.token;

        try {
            const data = await this.jwtService.verifyAsync(token);

            if (data["role"] !== UserRole.Admin) {
                throw new UnauthorizedException();
            }

        } catch (error) {
            throw new UnauthorizedException("You are not admin");
        }

        return true;
    }
}