import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, AfterLoad } from 'typeorm';

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
  @Column({ name: 'image_url' })
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

  protected difficulty: string;

  @AfterLoad()
  getDifficulty() {
    if (this.rating >= 1 && this.rating <= 4) {
      this.difficulty = 'Easy';
    } else if (this.rating >= 5 && this.rating <= 8) {
      this.difficulty = 'Mid';
    } else if (this.rating >= 9 && this.rating <= 12) {
      this.difficulty = 'Hard';
    }
  }
}
