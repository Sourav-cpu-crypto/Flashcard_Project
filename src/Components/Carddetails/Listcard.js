import React from "react";

const Listcard = ({ groupcarddetails, settermdetails,id1,termdetails,readcarddetfromurl }) => {
  return (
    <div className="grid grid-cols-1 mb-5  md:w-full md:mb-0">
      <p className="mx-auto">Flashcards</p>
      <hr></hr> 
      {groupcarddetails?.terms === "" || groupcarddetails?.terms === undefined
        ? ""
        : groupcarddetails.terms.map((allterm, index) => (
            <div className="flex flex-col rounded bg-white pt-1 sm:w-full ">
              <button
                className="font-bold"
                onClick={() => {
                  readcarddetfromurl(index)
         
                }}
              >
 
                {allterm.term}
              </button>
            </div>
          ))}
    </div>
  );
};

export default Listcard;

