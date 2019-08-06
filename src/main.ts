import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import * as helmet from "helmet"

declare const module: any

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.use(helmet())

  const options = new DocumentBuilder()
    .setTitle("DuckyAPI")
    .setDescription("A customer facing api for WildDuck")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("Authentication")
    .addTag("Email Accounts")
    .addTag("Users")
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup("/swagger", app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: 0,
      operationsSorter: "method"
    }
  })

  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose((): Promise<void> => app.close())
  }
}
bootstrap()
