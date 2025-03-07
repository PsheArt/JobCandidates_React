export interface Assignment {
    Id: number
    NameTask: string
    DescriptionTask: string
    Stak: Stack[]
    ExecutionTime: string
    IsDeleted: boolean
}
export enum Stack {
    None = "",
    JavaScript = "JavaScript",
    TypeScript = "TypeScript",
    React = "React",
    NodeJS = "NodeJS",
    Golang= "Go",
    Python = "Python",
    Java = "Java",
    CSharp = "C#",
    PHP = "PHP"
    
}