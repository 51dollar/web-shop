import { ProductGroupList } from "@/components/features/card";
import { Filters } from "@/components/features/filters";
import { TopBar } from "@/components/features/top-bar";
import { Container, Title } from "@/components/ui";
import { buildFilters, getCategoriesWithProducts } from "@/services";

export default async function Page() {
  const categories = await getCategoriesWithProducts();

  return (

    <>
      <Container className="mt-4">
        <Title text="Phone" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Container className="mt-5 pb-14">
        <div className="flex gap-15">
          <div className="w-62.5">
            <Filters initialData={buildFilters(categories)} />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {
                categories.map(
                  (category) =>
                    category.products.length > 0 && (
                      <ProductGroupList
                        key={category.id}
                        title={category.name}
                        categoryId={category.id}
                        items={category.products}
                      />
                    ),
                )
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}