import { Category } from "../../model/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

// DTO => Data transfer object
class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    // Quando vc coloca static em alguma coisa… variaveis, metodos… 
    //blocos… etc… vc esta dizendo que nao precisa de uma 
    //instancia daquela classe para poder acessa-lo.

    private static INSTANCE: CategoriesRepository;

    //constructor com private impede o new na hora de instaciar
    private constructor() {
        this.categories = [];
    }

    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find(
            (category) => category.name === name
        );
        return category;
    }
}

export { CategoriesRepository };
