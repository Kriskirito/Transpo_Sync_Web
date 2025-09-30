export interface TranspoModel {
    createdAt: Date | null;
    updatedAt: Date | null;
    createdBy: string | null;
    updatedBy: string | null;
    processFlow: string | null;
    status: string | null;
    comments: string | null;
    flag: boolean | null;
}
