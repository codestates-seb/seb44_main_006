import { styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import cssToken from '../../styles/cssToken';
import SearchContainer from '../../components/ui/input/SearchContainer';
import { FlexDiv } from '../../styles/styles';
import FilterSection from '../../components/community/FilterSection';
import FilterTab from '../../components/community/FilterTab';
import useHandleTab from '../../hooks/useHandleTab';
import CircleButton from '../../components/ui/button/CircleButton';
import Pen from '../../assets/Pen';
import useMovePage from '../../hooks/useMovePage';
import getLoginStatus from '../../utils/getLoginStatus';
import useInfiniteScrollQuery from '../../hooks/useInfiniteQuery';
import { LIMIT } from '../../utils/constant/constant';
import { communityBasicActions } from '../../store/communitybasic-slice';

const Wrapper = styled(FlexDiv)`
  margin-top: 1.875rem;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 6.5rem;
  row-gap: 6rem;

  > form {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    margin-top: 0px;
    padding-top: ${cssToken.SPACING['gap-20']};
    row-gap: 5rem;
    > form > div {
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
`;

const Div = styled.div`
  margin-bottom: 0.25rem;
`;

const FixedDiv = styled.div`
  position: fixed;
  right: ${cssToken.SPACING['gap-40']};
  bottom: ${cssToken.SPACING['gap-40']};
`;

const CommunityPage = () => {
  const navigate = useNavigate();
  const goToSelect = useMovePage('/community/select');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isLogin = getLoginStatus();
  const { selectTab, setTab } = useHandleTab();
  const [tagName, setTagName] = useState<string>('');
  const dispatch = useDispatch();

  const { data, fetchNextPage, hasNextPage, error, isFetchingNextPage } =
    useInfiniteScrollQuery({
      limit: LIMIT,
      tagName: tagName || '',
      sort: selectTab,
    });

  useEffect(() => {
    if (data) {
      dispatch(communityBasicActions.setData(data?.pages));
    }
  }, [data, dispatch]);

  const SearchPost = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (searchInputRef.current) {
      const keyword = searchInputRef.current?.value;
      setTagName(keyword);
    }
  };

  if (error) {
    const { response } = error as AxiosError;
    if (response) navigate(`/error/${response.status}`);
  }

  return (
    <>
      <Wrapper>
        <form onSubmit={SearchPost}>
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
        </form>
        <FilterSection
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetching={isFetchingNextPage}
        >
          <FilterTab
            content="최신순"
            selectTab={selectTab}
            tab="First"
            onClick={setTab}
          />
          <FilterTab
            content="좋아요순"
            selectTab={selectTab}
            tab="Second"
            onClick={setTab}
          />
        </FilterSection>
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
