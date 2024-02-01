import {useGetTopProductsQuery} from '../slices/productsApiSlice'
import {Carousel,CarouselCaption,CarouselItem,Image} from 'react-bootstrap'
import Message from './Message'
import { Link } from 'react-router-dom'
import Loader from './Loader'
const ProductCarousel = () => {
    const {data:products,isLoading,error} = useGetTopProductsQuery()
    console.log('product CSL')
  return (
    isLoading ? null : error?<Message variant='danger'>{error?.data?.message || error.error}</Message>:(
        <Carousel pause='hover' className='bg-dark mb-4'>
            {products && products.map((product)=>(
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image}
                        alt={product.name}
                        fluid/>
                        <Carousel.Caption className='carousel-caption'>
                            <h2>
                                {product.name}(${product.price})
                            </h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))
            }
        </Carousel>
        // <></>
    )
  )
}

export default ProductCarousel

// import { Link } from 'react-router-dom';
// import { Carousel, Image } from 'react-bootstrap';
// import Message from './Message';
// import { useGetTopProductsQuery } from '../slices/productsApiSlice';

// const ProductCarousel = () => {
//   const { data: products, isLoading, error } = useGetTopProductsQuery();

//   return isLoading ? null : error ? (
//     <Message variant='danger'>{error?.data?.message || error.error}</Message>
//   ) : (
//     <Carousel pause='hover' className='bg-primary mb-4'>
//       {products.map((product) => (
//         <Carousel.Item key={product._id}>
//           <Link to={`/product/${product._id}`}>
//             <Image src={product.image} alt={product.name} fluid />
//             <Carousel.Caption className='carousel-caption'>
//               <h2 className='text-white text-right'>
//                 {product.name} (${product.price})
//               </h2>
//             </Carousel.Caption>
//           </Link>
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );
// };

// export default ProductCarousel;