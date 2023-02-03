import React from "react";
import UploadImage from "./uploadimages/Uploadimage";
import { BsXSquareFill } from 'react-icons/bs';

function CreateGroup({
  handlechange,
  errors,
  touched,
  setFieldValue,
  values,
  onChange,
}) {
  return (
    <div className="mt-10 max-w-[1100px] mx-3 rounded-md lg:mx-auto  bg-white p-3 sm:p-7 active:scale-y-110 ">
      <div className=" bg-white   grid grid-rows sm:grid-cols-2">
        <div>
          <h3>Create Group*</h3>
          <input
            type={'text'}
            id="gname"
            name="gname"
            className="rounded-md sm:w-full mb-3 border-2 border-current p-2 h-10 w-full "
            placeholder="write the name of group"
            onChange={handlechange}
          ></input>
          {errors.gname && touched.gname ? errors.gname : null}
        </div>
        <div className="sm:ml-7">
          {values?.file ? (
            <div>
              <button
                className="text-red-600"
                onClick={() => {
                  setFieldValue('file', '');
                }}
              >
                <BsXSquareFill />
              </button>
              <img
                src={values.file}
                name="file"
                height="50px"
                width="150px"
                alt=""
              />
              
            </div>
          ) : (
            <UploadImage
              setFieldValue={setFieldValue}
              values={values}
              errors={errors}
            />
          )}
        </div>
      </div>
      <div className="mt-3">
        <h3>Add Description</h3>
        <textarea
          type={'text'}
          id="Description"
          name="gdef"
          className="rounded-md h-16 border-2 border-current p-2 w-full"
          placeholder="add description of the group"
          onChange={handlechange}
        ></textarea>
        {errors.gdef && touched.gdef ? errors.gdef : null}
      </div>
    </div>
  );
}
export default CreateGroup;
