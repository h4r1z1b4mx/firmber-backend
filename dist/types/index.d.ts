import { z } from "zod";
export declare const SignupSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const SigninScheme: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const WorkplaceSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export declare const ProjectSchema: z.ZodObject<{
    name: z.ZodString;
    document_count: z.ZodNumber;
}, z.core.$strip>;
export declare const DocumentSchema: z.ZodObject<{
    name: z.ZodString;
    s3_link: z.ZodString;
    document_type: z.ZodEnum<{
        PRODUCT_MANUAL: "PRODUCT_MANUAL";
        DATASHEET: "DATASHEET";
        API_REFERENCE: "API_REFERENCE";
        SCHEMATIC: "SCHEMATIC";
        USER_GUIDE: "USER_GUIDE";
        OTHER: "OTHER";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=index.d.ts.map