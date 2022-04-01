import { Repository } from "typeorm";
import { SoundGifEntity } from "../../core/domain/sound-gif.entity";
import { searchSoundGifQuery } from "./searchSoundGifQueryBuilder";

const mockSoundGifRepository = jest.fn(() => ({
  createQueryBuilder: jest.fn(() => ({
    where: whereSpy,
    andWhere: andWhereSpy,
    getMany: getManySpy,
    orderBy: orderBySpy,
  })),
}))() as unknown as Repository<SoundGifEntity>;

const whereSpy = jest.fn().mockReturnThis();
const andWhereSpy = jest.fn().mockReturnThis();
const getManySpy = jest.fn().mockReturnThis();
const orderBySpy = jest.fn().mockReturnThis();

describe("searchSoundGifQuery", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    [undefined, undefined, { queryBuilder: 1, where: 0, andWhere: 0, orderBy: 0, getMany: 1 }],
    [undefined, "tags", { queryBuilder: 1, where: 0, andWhere: 1, orderBy: 0, getMany: 1 }],
    [{ category: "sport" }, undefined, { queryBuilder: 1, where: 1, andWhere: 0, orderBy: 0, getMany: 1 }],
    [{ category: "sport" }, "zidane", { queryBuilder: 1, where: 1, andWhere: 1, orderBy: 0, getMany: 1 }],
    [{ category: "sport" }, "zidane", { queryBuilder: 1, where: 1, andWhere: 1, orderBy: 0, getMany: 1 }],
    [
      { category: "sport", mostRecent: true },
      "zidane",
      { queryBuilder: 1, where: 1, andWhere: 1, orderBy: 1, getMany: 1 },
    ],
    [
      { category: "sport", mostShared: true },
      "zidane",
      { queryBuilder: 1, where: 1, andWhere: 1, orderBy: 1, getMany: 1 },
    ],
  ])("should call the repo with filters %s, fulltext: %s", async (filters, fulltext, expectedResults) => {
    await searchSoundGifQuery(mockSoundGifRepository, filters, fulltext);
    expect(mockSoundGifRepository.createQueryBuilder).toHaveBeenCalledTimes(expectedResults.queryBuilder);
    expect(whereSpy).toHaveBeenCalledTimes(expectedResults.where);
    expect(andWhereSpy).toHaveBeenCalledTimes(expectedResults.andWhere);
    expect(orderBySpy).toHaveBeenCalledTimes(expectedResults.orderBy);
    expect(getManySpy).toHaveBeenCalledTimes(expectedResults.getMany);
  });
});
