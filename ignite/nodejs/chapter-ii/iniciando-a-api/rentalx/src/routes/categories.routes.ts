import { Router } from "express";
import { createCategoryController } from "../modules/cars/useCases/createCategory";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryUseCase } from "../modules/cars/useCases/createCategory/CreateCategoryUseCase";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

// categoriesRoutes.get("/", (request, response) => {
//     const all = categoriesRepository.list();
//     return response.json(all);
// });

export { categoriesRoutes };
