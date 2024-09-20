'use client'
import { useRouter } from "next/navigation";
import React from "react"; 
import { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
export default function Modal({post_id}: {post_id: string}) {

  const [showModal, setShowModal] = useState(false);
  const router = useRouter(); 

 useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showModal]);



  const deletePost = async (post_id: string) => {
    try {
      const response = await fetch(`/api/delete-split?id=${post_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Error deleting post');
      }
  
      router.push('/feed');  // Redirect to feed after deletion
      // Handle successful deletion
      alert("Post deleted successfully");
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting post');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
      >
                <MdDeleteOutline  className='text-[#FB8500] text-[25px] sm:text-[35px] md:text-[45px]' />
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl md:text-3xl font-semibold font-rb ">
                    Delete This Split
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="font-rb my-4 text-blueGray-500 text-sm md:text-lg leading-relaxed">
                    This Split will be deleted permenantly! 
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {setShowModal(false);
                                    deletePost(post_id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-splitOrange text-white active:bg-orange-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40  bg-black"></div>
        </>
      ) : null}
    </>
  );
}
