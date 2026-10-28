export interface Auditable {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}