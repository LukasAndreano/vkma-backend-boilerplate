import getCurrentTimestamp from "src/utils/getCurrentTimestamp.utils";
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

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
	joined_at: number;

	@BeforeInsert()
	setJoinedAt() {
		this.joined_at = getCurrentTimestamp();
	}
}
