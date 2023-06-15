import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import {
  categoryState,
  filterState,
  selectedCategoryState,
  selectedHeaderState,
} from '@src/states';
import { ReactComponent as Logo } from '@src/assets/logo.svg';
import { ReactComponent as BackgroundIcon } from '@src/assets/home-background-icon.svg';
import { PATH_URL } from '@src/constants/constants';
import { CATEGORY_KEYWORD } from '@src/constants/portfolioFilteringData';
import { getAllList, getLastId } from '@src/apis/portfolio';
import { PortfolioDataType } from '@src/types/portfolioType';
import * as S from '@src/style/common/commonStyles';
import theme from '@src/style/theme';
import PortfolioItem from '@src/components/common/PortfolioItem';

const Home = () => {
  const [latestPortfolioList, setLatestPortfolioList] = useState<PortfolioDataType[]>([]);
  const setCategory = useSetRecoilState<string>(categoryState);
  const setFilter = useSetRecoilState<string>(filterState);
  const setSelectedCategory = useSetRecoilState<string>(selectedCategoryState);
  const setSelectedHeader = useSetRecoilState<boolean>(selectedHeaderState);

  const navigate = useNavigate();

  const buttonList = [
    { display: '개발자', value: CATEGORY_KEYWORD.DEVELOP, color: theme.color.neonGreen },
    { display: '디자이너', value: CATEGORY_KEYWORD.DESIGN, color: theme.color.skyBlue },
    { display: '포토그래퍼', value: CATEGORY_KEYWORD.PHOTOGRAPHER, color: theme.color.blueGreen },
  ];

  const onClickButton = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setSelectedCategory(selectedCategory);
    setFilter('All');
    setSelectedHeader(false);

    navigate(PATH_URL.MAIN);
  };

  const { data, isLoading } = useQuery('latestPortfolioList', async () => {
    let lastId = await getLastId({ category: 'All' });
    let length10List: PortfolioDataType[] = [];

    while (length10List.length < 10) {
      const latestPortfolioData = await getAllList({ lastId, category: 'All' });
      length10List = [...length10List, ...latestPortfolioData];

      if (latestPortfolioData.length < 10) {
        lastId -= 10;
      }
    }
    return length10List.slice(0, 9);
  });

  useEffect(() => {
    data && setLatestPortfolioList(data);
  }, [data]);

  return (
    <StHome>
      <StIntroContainer>
        <StIntroTextContainer>
          <StIntroText>개발자, 디자이너, 포토그래퍼가 이용하는</StIntroText>
          <StIntroTitle>포트폴리오 공유 서비스</StIntroTitle>
        </StIntroTextContainer>
        <StLogo />
        <StButtonContainer>
          {buttonList.map((button, index) => (
            <StButton key={index} color={button.color} onClick={() => onClickButton(button.value)}>
              {button.display} 포트폴리오 둘러보기
            </StButton>
          ))}
        </StButtonContainer>
        <StShadow />
        <StBackgroundIcon />
      </StIntroContainer>
      <StListContainer>
        <StTextLabel>지금 뜨는 포트폴리오</StTextLabel>
        <S.PortfolioListContainer>
          {latestPortfolioList.map((item: PortfolioDataType) => (
            <PortfolioItem key={item.id} item={item} />
          ))}
        </S.PortfolioListContainer>
      </StListContainer>
    </StHome>
  );
};

const StHome = styled.div`
  width: 100%;
  height: 100%;
`;

const StIntroContainer = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const StIntroTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const StIntroText = styled.p`
  font-size: 25px;
  margin-bottom: 15px;
`;

const StIntroTitle = styled.h1`
  font-weight: 900;
  font-size: 40px;
`;

const StLogo = styled(Logo)`
  width: 223px;
  height: 68px;
  z-index: 1;
`;

const StButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1;
`;

const StButton = styled.button<{ color: string }>`
  width: 280px;
  background-color: ${({ color }) => color};
  font-weight: 800;
  font-size: 18px;
  border-radius: 10px;
  padding: 12px 25px;
`;

const StShadow = styled.div`
  position: absolute;
  width: calc(100% - 270px);
  top: 370px;
  background: linear-gradient(180deg, #ffffff -5.06%, rgba(255, 255, 255, 0) 150%);
  transform: rotate(-180deg);
  padding: 250px;
  z-index: 0.1;

  @media ${theme.size.mobileRow} {
    width: 100%;
  }
`;

const StBackgroundIcon = styled(BackgroundIcon)`
  position: absolute;
  top: 367px;
  margin-left: 570px;

  z-index: -1;
`;

const StTextLabel = styled.h2`
  font-weight: 900;
  margin-bottom: 30px;
`;

const StListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 41px;
  margin-top: 50px;
`;

export default Home;
