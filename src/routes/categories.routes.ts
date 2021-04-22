import { Router } from "express";
import multer from "multer";

// import createCategoryController from "../modules/cars/useCases/createCategory";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/listCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

/*
categoriesRoutes.post("/", (request, response) => {
    return createCategoryController().handle(request, response);
}); */
categoriesRoutes.post("/", createCategoryController.handle);

/*
categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
}); */
categoriesRoutes.get("/", listCategoriesController.handle);

/*
categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response);
}); */
categoriesRoutes.post(
    "/import",
    upload.single("file"),
    importCategoryController.handle
);

export { categoriesRoutes };
