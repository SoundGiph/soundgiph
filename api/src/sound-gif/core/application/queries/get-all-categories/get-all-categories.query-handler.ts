import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";
import { SoundGifPort } from "../../ports/sound-gif.ports";
import { GetAllCategoriesQuery, GetAllCategoriesQueryResult } from "./get-all-categories.query";

@QueryHandler(GetAllCategoriesQuery)
export class GetAllCategoriesQueryHandler implements IQueryHandler<GetAllCategoriesQuery> {
  constructor(
    @Inject(SoundGifEntity)
    private readonly SoundGifPort: Pick<SoundGifPort, "getAllCategories">
  ) {}

  public async execute(): Promise<GetAllCategoriesQueryResult> {
    const categories = await this.SoundGifPort.getAllCategories();
    return new GetAllCategoriesQueryResult(categories);
  }
}
