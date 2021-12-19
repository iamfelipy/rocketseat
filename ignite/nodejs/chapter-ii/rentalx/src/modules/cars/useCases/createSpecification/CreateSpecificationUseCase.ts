import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) {}

    execute({ name, description }: IRequest): void {
        const specificationAlreadyExists =
            this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Spefication already exists!");
            // return response.status(400).json({ error: "Category already exists!" });
        }

        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
