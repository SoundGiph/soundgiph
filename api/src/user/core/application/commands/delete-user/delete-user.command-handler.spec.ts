import { UserEntity } from "../../../domain/user.entity";
import { UserPort } from "../../ports/user.port";
import { DeleteUserCommand } from "./delete-user.command";
import { DeleteUserCommandHandler } from "./delete-user.command-handler";

const userPort: UserPort = {
  create: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

const id = "user=id" as UserEntity["id"];
describe("deleteUserCommand", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const deleteUserCommand = new DeleteUserCommand(id);
  const deleteUserCommandHandler = new DeleteUserCommandHandler(userPort);

  it("should delete a User", async () => {
    await deleteUserCommandHandler.execute(deleteUserCommand);
    expect(userPort.delete).toHaveBeenCalledTimes(1);
  });
});
