import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

/**
 * NÃO ESTOU USANDO ESSA PASTA NO PROJETO,
 * NA PASTA USECASES TEM CONTROLLERS QUE EXERCEM ESSE PAPEL
 */

// arquitetura limpa
// o service não deve conhecer o tipo de banco de dados que vou usar
class CreateSpecificationService {
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

export { CreateSpecificationService };
