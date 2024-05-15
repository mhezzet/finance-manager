import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { CreateCategorySchema } from '@/schemas/category';

type FormType = z.infer<typeof CreateCategorySchema>;

interface IAccountForm {
  id?: string;
  defaultValues: {
    name: string;
  };
  onDelete?: (id: string) => void;
  onSubmit: (value: FormType) => void;
  disabled?: boolean;
}

export const CategoryForm: React.FC<IAccountForm> = (props) => {
  const { defaultValues, onDelete, disabled, onSubmit, id } = props;

  const form = useForm<FormType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormType) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.(id || '');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="eg. Cash, Bank, Credit Card" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? 'Save Changes' : 'Create Category'}
        </Button>
        {!!id && (
          <Button
            type="button"
            onClick={handleDelete}
            className="w-full"
            disabled={disabled}
            variant="outline"
          >
            <Trash className="mr-2 size-4" /> Delete Category
          </Button>
        )}
      </form>
    </Form>
  );
};
