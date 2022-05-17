import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";
import { SoundGifPort } from "../../ports/sound-gif.ports";
import { IncrementSharedCountCommand } from "./increment-shared-count.command";

@CommandHandler(IncrementSharedCountCommand)
export class IncrementSharedCountCommandHandler implements ICommandHandler<IncrementSharedCountCommand> {
    constructor(
        @Inject(SoundGifEntity)
        private readonly incrementSharedCountPort: Pick<SoundGifPort, "incrementSharedCount">
    ) { }

    public async execute({ payload }: IncrementSharedCountCommand): Promise<void> {
        await this.incrementSharedCountPort.incrementSharedCount(payload);
    }
}
