import { styled } from 'styled-components';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import cssToken from '../../styles/cssToken';
import SearchContainer from '../../components/ui/input/SearchContainer';
import { FlexDiv } from '../../styles/styles';
import FilterSection from '../../components/community/FilterSection';
import useMovePage from '../../hooks/useMovePage';
import getLoginStatus from '../../utils/getLoginStatus';
import { communityBasicActions } from '../../store/communitybasic-slice';
import scrollToTop from '../../utils/scrollToTop';
import head from '../../assets/head.webp';
import Text from '../../components/ui/text/Text';
import CircleButton from '../../components/ui/button/CircleButton';
import Pen from '../../assets/icons/Pen';

const Wrapper = styled(FlexDiv)`
  width: 100%;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin-bottom: 4.5rem;
    margin-top: 0px;
  }
`;

const HeadDiv = styled(FlexDiv)`
  width: 100%;
  height: 40vh;
  justify-content: center;
  align-items: center;
  background-image: url(${head});
  background-size: cover;
  background-repeat: no-repeat;

  > form {
    display: flex;
    justify-content: center;
    width: 100%;

    > div > div {
      box-shadow: 0rem 0.25rem 1.875rem rgb(0, 0, 0, 0.25);
    }
  }

  @media screen and (max-width: 768px) {
    height: 22vh;
    > form > div {
      width: 100%;
      > div {
        width: 80%;
        > input {
          padding-right: 3rem;
          font-size: 0.8125rem;
        }
        > button {
          right: 0.8rem;
          > svg {
            width: 1.125rem;
            height: 1.125rem;
          }
        }
      }
    }
  }
`;

const Div = styled.div`
  margin-bottom: 0.25rem;
`;

const FixedDiv = styled.div`
  position: fixed;
  right: ${cssToken.SPACING['gap-40']};
  bottom: ${cssToken.SPACING['gap-40']};
  z-index: 1;

  @media screen and (max-width: 768px) {
    right: 1rem;
    bottom: 5.5rem;
  }
`;

const SearchDiv = styled(FlexDiv)`
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-10']};
  align-items: center;
`;

const CommunityPage = () => {
  const goToSelect = useMovePage('/community/select');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isLogin = getLoginStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    scrollToTop();
    return () => {
      dispatch(communityBasicActions.reset());
    };
  }, [dispatch]);

  const SearchPost = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (searchInputRef.current) {
      const keyword = searchInputRef.current?.value;
      dispatch(communityBasicActions.setSearch(keyword));
    }
  };

  return (
    <>
      <Wrapper>
        <HeadDiv>
          <form onSubmit={SearchPost}>
            <SearchDiv>
              <Text
                styles={{
                  color: cssToken.COLOR.white,
                  size: cssToken.TEXT_SIZE['text-18'],
                  weight: cssToken.FONT_WEIGHT.medium,
                }}
              >
                메이트가 공유한 일정을 확인해보세요.
              </Text>
              <SearchContainer
                searchClick={SearchPost}
                ref={searchInputRef}
                iconWidth={24}
                iconHeight={24}
                styles={{
                  width: '500px',
                  height: '50px',
                  fontsize: cssToken.TEXT_SIZE['text-18'],
                }}
              />
            </SearchDiv>
          </form>
        </HeadDiv>
        <FilterSection />
      </Wrapper>
      {isLogin && (
        <FixedDiv onClick={goToSelect}>
          <CircleButton width="117px" height="117px">
            <Div>
              <Pen style={{ iconWidth: 28, iconHeight: 28, color: 'black' }} />
            </Div>
            <div>자랑하기</div>
          </CircleButton>
        </FixedDiv>
      )}
    </>
  );
};

export default CommunityPage;
