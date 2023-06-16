import React from 'react';
import { styled } from 'styled-components';
import { ProjectDetailData } from './ProjectDetail';
import { ImageType } from './ProjectDetail';
import { ReactComponent as Edit } from 'src/assets/project-edit.svg';

interface ProjectDetailProps {
  projectData: ProjectDetailData | undefined;
  handleEdit: () => void;
  accessToken: string;
  userId: string | undefined;
}

export const GetProject: React.FC<ProjectDetailProps> = ({
  projectData,
  handleEdit,
  accessToken,
  userId,
}) => {
  return (
    <>
      <StGetImageContainer>
        <StGetImageBox>
          {projectData?.projectImageList.map((image: ImageType, index: number) => (
            <StImage key={index} src={image.imageUrl} alt="Preview" />
          ))}
        </StGetImageBox>
        <StGetHeader>
          {accessToken && userId === projectData?.userId && <Edit onClick={handleEdit}></Edit>}
          <h1>{projectData?.title}</h1>
          <p>{projectData?.term}</p>
        </StGetHeader>
      </StGetImageContainer>
      <div>
        <StGetTextWrap>
          <div>프로젝트 인원</div>
          <p>{projectData?.people}</p>
        </StGetTextWrap>
        <StGetTextWrap>
          <div>해당 포지션</div>
          <p>{projectData?.position}</p>
        </StGetTextWrap>
        <StTextWrap>
          <StTitle>프로젝트 설명</StTitle>
          <StText>{projectData?.description}</StText>
        </StTextWrap>
      </div>
    </>
  );
};

const StTextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
  width: 100%;
  margin-bottom: 1px;
`;

const StImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const StText = styled.div`
  width: 100%;
  padding: 5px 0px;
  /* margin-bottom: 20px; */
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  width: 595px;
  height: 230px;
  left: 50px;
  top: 530px;
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 150%;

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
    margin-top: 5px;
  }
`;

const StGetImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StGetImageBox = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid #000000;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;

const StGetHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  h1 {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 40px;
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }

  p {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }
`;

const StGetTextWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;

  div {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    margin-right: 20px;
  }
  p {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
  }
`;