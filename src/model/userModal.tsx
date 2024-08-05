// Interface for the response of getUser API
export interface UserModal {
    status: string;
    user: User;
    isDriver: boolean;
    driverDetails?: DriverDetails;  // Make this optional since it's not present when isDriver is false
}

// Interface for user details
export interface User {
    id: number;
    email: string;
    firstname: string | null;
    lastname: string | null;
    username: string | null;
    phone: string | null;
    profile_image: string | null;
    driver_id?: number | null;  // Optional
    user_id?: number | null;    // Optional
    street?: string | null;     // Optional
    city?: string | null;       // Optional
    province?: string | null;   // Optional
    proof_document?: string | null; // Optional
    status?: string | null;     // Optional
}

// Interface for driver details
export interface DriverDetails {
    driver_id: number | null;
    user_id: number | null;
    street: string | null;
    city: string | null;
    province: string | null;
    proof_document: string | null;
    status: string | null;
}

// Utility functions to safely parse and stringify the JSON data, using these interfaces
export class Convert {
    public static toUserModal(json: string): UserModal {
        const result = JSON.parse(json);
        if (!this.isUserModal(result)) {
            throw new Error("Received data does not match the UserModal interface");
        }
        return result;
    }

    public static userModalToJson(value: UserModal): string {
        if (!this.isUserModal(value)) {
            throw new Error("Provided value does not match the UserModal interface");
        }
        return JSON.stringify(value, null, 2);
    }

    private static isUserModal(obj: any): obj is UserModal {
        return typeof obj === 'object' &&
            'status' in obj &&
            'user' in obj &&
            'isDriver' in obj &&
            (obj.isDriver ? 'driverDetails' in obj : true);
    }
}
