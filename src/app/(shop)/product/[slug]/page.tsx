import { initialData } from '@/seed/seed';
import React from 'react';
import {notFound} from 'next/navigation';
import { titlefon as titleFont } from '@/config/fonts'; // Asegúrate de que la importación es correcta
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from '@/components';


interface Props{
    params: {
        slug: string;
    }
}

export default function AdminPage({params}: Props) {

    const {slug} = params;
    const product = initialData.products.find( product => product.slug === slug );


    if ( !product ){
        notFound();
    }


    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Slideshow */}
            <div className="col-span-1 md:col-span-2">
            {/*Mobile Slideshow */}
            
            <ProductMobileSlideshow
            title={product.title}
            images={product.images}
            className="block md:hidden"
                />
            
            {/*Desktop Slideshow */}
              <ProductSlideshow
                title={product.title}
                images={product.images}
                className="hidden md:block"
                />
            </div>

            {/* Detalles */}
            <div className="col-span-1 px-5 bg-blue-100">
                <h1 className={`${ titleFont.className } antialiased font-bold text-xl` }>
                    { product.title}
                </h1>
                <p className="text-lg mb-5">${ product.price }</p>

                 {/* Selector de T tallas */}

                <SizeSelector
                    selectedSize={product.sizes[0]}
                    availableSizes={product.sizes}/>

                {/* Selector de Cantidad */}

                <QuantitySelector
                    quantity={ 2 }    
                />
                
                {/* Button */}
                <button className="btn-primary my-5">
                    Agregar al carrito
                </button>
                {/* Descripcion */}
                <h3 className="font-bold text-sm">Descripcion</h3>
                <p className="font-light">
                    {product.description}
                </p>

            </div>

        </div>
    );
}
