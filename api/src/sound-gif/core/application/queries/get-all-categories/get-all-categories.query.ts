import { IQuery, IQueryResult } from "@nestjs/cqrs";

export class GetAllCategoriesQuery implements IQuery {}

export class GetAllCategoriesQueryResult implements IQueryResult {
  constructor(public readonly categories: string[]) {}
}
