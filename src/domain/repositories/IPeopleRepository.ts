import { Person } from "../../data/dynamodb/";

export interface IPeopleRepository {
  getAll(): Promise<{ Items: Person[]; TotalCount: number }>;
  getById(id: string): Promise<Person | null>;
  create(person: Person): Promise<Person>;
}
