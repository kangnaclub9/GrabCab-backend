import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, updateUserInput } from './user.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';

@ Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService){}

    @ UseGuards(GqlAuthGuard)
    @ Query(()=> [User])
    async users() {
        return this .userService.findAll();
    }

    @ UseGuards(GqlAuthGuard)
    @ Query(()=> User)
    async user(@ Args('id') id: string){
        return await this .userService.findOne('id', id);
    }

    @ UseGuards(GqlAuthGuard)
    @ Mutation(() => Boolean )
    async deleteUser(@ Args('id') id: string){
        return await this .userService.delete(id)
    }

    @ UseGuards(GqlAuthGuard)
    @ Mutation(() => User)
    async createUser(@ Args('input') input: CreateUserDto){
        return await this .userService.create(input);
    }
    @ UseGuards(GqlAuthGuard)
    @ Mutation(() => User)
    async updateUser(
        @ Args('id') id: string,
        @ Args('input') input: updateUserInput,
    ) {
            return await this .userService.update(id, input);
      }
}
