export type Item = {
    id: number,
    name: string;
    kind: string;
    condition: string;
    brand: string;
    description: string;
    instructions: string;
    image: string;
    status: "available" | "on hold" |"requested" | "not available";
    };