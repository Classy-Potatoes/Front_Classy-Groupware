import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callNoteReceivedListAPI} from "../apis/NoteAPICalls";
import PagingBar from "../../common/components/pagingBar/PagingBar";
import NoteListItem from "../components/items/NoteListItem";


function NoteReceivedMain() {

    const dispatch = useDispatch(); //store에 값을 저장할 때 dispatch 이용
    const { notes } = useSelector(state => state.noteReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        /* 모든 쪽지에 대한 정보 요청 */
        dispatch(callNoteReceivedListAPI({ currentPage }));
    }, [currentPage]);

    const options = [
        { value: 'all', label: '전체' },
        { value: 'noteSender', label: '보낸 사람' },
        { value: 'noteBody', label: '내용' },
    ];

    return (
        <>
            { notes
                &&
                <>
                    <NoteListItem note={ notes.data }
                                  options={ options }
                                  noteType="received"
                                  showSender={ true } showReceiver={ false }/>
                    <div className="note-list-member-pagingbar">
                        <PagingBar pageInfo={ notes.pageInfo } setCurrentPage={ setCurrentPage }/>
                    </div>
                </>
            }
        </>
    );

}

export default NoteReceivedMain;