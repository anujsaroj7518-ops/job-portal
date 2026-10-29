import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const Category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const searchJobHandler =(query) => {
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        }

  return (
    <div className="flex justify-center my-20">
        <Carousel className="w-full max-w-xl">
            <CarouselContent>
                {
                    Category.map((cat, index) => (
                        <CarouselItem key={index} className='basis-1/3'>
                            <button onClick={()=>searchJobHandler(cat)}
                                className='px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-purple-100 cursor-pointer text-sm font-medium w-full'
                            >
                                {cat}
                            </button>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
  )
}

export default CategoryCarousel