import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "user" })
export class DebugUserEntity {
  @PrimaryColumn({ type: "varchar", length: 191 })
  username!: string;

  @Column({ type: "varchar", length: 32 })
  gender!: string;
}
