import "reflect-metadata";
import { getContainer } from "./container";
import { BotService } from "./bot/botService";
import { Logger } from "./utils/logger";

getContainer()
    .then(async container => {
        const logger = container.get(Logger);
        logger.init("Container");
        try {
            const botService = container.get(BotService);
            botService.start();
        } catch (err) {
            console.log(err);
            logger.error("An error occured trying to initialize and start the BotService");
        }
    })
    .catch(error => {
        console.warn("An error occured trying to get container");
        console.warn(error);
        process.exit(1);
    });


