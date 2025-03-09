import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class Users {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	user_id: number;

	@Column({ length: 64 })
	name: string;

	@Column({ length: 512 })
	avatar: string;

	@Column()
	updated_at: number;

	@Column()
	joined_at: number;
}
