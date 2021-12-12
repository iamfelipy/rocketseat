import { Response, Request } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// todo controller só vai ter um useCase, um handle garante isso

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        this.createCategoryUseCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateCategoryController };
