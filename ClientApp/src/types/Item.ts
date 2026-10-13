export type Item = {
    name: string;
    kind: string;
    condition: string;
    status: "available" | "on hold" |"requested" | "not available";
    };