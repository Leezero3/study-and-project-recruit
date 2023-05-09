import React from "react";
import { useQuery } from 'react-query';
import { Layout } from "common/feature";
import styled from "styled-components";
import { RecruitmentTitle, ApplySection, RecruitmentInfo, Comments } from "features/DetailPage";
import { getDetailPage } from "api/todo";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { GoBackButton } from "common/ui/index";

const DetailPost = () => {
    const params = useParams();
    
    const id = Number(params.id);
    console.log(id);
    // const location = useLocation();
    // console.log(location);
    // const id = location.state.id;
    const {isLoading, isError, data} = useQuery("todos", ()=>getDetailPage(id));
    console.log(data);

    const navigate = useNavigate();
    
    if (isLoading) {
        return <h1>로딩중입니다...</h1>;
    }
    if (isError) {
        return <h1>오류가 발생하였습니다...</h1>;
    }
    return (
        <Layout>
            <Container>
                <HeadWrapper>
                    <StyledGoBackButton onClick={() =>navigate.goBack()}/>
                </HeadWrapper>
                <RecruitmentTitle title={data.title} nickname={data.nickname} />
                <StyledHr />
                <ApplySection date={data.date} memberNum={data.memberNum} totalMember={data.totalMember} />
                <StyledHr />
                <RecruitmentInfo contents={data.contents} />
                <StyledHr />
                <Comments />
            </Container>
        </Layout>
    );
}

const Container = styled.div`
    width: 100%;
    min-height: 600px;
    /* border: 1px solid black; */
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledHr = styled.hr`
    border: none;
    border-top: 1px solid black;
    margin: 10px 0;
    width: 100%;
    /* height: 1px; */
`;

const HeadWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const StyledGoBackButton = styled(GoBackButton)`
    padding: 100px;
`;

export default DetailPost;
