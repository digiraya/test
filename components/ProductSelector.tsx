import React from 'react';
import { ProductTemplate } from '../types';
import { PRODUCT_TEMPLATES } from '../constants';

interface ProductSelectorProps {
  selectedProduct: ProductTemplate | null;
  onSelectProduct: (product: ProductTemplate) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProduct, onSelectProduct }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-cyan-400">Step 2: Choose a Product</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PRODUCT_TEMPLATES.map((product) => (
          <div
            key={product.id}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              selectedProduct?.id === product.id
                ? 'border-cyan-400 scale-105 shadow-2xl shadow-cyan-500/20'
                : 'border-gray-700 hover:border-gray-500'
            }`}
            onClick={() => onSelectProduct(product)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-2 bg-gray-800 text-center text-sm">
              <p className="truncate">{product.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
