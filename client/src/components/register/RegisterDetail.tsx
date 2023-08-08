import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import cssToken from '../../styles/cssToken';
import { showDetailActions } from '../../store/showDetail-slice';
import { PlacesSearchResultItem } from '../../types/type';
import { scheduleListActions } from '../../store/scheduleList-slice';
import { RootState } from '../../store';
import scheduleDetailState from '../../utils/constant/scheduleDetailState';
import showToast from '../../utils/showToast';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import GrayButton from '../ui/button/GrayButton';

const RegisterDetailContainer = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  width: 58rem;
  height: ${cssToken.HEIGHT['h-screen']};
  background: ${cssToken.COLOR.white};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${cssToken.SPACING['gap-12']};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  position: fixed;
  left: 0;
  bottom: 0;
`;

const RegisterDetail = ({
  detailItem,
}: {
  detailItem: PlacesSearchResultItem;
}) => {
  const scheduleList = useSelector(
    (state: RootState) => state.scheduleList.list
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(showDetailActions.setIsShow(false));
    dispatch(showDetailActions.setItem(scheduleDetailState));
  };

  const addSchedule = () => {
    const placeId = uuidv4();
    if (scheduleList.length < 10) {
      dispatch(
        scheduleListActions.addList({
          placeName: detailItem.place_name,
          placeUrl: detailItem.place_url,
          roadAddressName: detailItem.road_address_name,
          id: placeId,
          phone: detailItem.phone,
          categoryGroupCode: detailItem.category_group_code,
          categoryGroupName: detailItem.category_group_name,
          x: detailItem.x,
          y: detailItem.y,
        })
      );
    } else {
      showToast('error', '일정은 10개까지 등록 가능합니다!')();
    }
    dispatch(showDetailActions.setIsShow(false));
  };

  return (
    <RegisterDetailContainer>
      <ButtonWrapper>
        <GrayButton
          width="7rem"
          height="3rem"
          brradius={cssToken.BORDER['rounded-md']}
          onClick={handleClose}
        >
          닫기
        </GrayButton>
        <SkyBlueButton
          width="7rem"
          height="3rem"
          brradius={cssToken.BORDER['rounded-md']}
          onClick={addSchedule}
        >
          추가 하기
        </SkyBlueButton>
      </ButtonWrapper>
    </RegisterDetailContainer>
  );
};

export default RegisterDetail;
