import React from 'react'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const UpdateProfilePage = () => {
  return (
    <div className='p-2 p-sm-4 text-white'>
            <div className="d-flex align-items-center justify-content-center gap-2 text-center w-semibold mb-4">
        <FaUser size={30} color='#DFA041' />
        <h4 className='mt-2 title-text'>Update Profile</h4>
        </div>
        <div className="customFormContainer p-3 rounded-4 ">
            <div className="row">
                <div className="col-6 px-2">
                <div className="mb-3">
                    <p>Name</p>
                    <input value={'user123'} className='w-full customInput' type="text"  />
                    </div>
                </div>
                <div className="col-6 px-2">
                <div className="mb-3">
                    <p>ID</p>
                    <input value={'123'} className='w-full customInput' type="text"  />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6 px-2">
                <div className="mb-3">
                    <p>Phone</p>
                    <input value={'09123456890'} className='w-full customInput' type="text"  />
                    </div>
                </div>
                
            </div>
            <div className="mt-4 w-max loginBtn py-2 px-5 mx-auto text-white rounded-5 text-center">
                 <h5 className='mx-sm-3'>Submit</h5>
             </div>
        </div>
    </div>
  )
}

export default UpdateProfilePage
