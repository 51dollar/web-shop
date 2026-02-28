import { prisma } from '@/lib/prisma';

import { notFound } from 'next/navigation';
import { ChooseProductModal } from '@/components/features/product/modals/choose-product-modal';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductModel({params}: PageProps) {
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

  return <ChooseProductModal product={product} />;
}
