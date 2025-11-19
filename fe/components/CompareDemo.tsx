import React from 'react'
import ReactCompareImage from 'react-compare-image'

export const CompareDemo = () => {
  return (
    <div className=" hidden md:flex flex-col justify-center items-center p-5 my-10">
        <h1 className=" text-5xl font-bold my-4">Feel The <span className=" text-blue-600">Diffrence</span></h1>
        <div className=" mt-5 size-[30rem] rounded-lg">
        <ReactCompareImage hover={true}
         leftImageLabel="Before"
         rightImageLabel="After"
         leftImage="https://res.cloudinary.com/diqurtmad/image/upload/v1760774480/pumpkinImage_eths6z.png"
         rightImage="https://res.cloudinary.com/diqurtmad/image/upload/v1760774480/editedImage_kyy5b3.png" />
      </div>
      </div>
  )
}
