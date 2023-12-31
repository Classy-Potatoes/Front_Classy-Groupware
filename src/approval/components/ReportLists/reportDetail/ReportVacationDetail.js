import '../../../../style/approval/Vacation.css'
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {useNavigate, useParams} from "react-router-dom";
import {callReportDetailAPI} from "../../../apis/ReportAPICalls";
import SignUpCheckModal from "../../mui/SignUpCheckModal";
import {ToastContainer} from "react-toastify";


function VacationDetail() {

    const dispatch = useDispatch();
    const {approvalCode} = useParams();

    const {reportDetail} = useSelector(state => state.approvalReducer);
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(callReportDetailAPI({approvalCode}));
    }, []);


    function formatDate(dateString) {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateString));
        return formattedDate;
    }





    return (
        <>
            <div className="ReportTitle">
                휴기신청서 상세
            </div>

            <div className="VacationContainer">
                <ToastContainer
                    position="top-center"
                    autoClose={500}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="dark"
                />

                <div className="vacation-left">
                    <p
                        className="vacationTitle"
                        name="documentType"
                        value="휴가신청서"
                    >휴가신청서</p>

                    <div className="referenceMember-Div">
                        <div className="referenceMemberTitle-Button">
                            <p>수신 참조자</p>

                        </div>
                        <div className="referenceMember">
                            {reportDetail && reportDetail.referenceLine.map((selectedMember, index) =>(
                                <div key={index} className="referenceLine-pickMemberInfo-div" >
                                    {selectedMember && selectedMember.infoName}
                                </div>
                            ))}
                        </div>

                    </div>


                    <div className="VacationLoginUserProfile">

                        <p className="approval-profile">성함</p>
                        <p className="approval-profile-detail">{reportDetail && reportDetail.infoName}</p>
                        <p className="approval-profile">부서</p>
                        <p className="approval-profile-detail">{reportDetail && reportDetail.deptName}</p>
                        <p className="approval-profile">직급</p>
                        <p className="approval-profile-detail">{reportDetail && reportDetail.jobName}</p>
                        <p className="approval-profile-phone">비상 연락망</p>
                        <p className="approval-profile-detail-page">{reportDetail && reportDetail.vacationEmergencyPhone}</p>

                    </div>
                    <div className="vacation-mainTitle">
                        <p>제목</p>
                        <span className="documentTitle-Reportdetail-page">{reportDetail && reportDetail.documentTitle}</span>
                    </div>
                    <div className="vacationStartDate-endDate">
                        <div className="vacationDateTitle">기간</div>
                        <div className="vacationDateBody-detail-page">{reportDetail && reportDetail.vacationStartDate} ~ {reportDetail && reportDetail.vacationEndDate}</div>
                    </div>
                    <div className="vacationType-div">
                        <div className="vacationType">휴가구분</div>
                        <div className="vacationTypeBody-detail-page">{reportDetail && reportDetail.vacationType}</div>
                    </div>
                    <div className="vacationBody-div">
                        <div className="vacationBody-detail-page-title">세부사항</div>
                        <div className="vacationBody-detail-page-body">{reportDetail && reportDetail.vacationBody}</div>
                    </div>

                    <div className="vacation-guide"> 위와 같이 휴가를 신청하오니 허락하여 주시기 바랍니다.</div>

                    <div className="vacationRegistDate-detail-page">작성 일자 : {reportDetail && formatDate(reportDetail.approvalRegistDate)}</div>


                </div>

                <div className="approvalLineDiv">
                    <p>결재선</p>
                </div>

                {reportDetail && reportDetail.approvalLine && (
                <div className="approvalLine">
                    {reportDetail && reportDetail.approvalLine.map((selectedMember, index) =>(
                        <div key={index} className="approvalLine-selectMember-div">
                            {selectedMember && selectedMember.infoName}<br/>
                            {selectedMember &&  (
                                <>
                                    <span className={`${selectedMember.approvalLineWaitingStatus === '결재요청' ? 'blink' : ''}`}>
                                                 {selectedMember.approvalLineWaitingStatus}
                                    </span>
                                    {selectedMember.approvalLineDate !== null && (
                                        <div className="approvalSignTime">
                                            {formatDate(selectedMember.approvalLineDate)}
                                            <div>{selectedMember.approvalLineResult === 'TURNBACK' ? '반려' :
                                                selectedMember.approvalLineResult === 'APPROVE' ? '승인' : ''}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
                    )}
            </div>
            <div className="approval-completeBtn">
                <Button variant="contained" endIcon={<SendIcon />} onClick={ () => navigate(-1)} >
                    이전 페이지
                </Button>
            </div>
            <div className="approval-signUp">
                {reportDetail &&
                    reportDetail.approvalLine &&
                    reportDetail.approvalLine.map((member, index) => {
                        if (member.memberCode === reportDetail.loginMember &&
                            member.approvalLineWaitingStatus === '결재요청') {
                            return (
                                <SignUpCheckModal key={index} approvalCode={approvalCode}/>
                            );
                        } else {
                            return null;
                        }
                    })}
            </div>


        </>
    );
}

export default VacationDetail;