import { Fields } from './Fields';
export class Digimon {
    id: number;
    name: string;
    xAntibody: boolean;
    imagen: string;
    level: string;
    type: string;
    attribute: string;
    fields: Fields[];
    descriptions: string;
    skills: string[];
    priorEvolutions: Digi[];
    nextEvolutions: Digi[];

    constructor(
        id: number,
        name: string,
        xAntibody: boolean,
        imagen: string,
        level: string,
        type: string,
        attribute: string,
        fields: Fields[],
        descriptions: string,
        skills: string[],
        priorEvolutions: Digi[],
        nextEvolutions: Digi[]
    ) {
        this.id = id;
        this.name = name;
        this.xAntibody = xAntibody;
        this.imagen = imagen;
        this.level = level;
        this.type = type;
        this.attribute = attribute;
        this.fields = fields;
        this.descriptions = descriptions;
        this.skills = skills;
        this.priorEvolutions = priorEvolutions;
        this.nextEvolutions = nextEvolutions;
    }
}
