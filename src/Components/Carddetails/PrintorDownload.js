import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PrintorDownload = ({ id1, ref }) => {
  const [groupcarddetails, setgroupcardetails] = useState('');
  const data = useSelector((state) => state.fcard);
  useEffect(() => {
    const groupfcard = data.filter((groupfcard) => {
      return groupfcard.gid == id1;
    });
    setgroupcardetails(groupfcard[0]);
  }, []);

  return (
    <div ref={ref} className="max-w-[1300px] mx-auto mt-7">
      <div className="flex flex-row gap-5 m-7 p-7 w-full mx-auto">
        <div>
          {groupcarddetails.file ? (
            <img
              src={groupcarddetails.file}
              height="70px"
              width="150px"
              alt=""
            />
          ) : (
            <></>
          )}
        </div>
        <div>
          <h1 className="text-balck font-bold text-2xl mb-4">{`Group Name: ${groupcarddetails.gname}`}</h1>
          <p className="text-balck text-2xl">{`${groupcarddetails.gdef}`}</p>
        </div>
      </div>
      <div className="grid grid-cols ">
        <div id="term12" className="col-span-2 rounded items-center">
          {groupcarddetails?.terms === '' ||
          groupcarddetails?.terms === undefined ? (
            ''
          ) : (
            <div>
              {groupcarddetails.terms.map((allterm, index) => (
                <div className="grid grid-cols-2 rounded  pt-1 w-full m-20">
                  <div className="grid grid-rows">
                    <h1 className="text-balck font-semibold text-2xl mb-4">
                      Term: {allterm.term}
                    </h1>
                    <p className="text-balck text-2xl">{allterm.desc}</p>
                  </div>
                  {allterm.img ? (
                    <img src={allterm.img} height="70px" width="150px" alt="" />
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrintorDownload;
