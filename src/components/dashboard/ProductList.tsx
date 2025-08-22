"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  availability: number;
  sales: number;
  salesPercentage: string;
}

interface ProductListProps {
  title: string;
  products: Product[];
  className?: string;
}

export function ProductList({ title, products, className }: ProductListProps) {
  // Function to determine progress color based on value
  const getProgressColorClass = (value: number) => {
    if (value > 70) return "bg-[#e85b5e]";
    if (value > 30) return "bg-[#d65659]";
    return "bg-red-500";
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground">
            <div className="col-span-5">Name</div>
            <div className="col-span-4 text-center">Availability</div>
            <div className="col-span-3 text-right">Sales</div>
          </div>
          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-12 items-center gap-1"
            >
              <div className="col-span-5">
                <p className="truncate text-sm font-medium">{product.name}</p>
              </div>
              <div className="col-span-4 flex justify-center">
                <div className="w-full">
                  <Progress
                    value={product.availability}
                    className={cn("h-2", getProgressColorClass(product.availability))}
                  />
                </div>
              </div>
              <div className="col-span-3 flex justify-end">
                <Badge
                  variant="outline"
                  className={cn({
                    "bg-[#e85b5e]/10 text-[#e85b5e] hover:bg-[#e85b5e]/20":
                      product.sales > 70,
                    "bg-[#d65659]/10 text-[#d65659] hover:bg-[#d65659]/20":
                      product.sales <= 70 && product.sales > 30,
                    "bg-red-500/10 text-red-500 hover:bg-red-500/20":
                      product.sales <= 30,
                  })}
                >
                  {product.salesPercentage}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
