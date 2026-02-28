import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { DetailsProductPage } from '@/components/features/product/page/details-product-page';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({params}: PageProps) {
  const {id} = await params;

  const product = await prisma.product.findFirst({
    where: {id: Number(id)},
    include: {
      variants: true,
      specifications: true,
    },
  });

  if (!product) {
    return notFound();
  }
  return <DetailsProductPage product={product} />;
}

