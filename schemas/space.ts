import * as z from 'zod';

export const CreateSpaceSchema = z.object({
  name: z.string().min(1, 'Name is required!'),
});
