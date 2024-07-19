import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Pizza {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({name: "image_url"})
  imageUrl: string;

  @Field()
  @Column()
  rating: number;

  @Field(() => [String], { nullable: true })
  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  ingredients: string[];

  @Field(() => [String], { nullable: true })
  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  instructions: string[];
}
