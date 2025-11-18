import React from 'react'
import ReactCompareImage from 'react-compare-image'

const galleryImages = [
        {
        title: "Color Grading",
        original: "https://res.cloudinary.com/diqurtmad/image/upload/v1763478579/raw-forest_rfneto.jpg",
        transformed: "https://res.cloudinary.com/diqurtmad/image/upload/v1763478693/forest-gen_athzla.png"
    },
    {
        title: "Thumbnails",
        original: "https://res.cloudinary.com/diqurtmad/image/upload/v1763478132/thumbnail_a9cyur.jpg",
        transformed: "https://res.cloudinary.com/diqurtmad/image/upload/v1763478327/thubnail-gen_paiwh8.png"
    },
    {
        title: "Cartoonic",
        original: "https://res.cloudinary.com/diqurtmad/image/upload/v1763478899/unnamed_hprrye.jpg",
        transformed: "https://res.cloudinary.com/diqurtmad/image/upload/v1763478916/unnamed_pe4kdc.jpg"
    },
    {
        title: "Logo",
        original: "https://res.cloudinary.com/diqurtmad/image/upload/v1763479065/unnamed_e2hlph.jpg",
        transformed: "https://res.cloudinary.com/diqurtmad/image/upload/v1763479103/unnamed_sygfdz.jpg"
    },
    {
        title: "Filter",
        original: "https://res.cloudinary.com/diqurtmad/image/upload/v1763479278/unnamed_xnm1s0.jpg",
        transformed: "https://res.cloudinary.com/diqurtmad/image/upload/v1763479325/unnamed_nakjdv.jpg"
    }
]
const Gallery = () => {
  return (
    <div className=' flex flex-col mt-5'>
        <div className=' text-center'>
            <h1 className=' text-2xl md:text-5xl lg:text-6xl font-bold'>What Community Is Cooking</h1>
            <h2 className=' text-gray-400 text-sm'>See what other are unlocking new possibilites of image editting.</h2>
        </div>
        <div className='grid md:grid-cols-4 gap-4 p-6 items-center justify-center'>
        {
            galleryImages.map( (image,idx) => <div key={idx} className=' size-72 rounded-md overflow-hidden'>
            <ReactCompareImage
            leftImage={image.original}
            rightImage={image.transformed} />
            </div>)
        }
    </div>
    </div>
  )
}

export default Gallery