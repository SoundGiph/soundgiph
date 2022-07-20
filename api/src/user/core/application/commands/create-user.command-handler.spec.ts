import { UserEntity } from "../../domain/user.entity";
import { UserPort } from "../ports/user.port";
import { CreateUserCommand } from "./create-user.command";
import { CreateUserCommandHandler } from "./create-user.command-handler";

const userPort: UserPort = {
  create: jest.fn(),
  findOne: jest.fn(),
};
const payload: Partial<UserEntity> = {
  deviceId: "deviceId",
  tiktokPayload: JSON.stringify({
    name: "bob",
  }),
};

describe("createUserCommand", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const createUserCommand = new CreateUserCommand(payload);
  const createUserCommandHandler = new CreateUserCommandHandler(userPort);

  it("should create a User", async () => {
    await createUserCommandHandler.execute(createUserCommand);
    expect(userPort.create).toHaveBeenCalledTimes(1);
  });
});
