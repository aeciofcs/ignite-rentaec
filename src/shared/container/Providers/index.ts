import { container } from "tsyringe";

import { IDateProvider } from "@shared/container/Providers/DateProvider/IDateProvider";

import { DayJSDateProvider } from "./DateProvider/Implementations/DayJSDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/Implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
    "DayJSDateProvider",
    DayJSDateProvider
);

container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
);
