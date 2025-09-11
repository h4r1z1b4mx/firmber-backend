import { z } from "zod";
export const SignupSchema = z.object({
    email: z.string().email().min(5),
    password: z.string().min(6)
});
export const SigninScheme = z.object({
    email: z.string(),
    password: z.string()
});
export const WorkplaceSchema = z.object({
    name: z.string()
});
export const ProjectSchema = z.object({
    name: z.string(),
    document_count: z.number(),
});
export const DocumentSchema = z.object({
    name: z.string(),
    s3_link: z.string(),
    document_type: z.enum(["PRODUCT_MANUAL",
        "DATASHEET",
        "API_REFERENCE",
        "SCHEMATIC",
        "USER_GUIDE",
        "OTHER"])
});
//# sourceMappingURL=index.js.map