import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User, UserRole } from "./entities/user.entity";

@Injectable()
export class AuthService implements OnModuleInit{
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
    ) { }
    
    async onModuleInit(): Promise<void> {
        console.log(`The module has been initialized.`);
        await this.createAdmin();
    }

    async createAdmin() {
        const user = await this.repository.find({ role: UserRole.Admin });
        
        if (user.length === 0) {
            const hashedPassword = await bcrypt.hash("123456", 12);
            const newUser = await this.repository.save({
                email: "ismail000728@gmail.com",
                name: "İsmail KILIÇ",
                password: hashedPassword,
                role: UserRole.Admin
            });

            delete newUser.password;
            console.log("admin created");

            return newUser;
        }
    }
}
