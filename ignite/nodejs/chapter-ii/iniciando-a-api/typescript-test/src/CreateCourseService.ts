
/**
 * name - string
 * duration - number
 * educator - string
 */

interface Course {
    name: string;
    duration: number;
    educator: string;
}

class CreateCourseService {
    
    //quando eu faço deve forma o envio dos argumentos deve respeitar essa ordem
    // execute(name: string, duration: number, educator: string){
    // execute(data: Course){
    execute({duration, educator, name}: Course){
        console.log(name, duration, educator);
    }
}

export default new CreateCourseService();