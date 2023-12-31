import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import NonMemberTop from "../../components/common/NonMemberTop";
import MemberPagingBar from "../../components/common/MemberPagingBar";
import {callNonMembersAPI} from "../../apis/AdminAPICalls";
import NonMemberList from "../../components/lists/NonMemberList";

function NonMemberMain() {

    const dispatch = useDispatch();
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const { getNonMembers } = useSelector( state => state.adminReducer );


    useEffect(() => {

        dispatch( callNonMembersAPI( { currentPage } ) );

    }, [ currentPage ]);


    return (
        <div className="profile-background-div">
            <ToastContainer hideProgressBar={ true } position="top-center"/>
            <NonMemberTop />
            {
                getNonMembers &&
                <>
                    <NonMemberList data={ getNonMembers.data } />
                    <MemberPagingBar pageInfo={ getNonMembers.pageInfo } setCurrentPage={ setCurrentPage }/>
                </>
            }
        </div>
    );

}

export default NonMemberMain;