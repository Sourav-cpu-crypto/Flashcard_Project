import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FiPrinter, FiDownload } from 'react-icons/fi';
import { HiOutlineShare } from 'react-icons/hi';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { BiCopy } from 'react-icons/bi';
import { FaShare } from 'react-icons/fa';
import Listcard from './Listcard';
import TermCards from './TermCards';
import copy from 'copy-to-clipboard';
import Modal from 'react-modal';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import PrintorDownload from './PrintorDownload';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Carddetails = () => {
  const promiseResolveRef = useRef(null);
  const [beforeorafterprint, setbeforeafterprint] = useState('false');
  const componentRef = useRef();
  useEffect(() => {
    if (beforeorafterprint && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [beforeorafterprint]);
  const handlePrint1 = useReactToPrint({
    content: () => componentRef.current,

    onAfterPrint: () => {
      setbeforeafterprint('false');
    },
  });

  const handleButtonClick = () => {
    setbeforeafterprint('true');
    setTimeout(() => {
      handlePrint1();
    }, 1000);
  };
  const navigate = useNavigate();
  let subtitle;
  let shareUrl = window.location.href;

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { id, id1 } = useParams();
  const [groupcarddetails, setgroupcardetails] = useState('');
  const [termdetails, settermdetails] = useState(1);
  const data = useSelector((state) => state.fcard);
  useEffect(() => {
    const groupfcard = data.filter((groupfcard) => {
      return groupfcard.gid == id;
    });
    setgroupcardetails(groupfcard[0]);
  }, []);

  const copyToClipboard = () => {
    copy(window.location.href);
    alert(`copied to clipboard`);
  };

  async function Previouscard(p) {
    settermdetails(termdetails - 1);
    if (p < 2) {
      settermdetails(1);

      navigate(`/groupdetails/${id}/${1}`);
    } else if (p >= 2) {
      navigate(`/groupdetails/${id}/${p}`);
      settermdetails(termdetails - 1);
    }
  }

  function readcarddetfromurl(index) {
    navigate(`/groupdetails/${id}/${index + 1}`, { replace: true });
  }
  const download = () => {
    setbeforeafterprint('true');

    const term = document.getElementById('downloadcomp');
    html2canvas(term, { logging: true, letterRendering: 1, useCors: 1 }).then(
      (canvas) => {
        const imgWidth = 208;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('download.pdf');
      }
    );
  };
  function Nextcard(id1) {
    if (id1 > groupcarddetails.terms.length - 1) {
      settermdetails(groupcarddetails.terms.length);
      navigate(`/groupdetails/${id}/${groupcarddetails.terms.length}`, {
        replace: true,
      });
    } else {
      navigate(`/groupdetails/${id}/${id1}`, { replace: true });
      settermdetails(termdetails + 1);
    }
  }
  function downloadcompdownload() {
    setbeforeafterprint('true');
    setTimeout(() => {
      download();
      setbeforeafterprint('false');
    }, 2000);
  }
  console.log('groupcardetails', groupcarddetails);
  return (
    <div className="max-w-[1100px] mx-auto mt-7">
      <div className="flex flex-row">
        <Link to="/allfcard" className="btn mr-3 mt-2">
          <BsArrowLeft />
        </Link>
        <div>
          <h3 className="font-bold text-black text-xl ">{`${groupcarddetails.gname}`}</h3>
          <p className="mt-3">{`${groupcarddetails.gdef}`}</p>
        </div>
      </div>
      {beforeorafterprint !== 'false' ? (
        <div id="downloadcomp" ref={componentRef}>
          <PrintorDownload id1={id} />
        </div>
      ) : (
        ''
      )}
      {beforeorafterprint == 'false' ? (
        <div className="  md:grid  md:grid-cols-4 mt-6 gap-2 ">
          <div className=" bg-white mx-auto w-5/6 md:w-full ">
            {groupcarddetails?.terms === '' ||
            groupcarddetails?.terms === undefined ? (
              ''
            ) : (
              <Listcard
                id1={id}
                groupcarddetails={groupcarddetails}
                readcarddetfromurl={readcarddetfromurl}
                settermdetails={settermdetails}
              />
            )}
          </div>
          <div className="col-span-2 rounded items-center">
            {groupcarddetails?.terms === '' ||
            groupcarddetails?.terms === undefined ? (
              ''
            ) : (
              <TermCards
                groupcarddetails={groupcarddetails}
                termdetails={termdetails}
                Previouscard={Previouscard}
                Nextcard={Nextcard}
                id1={id}
                id2={id1}
              />
            )}
          </div>
          <div className=''>
          
            <div className="grid grid-cols-1  mx-2  w-70 mt-7">
              <div>
                <button
                  onClick={openModal}
                  className=" flex flex-row bg-white text-blue w-1/2 rounded ml-2 mt-2 items-center pl-2 "

                >
                  <FaShare />
                  <span className="p-1 ml-1text-base leading-normal ">Share</span>
                  <input type="" className="hidden" />
                </button>
              </div>
              <div className="mt-3">
                <button
                  onClick={downloadcompdownload}
                  className=" flex flex-row bg-white text-blue rounded ml-2 mt-2 items-center pl-2 w-1/2"
                >
                  <FiDownload onClick={() => download} />
                  <span className="p-1 text-base leading-normal">Download</span>
                </button>
              </div>
              <div className="mt-3">
                <button
                  onClick={handleButtonClick}
                  className=" flex flex-row bg-white text-blue rounded ml-2 mt-2 items-center pl-2 w-1/2 mb-10"
                >
                  <FiPrinter />
                  <span className="p-1 text-base leading-normal">Print</span>
                </button>
              </div>
            </div>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="w-96 rounded p-5">
              <h3 className="font-bold"> Share</h3>
              <div className="mt-3 flex gap-3 w-100">
                <h4 className="border border-black overflow-hidden">
                  {window.location.href}
                </h4>

                <BiCopy onClick={copyToClipboard} />
                <HiOutlineShare />
              </div>
              <div className="flex gap-3 mt-5 justify-around">
                <FacebookShareButton url={shareUrl}>
                  <FacebookIcon size={40} />
                </FacebookShareButton>
                <LinkedinShareButton url={shareUrl}>
                  <LinkedinIcon size={40} />
                </LinkedinShareButton>
                <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon size={40} />
                </WhatsappShareButton>
                <TwitterShareButton url={shareUrl}>
                  <TwitterIcon size={40} />
                </TwitterShareButton>
                <EmailShareButton url={shareUrl}>
                  <EmailIcon size={40} />
                </EmailShareButton>
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        console.log('true')
      )}
    </div>
  );
};

export default Carddetails;
