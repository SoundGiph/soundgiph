import { UserEntity } from "../../domain/user.entity";
import { UserPort } from "../ports/user.port";
import { FindUserCommand } from "./find-user.query";
import { FindUserCommandHandler } from "./find-user.query-handler";

const userPort: Pick<UserPort, "findOne"> = {
  findOne: jest.fn(),
};

const id = "id" as UserEntity["id"];

describe("findUserCommand", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const findUserCommand = new FindUserCommand({ where: { id } });
  const findUserCommandHandler = new FindUserCommandHandler(userPort);

  it("should find a User", async () => {
    await findUserCommandHandler.execute(findUserCommand);
    expect(userPort.findOne).toHaveBeenCalledTimes(1);
  });
});
