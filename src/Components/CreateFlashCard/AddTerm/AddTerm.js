import React, { useRef } from 'react';
import { Field } from 'formik';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import Termuploadimage from './termuploadimages/Termuploadimage';
import { BsXSquareFill } from 'react-icons/bs';
function AddTerm({
  handlechange,
  term,
  desc,
  disabled1,
  img,
  arrayHelpers,
  index,
  setFieldValue,
  onClick1,
  values,
  errors,
  touched,
}) {
  const focustext = useRef();
  const Edit = (e) => {

    focustext.current.focus();
    // alert('edit')
    e.preventDefaul();
  };

  return (
    <>
      <div
        className={` max-w-[1100px] mx-auto ${
          disabled1 === 'true' ? 'opacity-25' : 'bg-white'
        } sm:pl-7 pl-2 pt-4`}
      >
       <div className="grid grid-rows  md:grid-cols-5 md:gap-5">
       <div className=" md:grid md:grid-cols-10 md:col-span-2 flex w-full mt-2 ">
            <div className='md:col-span-2 md:flex md:justify-center'>
              <h2 className="bg-red-600 rounded-full pl-3 text-white  pr-5 w-4 h-7 mt-1 mr-2  md:mr-0">
                {disabled1 === 'true' ? '1' : index + 1}
                
              </h2>
            </div>
            <div className=' col-span-9 md:col-span-8'>
              <h3>Enter Term*</h3>
              {disabled1 === 'true' ? (
                <Field
                  name="term"
                  className="rounded-md mb-3 h-12 border-2  border-current p-4 w-full  "
                  placeholder=""
                  disabled
                />
              ) : (
                <input
                  onChange={handlechange}
                  type={'text'}
                  ref={focustext}
                  name={term}
                  jj
                  className="rounded-md mb-3 h-12 border-2  border-current p-4 w-full  "
                  placeholder="write the name of group"
                />
              )}

              {errors.terms &&
              errors.terms[index] &&
              errors.terms[index].term &&
              touched.terms &&
              touched.terms[index] &&
              touched.terms[index].term ? (
                <div>{errors.terms[index].term}</div>
              ) : null}
            </div>
          </div>
          <div className='col-span-2 mt-2 md:ml-0 ml-10'>
            <h3>Enter Defination*</h3>
            {disabled1 === 'true' ? (
              <textarea
                type={'text'}
                name="desc"
                onChange={handlechange}
                className="rounded-md mb-3 border-2 border-current  h-12 p-2 w-full"
                placeholder=""
                disabled
              />
            ) : (
              <textarea
                type={'text'}
                name={desc}
                onChange={handlechange}
                className="rounded-md mb-3 border-2 border-current  h-12 p-2 w-full"
                placeholder="add description of the group"
              />
            )}
            {errors.terms &&
            errors.terms[index] &&
            errors.terms[index].desc &&
            touched.terms &&
            touched.terms[index] &&
            touched.terms[index].desc ? (
              <div>{errors.terms[index].desc}</div>
            ) : null}
          </div>
          <div className="flex md:ml-0 ml-10 ">
            {disabled1 === 'true' ? (
              <button
                type="button"
                className=" bg-white text-blue justify-center rounded border border-black mt-6 mb-4 pl-4 pr-4 h-12 items-center"
                disabled
              >
                Select Image
              </button>
            ) : (
              <>
                {values?.terms[index].img ? (
                  <div>
                    <button
                      className="text-red-600"
                      onClick={() => {
                        setFieldValue(img, '');
                      }}
                    >
                      <BsXSquareFill />
                    </button>
                    <img width="120px" src={values.terms[index].img} alt="" />
                  </div>
                ) : (
                  <Termuploadimage
                    setFieldValue={setFieldValue}
                    values={values}
                    img={img}
                  />
                )}
              </>
            )}
            <div>
              {disabled1 === 'true' ? (
                <></>
              ) : (
                <div className="mt-7 ml-5">
                  <div>
                    <button type="button" onClick={(e)=>Edit()}>
                      <FiEdit />
                    </button>
                  </div>
                  <div>
                    {values.terms.length === 1 ? (
                      ''
                    ) : (
                      <button onClick={() => arrayHelpers.remove(index)}>
                        <RiDeleteBin6Line />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddTerm;
