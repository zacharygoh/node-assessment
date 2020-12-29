import { JsonController, Param, Body, Get, Post, HttpCode } from "routing-controllers"
import { logger } from "@space/asgard"

@JsonController("/sample")
export class SampleController {
    @Get("/")
    getSampleData() {
        logger.info("test", "message", module)
        return "Hello World"
    }
}