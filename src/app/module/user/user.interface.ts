
export type TUser = {
    id?: string; 
    name: string;
    email: string; 
    phone: string; 
    password: string; 
    role?: "USER" | "ADMIN" | "SUPER_ADMIN"; 
    isActive?: boolean; 
}

