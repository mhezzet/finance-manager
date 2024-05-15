import { CreateCategoryButton } from '@/components/category/create-category-button';
import { currentUser } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

import { NextPage } from 'next';
import { Suspense } from 'react';
import { getCategories } from '@/data/category';
import { CategoriesTable } from '@/components/category/category-table';

const CategoriesPage: NextPage = async ({}) => {
  const user = await currentUser();
  const categories = await getCategories(user?.id || '');

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">Categories</CardTitle>
          <CreateCategoryButton />
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="flex h-[500px] w-full items-center justify-center">
                <Loader2 className="size-6 animate-spin text-slate-300" />
              </div>
            }
          >
            <CategoriesTable categories={categories} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
