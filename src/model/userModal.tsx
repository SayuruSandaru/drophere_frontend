// Interface for the response of getUser API
export interface UserModal {
    status: string;
    user: User;
    isDriver: boolean;
    driverDetails: DriverDetails;
}

// Interface for user details
export interface User {
    id: number;
    email: string;
    firstname: string | null;  // Can be null
    lastname: string | null;   // Can be null
    username: string | null;   // Can be null
    phone: string | null;      // Can be null
    profile_image: string | null;
    driver_id: number | null;  // Can be null
    user_id: number | null;    // Can be null
    street: string | null;     // Can be null
    city: string | null;       // Can be null
    province: string | null;   // Can be null
    proof_document: string | null; // Can be null
    status: string | null;     // Can be null
}

// Interface for driver details
export interface DriverDetails {
    driver_id: number | null;  // Can be null
    user_id: number | null;    // Can be null
    street: string | null;     // Can be null
    city: string | null;       // Can be null
    province: string | null;   // Can be null
    proof_document: string | null; // Can be null
    status: string | null;     // Can be null
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
        return 'status' in obj && 'user' in obj && 'isDriver' in obj && 'driverDetails' in obj;
    }
}
