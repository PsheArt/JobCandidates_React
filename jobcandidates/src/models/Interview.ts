import { Candidate } from "./Candidate"
import { Assignment } from "./Assignment"

export interface Interview {
    Id: number
    Name:string
    CandidateId: Candidate
    DateInterview: Date
    Department: string
    Position: string
    Assignment: Assignment
    LinkOnCompletedTask: string
    AttachedFiles: File[]
    Interviewer: string
    HeadOfDepartment: string
    Status:string

}
 