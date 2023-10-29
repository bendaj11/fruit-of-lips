export type ID = string;

export interface BaseEntity<T = ID> {
  id: T;
  updatedAt: string;
}

export interface EntityUpdate<U = ID, D = ID> {
  upserted: U[];
  deleted: D[];
}
