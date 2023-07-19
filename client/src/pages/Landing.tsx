import { styled } from 'styled-components';

import { FlexDiv } from '../styles/styles';
import Title from '../components/ui/text/Title';
import SubTitle from '../components/ui/text/SubTitle';
import cssToken from '../styles/cssToken';
import {
  addCourseGIF,
  editCourseGIF,
  makeCourseGIF,
  saveCourseGIF,
} from '../assets/landing';

const LadingWrapper = styled(FlexDiv)`
  cursor: none;
  flex-direction: column;
  align-items: center;
  padding-left: ${cssToken.SPACING['py-100']};
  padding-right: ${cssToken.SPACING['py-100']};

  @media screen and (max-width: 1000px) {
    cursor: default;
    padding-left: ${cssToken.SPACING['gap-10']};
    padding-right: ${cssToken.SPACING['gap-10']};
  }
`;

const LandingContainer = styled(FlexDiv)`
  width: 100%;
  height: 70vh;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const TextContainer = styled(FlexDiv)`
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-20']};
  padding-left: 3.375rem;
  > h1,
  h3 {
    white-space: pre-line;
  }
  > h3 {
    line-height: 1.5rem;
  }
  > p {
    position: absolute;
    top: -5rem;
  }

  @media screen and (max-width: 1000px) {
    padding-left: 0rem;
    > h1 {
      text-align: center;
      font-size: ${cssToken.TEXT_SIZE['text-24']};
      line-height: 1.7rem;
    }
    > h3 {
      text-align: center;
      font-size: ${cssToken.TEXT_SIZE['text-12']};
      line-height: 1rem;
      margin-bottom: ${cssToken.SPACING['gap-10']};
    }
    > p {
      top: -3rem;
      text-align: center;
    }
  }
`;

const LandingImg = styled.img`
  width: 60%;
  min-width: 40%;
  @media screen and (max-width: 760px) {
    width: 80%;
  }
`;

const Landing = () => {
  const datas = [
    {
      title: '나만의 일정을 \n 만들어보세요',
      description:
        '로그인 후 일정등록(Schedule)페이지에서 \n 나만의 일정을 만들 수 있습니다. \n 잠시 후 현재 위치를 가져옵니다.',
      img: makeCourseGIF,
    },
    {
      title: '장소를 등록해요',
      description:
        '직접 검색을 통해 "맛집", "카페" 등 키워드 및 \n 가고 싶은 장소를 입력할 수 있습니다. \n 카테고리 검색 시 반경과 카테고리 필터를 통해 \n 장소를 추천해드려요 \n 반경은 마지막으로 추가한 장소를 \n 기준으로 적용됩니다.',
      img: addCourseGIF,
    },
    {
      title: '일정을 편집해보세요',
      description:
        '드래그를 통해 등록한 일정 순서를 바꾸고 \n 삭제 버튼을 눌러 장소를 삭제할 수 있습니다.',
      img: editCourseGIF,
    },
    {
      title: '일정을 저장해보세요',
      description:
        '일정에 어울리는 썸네일과 제목 \n 그리고 설명을 작성해주세요.',
      img: saveCourseGIF,
    },
    {
      title: '내가 만든 일정을 \n 확인 및 수정해요',
      description:
        '일정을 클릭하여 나의 일정을 확인해 보세요. \n 일정을 수정하거나 삭제할 수 있습니다.',
      img: 'logo.webp',
    },
    {
      title: '다른 사람에게 \n 내 일정을 자랑해요',
      description:
        '자랑하기 버튼을 눌러 \n 커뮤니티에 내 일정을 작성할 수 있습니다. \n 커뮤니티 페이지에서 다양한 일정을 확인할 수 있습니다. \n 로그인 후 좋아요, 즐겨찾기가 가능해요. \n 마음에 드는 일정에 댓글을 작성해보세요.',
      img: 'logo.webp',
    },
    {
      title: '하루를 함께 보낼 \n 친구에게 공유해요',
      description:
        '카카오톡과 링크 복사를 통해 \n 친구에게 마음에 드는 일정을 공유할 수 있습니다.',
      img: 'logo.webp',
    },
    {
      title: 'PC, Mobile에서 \n 하루메이트와 함께',
      description: '하루 일정을 만들고 \n 공유하는 나의 하루 메이트',
      img: 'logo.webp',
    },
  ];
  return (
    <LadingWrapper>
      {datas.map((data, idx) => (
        <LandingContainer>
          <TextContainer>
            <Title styles={{ size: cssToken.TEXT_SIZE['text-40'] }}>
              {data.title}
            </Title>
            <SubTitle
              styles={{
                size: cssToken.TEXT_SIZE['text-16'],
                weight: cssToken.FONT_WEIGHT.medium,
                color: cssToken.COLOR['gray-900'],
              }}
            >
              {data.description}
            </SubTitle>
          </TextContainer>
          <LandingImg loading="lazy" src={data.img} alt={`${idx}번째 이미지`} />
        </LandingContainer>
      ))}
    </LadingWrapper>
  );
};

export default Landing;
