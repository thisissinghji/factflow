import React ,{useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import useAuthStore from '../store/authStore'
import { client } from '../utils/client'
import { SanityAssetDocument } from '@sanity/client'
import { topics } from '../utils/Constants'


const Upload = () => {
  const [loading, setloading] = useState<Boolean>(false);
  const [videoAsset, setvideoAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongFile, setwrongFile] = useState<Boolean>(false)
  const [caption, setcaption] = useState(' ');
  const [category, setcategory] = useState(topics[0].name);
  const [savingPost, setsavingPost] = useState<Boolean>(false);
  const {userProfile} : {userProfile:any} = useAuthStore();
  const router = useRouter();


  const uploadVideo =async (e:any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    if(fileTypes.includes(selectedFile.type)){
      client.assets.upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
    })
    .then((data) => {
      setvideoAsset(data);
      setloading(false);
    });
  }
    else{
      setloading(false);
      setwrongFile(true);
    }
  }


  const handlePost = async ()=>{
    if(caption && videoAsset?._id && category){
      setsavingPost(true);
      const document = {
      _type: 'post',
      caption,
      video: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: videoAsset?._id,
        },
      },
      userId: userProfile?._id,
      postedBy: {
        _type: 'postedBy',
        _ref: userProfile?._id,
      },
      topic:category,
    };
    await axios.post(`http://localhost:3000/api/post`, document);
    router.push('/');
  }
}
  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
      <div className=' bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center p-14 pt-6'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Flows</p>
            <p className='text-md text-gray-400 mt-1'>Post a Flow to your account</p>
          </div>
          <div className=' border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {loading ?(
              <p>Uploading...</p>
            ):(
              <div>
                {videoAsset?(
                  <div>
                    <video
                      className='rounded-xl w-[450px] mt-0 bg-black'
                      controls
                      loop
                      src={videoAsset?.url}
                    />
                  </div>
                ):(
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col justify-center items-center'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                        </p>
                        <p className='fpnt-semibold text-xl'>
                          Upload Flows
                        </p>
                      </div>
                      <div>
                        <p className='text-gray-400 mt-4 text-center'>
                          Video must be of less than or equal to one minute. Supported video extensions are .mp4 .webM .ogg
                        </p>
                        <p className='bg-[#FF4436] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                          Select file
                        </p>
                      </div>
                    </div>
                    <input
                      type='file'
                      name='upload-video'
                      onChange={(e) => uploadVideo(e)}
                      className='w-0 h-0'
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFile &&(
              <p className='text-center text-red-400 font-semibold'> Please select a correct File !</p>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-3 pb-10 ' >
            <label className='text-md font-medium '>Caption </label>
            <input
            type='text'
            value={caption}
            onChange={(e) => setcaption(e.target.value)}
            className='rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2'
          />
           <label className='text-md font-medium '>Choose a Category </label>
           <select
            onChange={(e) => setcategory(e.target.value)}
            className='outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
          >
            {topics.map((item) => (
              <option
                key={item.name}
                className=' outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
          <div className='flex gap-6 mt-10'>
            <button
            onClick={()=>{}}
            type='button'
            className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none hover:outline-[#FF4436]'
            >
                Discard
            </button>
            <button
              disabled={videoAsset?.url ? false : true}
              onClick={handlePost}
              type='button'
              className='bg-[#FF4436] cursor-pointer text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none hover:bg-[#F8F8F8] hover:text-black hover:outline-black '
            >Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload