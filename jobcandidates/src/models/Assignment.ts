export interface Assignment {
    Id: number
    NameTask: string
    DescriptionTask: string
    Stak: Stack[]
    DeadLine: Date
    ExecutionTime: Date
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