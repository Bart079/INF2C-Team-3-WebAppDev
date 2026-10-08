export type BrewingNote = {
    id: number;
    bagId: number;
    writerId: number;
    method: string;
    doseGrams: number;
    grind: string;
    result: string;
    isReference: boolean;
    createdAt: string;
}