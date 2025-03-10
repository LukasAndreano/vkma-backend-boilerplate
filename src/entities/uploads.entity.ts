import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	BeforeInsert,
	Index,
} from "typeorm";
import { Users } from "./users.entity";
import getCurrentTimestamp from "src/utils/getCurrentTimestamp.utils";

@Index("hash_idx", ["hash"])
@Entity("uploads")
export class Uploads {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@ManyToOne(
		() => Users,
		(user) => user.id,
	)
	@JoinColumn({ name: "uploaded_by" })
	uploaded_by: number;

	@Column({ length: 128 })
	hash: string;

	@Column({ length: 512 })
	url: string;

	@Column()
	uploaded_at: number;

	@BeforeInsert()
	setUploadedAt() {
		this.uploaded_at = getCurrentTimestamp();
	}
}
