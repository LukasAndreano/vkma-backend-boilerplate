import getCurrentTimestamp from "src/utils/getCurrentTimestamp.utils";
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BeforeInsert,
	Index,
} from "typeorm";

@Index("user_id_idx", ["user_id"])
@Entity("users")
export class Users {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	user_id: number;

	@Column()
	joined_at: number;

	@BeforeInsert()
	setJoinedAt() {
		this.joined_at = getCurrentTimestamp();
	}
}
