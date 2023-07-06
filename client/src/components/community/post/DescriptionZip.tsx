import cssToken from '../../../styles/cssToken';
import Title from '../../ui/text/Title';
import Text from '../../ui/text/Text';
import { HeadDiv } from '../../../styles/styles';
import SubTitle from '../../ui/text/SubTitle';

export const MyCourseBoast = () => {
  return (
    <HeadDiv>
      <Title
        styles={{
          size: cssToken.TEXT_SIZE['text-40'],
        }}
      >
        나의 코스 자랑하기
      </Title>
      <Text
        styles={{
          size: cssToken.TEXT_SIZE['text-18'],
          color: cssToken.COLOR['gray-900'],
          weight: cssToken.FONT_WEIGHT.medium,
        }}
      >
        일정 등록 때 설정한 제목이 자동으로 들어갑니다.
      </Text>
    </HeadDiv>
  );
};

export const ExampleDescription = () => {
  return (
    <HeadDiv>
      <SubTitle
        styles={{
          size: cssToken.TEXT_SIZE['text-32'],
        }}
      >
        경로 예시 사진
      </SubTitle>
      <Text
        styles={{
          color: cssToken.COLOR['gray-900'],
          weight: cssToken.FONT_WEIGHT.medium,
        }}
      >
        게시물 업로드 할 경우 보여지는 예시 이미지 입니다.
      </Text>
    </HeadDiv>
  );
};

export const WritePost = () => {
  return (
    <HeadDiv>
      <SubTitle
        styles={{
          size: cssToken.TEXT_SIZE['text-32'],
        }}
      >
        게시물 작성
      </SubTitle>
      <Text
        styles={{
          color: cssToken.COLOR['gray-900'],
          weight: cssToken.FONT_WEIGHT.medium,
        }}
      >
        코스에 대해 자랑해 주세요!
      </Text>
    </HeadDiv>
  );
};

export const ChooseTag = () => {
  return (
    <HeadDiv>
      <SubTitle
        styles={{
          size: cssToken.TEXT_SIZE['text-32'],
        }}
      >
        태그 선택
      </SubTitle>
      <Text
        styles={{
          color: cssToken.COLOR['gray-900'],
          weight: cssToken.FONT_WEIGHT.medium,
        }}
      >
        게시글에 대한 태그를 추가해주세요. (최대 5개)
      </Text>
    </HeadDiv>
  );
};
