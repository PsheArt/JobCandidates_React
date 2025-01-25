//Тут содержатся интерфейсы для ответов при авторизации, регистрации(потом добавить нужно) и интерфейс Юзер вынес в отдельную структуру для контекста
export interface LoginResponse {
    token: string;
    user: CustomUser;
    message?: string;
}

export interface CustomUser {
    id: string;
    username: string;
    email: string;
    role?: string;
    department?: string;
    position?: string;
    createdAt?: string;
    updatedAt?: string;
};