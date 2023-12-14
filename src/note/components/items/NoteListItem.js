import {useNavigate, useParams} from "react-router-dom";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import {useState} from "react";
import { DatePicker } from 'react-rainbow-components';
import {toast} from "react-toastify";
import {callNoteReceivedRemoveAPI} from "../../apis/NoteAPICalls";
import {useDispatch} from "react-redux";

// const callNoteSearchAPI = async (searchCondition, option) => {
//     try {
//         const response = await fetch(`/api/note/search?searchCondition=${searchCondition}&option=${option}`);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching search results", error);
//         throw error;
//     }
// };

function NoteListItem({ note, title , options, currentPage, setCurrentPage, showSender, showReceiver }) {

    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState({ value: '' });
    const [selectedOption, setSelectedOption] = useState('전체');
    const [searchResults, setSearchResults] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const dispatch = useDispatch();
    const { noteCode } = useParams();

    /* 쪽지 상세 페이지 이동*/
    const onClickNoteHandler = (note) => {
        navigate(`/note/received/${ note.noteCode }`);
    };

    const onChangeHandler = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSearch = (e) => {

        setSearchValue({
            ...searchValue,
            [e.target.name]: e.target.value
        })

    };

    const onClickDeleteNotes = () => {};

    /* 받은 쪽지 삭제 */
    const onClickDeleteReceivedNoteHandler = () => {
       dispatch(callNoteReceivedRemoveAPI({ noteCode }));
    };

    const onClickMoveNotes = () => {

    };

    const handleNoteSelect = (noteCode) => {
        if (selectedNotes.includes(noteCode)) {
            setSelectedNotes(selectedNotes.filter((code) => code != noteCode));
        } else {
            setSelectedNotes([...selectedNotes, noteCode]);
        }

    };

    // const handleSearch = async () => {
    //     try {
    //         let results = [];
    //
    //         if (selectedOption === '전체') {
    //             // '전체' 옵션 선택 시 보낸 사람과 내용에 대한 검색 수행
    //             const senderResults = note.filter((item) => item.noteSender.includes(searchValue.value));
    //             const bodyResults = note.filter((item) => item.noteBody.includes(searchValue.value));
    //
    //             // 중복 제거 후 결과 저장
    //             results = [...new Set([...senderResults, ...bodyResults])];
    //         } else if (selectedOption === '보낸 사람') {
    //             // '보낸 사람' 옵션 선택 시 보낸 사람에 대한 검색 수행
    //             results = note.filter((item) => item.noteSender.includes(searchValue.value));
    //         } else if (selectedOption === '내용') {
    //             // '내용' 옵션 선택 시 내용에 대한 검색 수행
    //             results = note.filter((item) => item.noteBody.includes(searchValue.value));
    //         }
    //
    //         setSearchResults(results);
    //
    //         if (results.length === 0) {
    //             toast.error("일치하는 검색 결과가 없습니다.");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching search results", error);
    //     }
    // };

    React.useEffect(() => {
        // 여기서 API 호출 또는 검색 결과 업데이트 로직을 작성
        // 예를 들어, callSearchAPI 함수를 사용하여 서버에서 검색 결과를 받아오는 것으로 가정
        const callSearchAPI = async () => {
            try {
                const apiUrl = `/cg-api/v1/note/received/search?searchCondition=${ selectedOption }&searchValue=${ searchValue }`;
                console.log('API URL:', apiUrl);

                const response = await fetch(apiUrl);
                const data = await response.json();
                console.log('API Response:', data);

                setSearchResults(data);

                if (data.length === 0) {
                    toast.error("일치하는 검색 결과가 없습니다.");
                }
            } catch (error) {
                console.error("Error fetching search results", error);
            }
        };

        // 검색어 또는 옵션 값이 변경될 때마다 API 호출
        callSearchAPI();
    }, [selectedOption, searchValue]);



    /* 컴포넌트 하나당 목록을 보여주는 쪽지 하나를 표현하기 위해 선언 - 쪽지 정보 */
    return (
        <>
            <div className="note-div">
                <div className="note-title" style={{ fontSize: "30px", marginTop: "55px", marginLeft: "40px" }}>
                    { title }
                </div>
            </div>

            { note &&
                <div className="note-search-div">
                    <div className="note-date-container" style={{ maxWidth: 360 }}>
                        <DatePicker
                            value={ startDate }
                            onChange={ (newValue) => {
                                setStartDate(newValue)
                            }}
                            selectsStart
                            startDate={ startDate }
                            endDate={ endDate }
                        />
                        <div style={{ margin: '0 10px' }}>~</div>
                        <DatePicker
                            value={ endDate }
                            onChange={ (newValue) => {
                                setEndDate(newValue)
                            }}
                            minDate={ startDate }
                            startDate={ startDate }
                            endDate={ endDate }
                        />
                    </div>


                        {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                        {/*<DesktopDatePicker*/}
                        {/*    locale={ ko }*/}
                        {/*    dateFormat="yyyy-MM-dd"*/}
                        {/*    selected={ startDate }*/}
                        {/*    onChange={ (newValue) => {*/}
                        {/*        setStartDate(newValue)*/}
                        {/*    }}*/}
                        {/*    selectsStart*/}
                        {/*    startDate={ startDate }*/}
                        {/*    endDate={ endDate }*/}
                        {/*    showPopperArrow={ true }*/}
                        {/*    renderInput={(params) => <TextField {...params} />}*/}
                        {/*/>*/}
                        {/*<div style={{ margin: '0 10px' }}>~</div>*/}
                        {/*<DesktopDatePicker*/}
                        {/*locale={ ko }*/}
                        {/*dateFormat="yyyy-MM-dd"*/}
                        {/*selected={ endDate }*/}
                        {/*onChange={ (data: Date) => setEndDate(data) }*/}
                        {/*selectsEnd*/}
                        {/*minDate={ startDate }*/}
                        {/*startDate={ startDate }*/}
                        {/*endDate={ endDate }*/}
                        {/*showPopperArrow={ true }*/}
                        {/*/>*/}

                    <div className="note-search">
                        <select
                            name="note-search-options"
                            value={ selectedOption }
                            onChange= { onChangeHandler }
                        >
                            { options.map((option) => (
                                <option key={ option.value } value={ option.value }>
                                    { option.label }
                                </option>
                            )) }
                        </select>

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="text"
                                name="value"
                                value={ searchValue.value }
                                onChange={ (e) => setValue(e.target.value) }
                            />
                            <button
                                onClick={ handleSearch }
                                className="note-search-button"
                            >
                                검색
                            </button>

                            {/*{ title === "받은 쪽지함" && (*/}
                            {/*    <>*/}
                            {/*        <button*/}
                            {/*            onClick={ onClickMoveNotes }*/}
                            {/*            className="note-important-button"*/}
                            {/*        >*/}
                            {/*            보관*/}
                            {/*        </button>*/}
                            {/*        <button*/}
                            {/*            onClick={ () => onClickDeleteReceivedNoteHandler(selectedNotes) }*/}
                            {/*            className="note-delete-button"*/}
                            {/*        >*/}
                            {/*            삭제*/}
                            {/*        </button>*/}
                            {/*    </>*/}
                            {/*)}*/}

                            {/*{ title === "보낸 쪽지함" && (*/}
                            {/*    <button*/}
                            {/*        onClick={ onClickDeleteNotes }*/}
                            {/*        className="sent-delete-button"*/}
                            {/*    >*/}
                            {/*        삭제*/}
                            {/*    </button>*/}
                            {/*)}*/}

                            {/*{ title === "중요 쪽지함" && (*/}
                            {/*    <>*/}
                            {/*        <button*/}
                            {/*            onClick={ onClickMoveNotes }*/}
                            {/*            className="note-important-button"*/}
                            {/*        >*/}
                            {/*            보관 취소*/}
                            {/*        </button>*/}

                            {/*        <button*/}
                            {/*            onClick={ onClickDeleteNotes }*/}
                            {/*            className="note-delete-button"*/}
                            {/*        >*/}
                            {/*            삭제*/}
                            {/*        </button>*/}
                            {/*    </>*/}
                            {/*)}*/}
                        </div>
                    </div>

                    {/*<div className="note-checkbox">*/}
                    {/*    <input*/}
                    {/*        type="checkbox"*/}
                    {/*        value={ note.noteCode }*/}
                    {/*        checked={ selectedNotes.includes(note.noteCode) }*/}
                    {/*        onChange={ () => handleNoteSelect(note.noteCode) }*/}



                    {/*        // onChange={ () => {*/}
                    {/*        //     // 모든 쪽지를 선택 또는 해제합니다.*/}
                    {/*        //     if (selectedNotes.length === note.length) {*/}
                    {/*        //         // 이미 모두 선택된 경우 모두 해제*/}
                    {/*        //         setSelectedNotes([]);*/}
                    {/*        //     } else {*/}
                    {/*        //         // 아닌 경우 모두 선택*/}
                    {/*        //         setSelectedNotes(note.map((item) => item.noteCode));*/}
                    {/*        //     }*/}
                    {/*        // }}*/}
                    {/*        // checked={selectedNotes.length === note.length}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    {/* 쪽지 body 카테고리 */}
                    <div className="note-title-body">
                        { showSender && <div className="title">보낸 사람</div> }
                        { showReceiver && <div className="title">받는 사람</div> }
                        <div className="title">내용</div>
                        <div className="title">날짜</div>
                    </div>

                    { note.map((note) => (
                            <div className="note-item" key={ note.noteCode }>
                                {/*<div className="content">*/}
                                {/*    <input*/}
                                {/*        type="checkbox"*/}
                                {/*        value={ note.noteCode }*/}
                                {/*        checked={ selectedNotes.includes(note.noteCode) }*/}
                                {/*        onChange={ () => handleNoteSelect(note.noteCode) }*/}
                                {/*    />*/}
                                {/*</div>*/}

                                <div className="content">{ note.noteSender }</div>
                                <div className="content" onClick={ () => onClickNoteHandler(note) }>
                                    { note.noteBody }
                                </div>
                                <div className="content">{ note.noteSentDate }</div>
                            </div>
                        ))
                    }
                </div>
            }
        </>

    );

}

export default NoteListItem;