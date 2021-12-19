import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

/*
 [] - Definir o tipo de retorno
 [] - Alterar o retorno de erro
 [] - Acessar o repositorio
 [] - Retornar algo
*/

// regras de ngocio da aplicação

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({ description, name }: IRequest): void {
        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category already exists!");
            // return response.status(400).json({ error: "Category already exists!" });
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
