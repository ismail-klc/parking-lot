import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole{
    Admin = 'Admin',
    Attendant = 'Attendant'
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()    
    @Exclude()
    password: string;

    @Column()    
    role: UserRole;

    @Column({ default: true })
    isActive: boolean;
}