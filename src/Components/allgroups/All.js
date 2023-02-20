import React, { useEffect, useState } from 'react';
import './All.css';
import Modal from 'react-modal';
import info from '../../assets/info2.webp';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteflashcard } from '../../state/actions/card.js';

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

const All = () => {
  const dispatch = useDispatch();
  let subtitle;
  const [fgroup, setfgroup] = useState('false');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  function openModal(gid) {
    setIsOpen(true);
    setDeleteId(gid);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const data = useSelector((state) => state.fcard);
  console.log('data', data);
  const [all, setall] = useState({
    showall: 'false',
    possiblecards: false,
    cardslength: 0,
  });


  useEffect(() => {
    seeall1();
  }, [fgroup]);
  useEffect(() => {
    setfgroup(data);
  }, []);

  function deletecard() {
    let gid = deleteId;
    let filter = fgroup.filter((item) => item.gid !== gid);
    console.log('filter', filter);
    localStorage.setItem('fcard', JSON.stringify(filter));
    console.log(localStorage.getItem('fcard'));
    setfgroup(filter);
    dispatch(deleteflashcard(filter));
    setIsOpen(false);
  }

  function seeall1() {
    console.log('fgroup', fgroup);
    if (fgroup.length <= 6) {
      let mincards1 = [...fgroup].reverse();
      console.log('mincards1', data);

      setall({
        ...all,
        possiblecards: mincards1,
        cardslength: [...fgroup].length,
      });
    } else {
      let mincards2 = [...fgroup];
      console.log('mincards2', fgroup);
      setall({
        ...all,
        possiblecards: [...fgroup].slice(-6).reverse(),
        cardslength: [...fgroup].length,
      });
    }
  }
  console.log('all', all);
  console.log('fetchdata', fgroup);
  return (
    <div className="max-w-[1100px] mx-auto sm:p-2  ">
      <div className="  grid grid-cols-1   
      mx-5   mb-5 sm:mb-10   sm:grid-cols-2 md:grid-cols-3 gap-1  ">
        {fgroup !== 'false'
          ? all?.cardslength > 6 && all?.showall === 'false'
            ? all.possiblecards.map((card) => (
              <div className="
              border border-grey-400 drop-shadow-lg relative grid 
              justify-items-center bg-white mt-14">
              <img
                src={card.file}
                className="h-20  w-15 absolute top-[-2.5rem] img"
                alt=""
              />
              <strong className="pt-12 ">{card.gname}</strong>
              <p className="text-center line-clamp-2
              break-all h-12 w-3/4 text-ellipsis overflow-hidden">
                {card.gdef}
              </p>
              <p className="text-center mt-2">
                {card.terms
                  ? card.terms.length === 1
                    ? `${card.terms.length} card`
                    : `${card.terms.length} cards`
                  : ''}
              </p>
              <div className="flex flex-row gap-3">
                <Link
                  to={`/groupdetails/${card.gid}/1`}
                  className="btn text-center mt-5 pt-1 pb-1 font-bold mb-3 
                  text-red-600 border-2 border-red-600 pl-2 pr-2"
                >
                  View Cards
                </Link>
                <button
                  onClick={(e) => openModal(card.gid)}
                  className=" btn text-center mt-5 pt-1 pb-1 font-bold mb-3 text-red-600 border-2 border-red-600 pl-2 pr-2"
                >
                  Delete
                </button>
              </div>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div className="w-96 rounded p-5">
                  <img src={info} className="center" alt="" />
                  <h3 className="font-bold text-center">
                    Do You Want To Delete This Card
                  </h3>
                  <div className="mt-3 flex justify-center gap-3 w-100">
                    <button
                      className="btn text-center mt-5 pt-1 pb-1 font-bold mb-3 bg-green-600 text-white border-2 border-green-600 pl-4 pr-4"
                      onClick={deletecard}
                    >
                      Yes, Delete it!
                    </button>
                    <button
                      className="btn text-center mt-5 pt-1 pb-1 font-bold mb-3 bg-red-600 border-2 border-red-600 text-white pl-2 pr-2"
                      onClick={closeModal}
                    >
                      No, Cancel!
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
              ))
            : all?.possiblecards
            ? all?.possiblecards.map((card) => (
              <div className="border border-grey-400 
              drop-shadow-lg relative grid justify-items-center bg-white mt-14">
              <img
                src={card.file}
                className="h-20  w-15 absolute top-[-2.5rem] img"
                alt=""
              />
              <strong className="pt-12 ">{card.gname}</strong>
              <p className="text-center line-clamp-2 
break-all h-12 text-ellipsis overflow-hidden w-3/4">
                {card.gdef}
              </p>
              <p className="text-center mt-2">
                {card.terms
                  ? card.terms.length === 1
                    ? `${card.terms.length} card`
                    : `${card.terms.length} cards`
                  : ''}
              </p>
              <div className="flex flex-row gap-3">
                <Link
                  to={`/groupdetails/${card.gid}/1`}
                  className="btn text-center mt-5 pt-1 pb-1 font-bold mb-3 text-red-600 border-2 border-red-600 pl-2 pr-2"
                >
                  View Cards
                </Link>
                <button
                  onClick={(e) => openModal(card.gid)}
                  className=" btn text-center mt-5 pt-1 pb-1 font-bold mb-3 text-red-600 border-2 border-red-600 pl-2 pr-2"
                >
                  Delete
                </button>
              </div>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div className="w-96 rounded p-5">
                  <img src={info} className="center" alt="" />
                  <h3 className="font-bold text-center">
                    Do You Want To Delete This Card
                  </h3>
                  <div className="mt-3 flex justify-center gap-3 w-100">
                    <button
                      className="btn text-center mt-5 pt-1 pb-1 font-bold mb-3 bg-green-600 text-white border-2 border-green-600 pl-4 pr-4"
                      onClick={deletecard}
                    >
                      Yes, Delete it!
                    </button>
                    <button
                      className="btn text-center mt-5 pt-1 pb-1 font-bold mb-3 bg-red-600 border-2 border-red-600 text-white pl-2 pr-2"
                      onClick={closeModal}
                    >
                      No, Cancel!
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
              ))
            : ''
          : ''}
      </div>
      <div className="flex justify-center sm:justify-end">
        {all?.cardslength > 6 && all?.showall === 'false' ? (
          <button
            className="text-red-600 font-bold text-2xl mb-2 "
            onClick={() =>
              setall({
                ...all,
                showall: 'true',
                possiblecards: [...fgroup].reverse(),
              })
            }
          >
            see all
          </button>
        ) : all?.cardslength > 6 && all?.showall === 'true' ? (
          <button
            className="text-red-600 font-bold text-2xl mb-2"
            onClick={() =>
              setall({
                ...all,
                showall: 'false',
                possiblecards: [...fgroup].slice(-6).reverse(),
              })
            }
          >
            see less
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default All;
