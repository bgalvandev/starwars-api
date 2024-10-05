export class Person {
  constructor(
    // Atributos de la people
    public id: string,
    public name: string,
    public height: string,
    public weight: string,
    public hairColor: string,
    public skinColor: string,
    public eyeColor: string,
    public birthYear: string,
    public gender: string,
    public homeworld: string,
    public films: string[],
    public species: string[],
    public vehicles: string[],
    public starships: string[],
    public created: string,
    public updated: string,
    public url: string
  ) {}
}
