import React, { useState } from "react";
import { GrDocumentUpload } from "react-icons/gr";
import UpdateStateGroupImage from "../UpdateStateGroupImage/UpdateStateGroupImage";
function Uploadimage({ setFieldValue, errors, touched, values }) {
  const [Uimage, setUploadimage] = useState({ file1: "" });
  // const fileRef=useRef(null);

  return (
    <div>
        <div className="show_file flex  sm:justify-start text-sky-500 ">
        <label className=" flex flex-row bg-white text-blue rounded border border-sky-500 hover:text-white hover:bg-sky-500 md:ml-2 mt-7 items-center pl-2 w-36 h-8  ">
          <GrDocumentUpload />
          <span className="p-2 text-base leading-normal">Upload Image</span>
          <input
            className="hidden"
            type="file"
            id="im"
            height="50px"
            width="50px"
            name="file"
            accept="image/*"
            onChange={(e) =>
              setUploadimage({ ...Uimage, file: e.target.files[0] })
            }
          />
        </label>
      </div>

      {Uimage?.file ? (
        <UpdateStateGroupImage
          file={Uimage?.file}
          setFieldValue={setFieldValue}
          values={values}
        />
      ) : (
        ''
      )}

      {values.file !== null ? <div>{errors.file}</div> : null}
    </div>
  );
}
export default Uploadimage;
