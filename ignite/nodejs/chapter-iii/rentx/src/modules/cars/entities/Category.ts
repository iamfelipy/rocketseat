import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

// classe vira uma entidade
@Entity("categories")
class Category {
  // mapear atributos dizendo que cada um é uma coluna
  // primary Column do id igual a do migration, se não fosse teria que passar usando @column
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category };
