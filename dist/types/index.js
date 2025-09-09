import { z } from "zod";
export const SignupSchema = z.object({
    email: z.string().email().min(5),
    password: z.string().min(6)
});
export const SigninScheme = z.object({
    email: z.string(),
    password: z.string()
});
//# sourceMappingURL=index.js.map