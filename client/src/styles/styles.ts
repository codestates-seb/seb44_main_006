import { css, styled } from 'styled-components';

import cssToken from './cssToken';

import { TextStyleT } from '../types/type';

export const TextStyle = styled.h3<TextStyleT>`
  font-size: ${(props) => (props.size ? props.size : '1rem')};
  color: ${(props) => (props.color ? props.color : 'black')};
  font-weight: ${(props) =>
    props.weight ? props.weight : cssToken.FONT_WEIGHT.bold};
`;

export const FlexDiv = styled.div`
  display: flex;
`;

export const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${cssToken.WIDTH['grid-min']}, auto)
  );
  justify-content: center;
  gap: ${cssToken.SPACING['gap-20']};

  @media screen and (max-width: 768px) {
    gap: ${cssToken.SPACING['gap-20']};
  }
`;

export const HeadDiv = styled(FlexDiv)`
  flex-direction: column;
  row-gap: 3px;

  @media screen and (max-width: 768px) {
    h1 {
      font-size: 1.25rem;
    }

    p {
      font-size: 0.8125rem;
    }
  }
`;

export const GapDiv = styled(FlexDiv)`
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-24']};
`;

export const OutsideWrap = styled(FlexDiv)`
  margin-top: 77px;
  padding-top: ${cssToken.SPACING['px-50']};
  padding-left: ${cssToken.SPACING['py-100']};
  padding-right: ${cssToken.SPACING['py-100']};
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-50']};
`;

export const TagDiv = styled(FlexDiv)`
  flex-wrap: wrap;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  @media screen and (max-width: 768px) {
    button {
      font-size: 0.625rem;
    }
  }
`;

export const BtnDiv = styled(FlexDiv)`
  width: 100%;
  justify-content: center;
  column-gap: ${cssToken.SPACING['gap-12']};
  margin-bottom: ${cssToken.SPACING['gap-50']};

  @media screen and (max-width: 500px) {
    margin-bottom: ${cssToken.SPACING['gap-20']};
    align-self: flex-end;
  }
`;

export const ModalChildrenDiv = styled(FlexDiv)`
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  padding-top: ${cssToken.SPACING['gap-50']};
  align-items: center;
`;

export const ShareBtn = styled.button`
  width: 1.3rem;
  height: 1.3rem;
  padding: 0;
  > svg {
    width: 100%;
    height: 100%;
    > path {
      fill: #000;
    }
  }
  cursor: pointer;
`;

const SkeletonAnimation = css`
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  -webkit-animation: skeleton-gradient 1s infinite ease-in-out;
  animation: skeleton-gradient 1s infinite ease-in-out;
`;

export const SkeletonDiv = styled.div`
  background-color: ${cssToken.COLOR['gray-500']};
  border-radius: ${cssToken.BORDER['rounded-input']};
  ${SkeletonAnimation}
`;
