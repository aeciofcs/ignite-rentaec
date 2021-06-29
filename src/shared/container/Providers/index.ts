import { container } from "tsyringe";

import { IDateProvider } from "@shared/container/Providers/DateProvider/IDateProvider";

import { DayJSDateProvider } from "./DateProvider/Implementations/DayJSDateProvider";

container.registerSingleton<IDateProvider>(
    "DayJSDateProvider",
    DayJSDateProvider
);
