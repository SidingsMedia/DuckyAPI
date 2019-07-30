import { Module, HttpModule } from "@nestjs/common"
import { AccountsController } from "./accounts.controller"
import { AccountsService } from "./accounts.service"

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000
    })
  ],
  controllers: [AccountsController],
  providers: [AccountsService]
})
export class AccountsModule {}