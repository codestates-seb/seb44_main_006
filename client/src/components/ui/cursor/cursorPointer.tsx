import { useRef, useEffect, useCallback } from 'react';
import { styled } from 'styled-components';

import cursorOn from '../../../assets/cursor_on.svg';
import cursorOff from '../../../assets/cursor_off.svg';
import cssToken from '../../../styles/cssToken';

interface CursorInfo {
  isMouseHover?: boolean;
  isMainMouse?: boolean;
}

const CursorContainer = styled.div<CursorInfo>`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => (props.isMouseHover ? `63px` : `53px`)};
  height: ${(props) => (props.isMouseHover ? `63px` : `53px`)};
  border: 1px solid ${cssToken.COLOR['gray-500']};
  background-color: ${cssToken.COLOR.white};
  border-radius: 50%;
  box-shadow: ${cssToken.SHADOW['shadow-lg']};
  transition: width 0.2s, height 0.2s;
  z-index: 50;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    background-image: ${(props) =>
      props.isMouseHover ? `url(${cursorOff})` : `url(${cursorOn})`};
    background-size: ${(props) => (props.isMouseHover ? `cover` : '15px')};
    background-repeat: no-repeat;
    background-position: center;
    display: block;
    width: 18px;
    height: 18px;
    transform: translate(-50%, -50%);
    transition: background-image 0.2s;
  }

  &.visible {
    display: none;
  }

  @media (max-width: 1280px) {
    display: none;
  }
`;

const CursorPointer = ({ isMouseHover, isMainMouse }: CursorInfo) => {
  const circleCursor = useRef<HTMLDivElement>(null);
  const cursorEnlarged = useRef<boolean>(false);
  const endX = useRef<number>(0);
  const endY = useRef<number>(0);

  const handleMouseEnter = () => {
    cursorEnlarged.current = true;
  };

  const handleMouseLeave = () => {
    cursorEnlarged.current = false;

    if (circleCursor.current) {
      localStorage.removeItem('cursorPosition');
    }
  };

  // 커서 위치 저장
  const updateCursorPosition = (
    x: number,
    y: number,
    positionSave: boolean
  ) => {
    endX.current = x;
    endY.current = y;

    if (circleCursor.current) {
      circleCursor.current.style.top = `${endY.current}px`;
      circleCursor.current.style.left = `${endX.current}px`;
      if (positionSave) {
        localStorage.setItem(
          'cursorPosition',
          JSON.stringify({ x: endX.current, y: endY.current })
        );
      }
    }
  };

  // 스크롤해도 커서 스타일을 유지
  const handleScroll = useCallback(() => {
    const storedPosition = localStorage.getItem('cursorPosition');
    if (storedPosition) {
      const { x, y } = JSON.parse(storedPosition) as { x: number; y: number };
      updateCursorPosition(x + window.scrollX, y + window.scrollY, false);
    }
    requestAnimationFrame(handleScroll);
  }, []);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(handleScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [handleScroll]);

  useEffect(() => {
    // 화면에서 마우스 움직여도 커서 스타일을 유지
    const handleMouseMove = (e: MouseEvent) => {
      cursorEnlarged.current = true;
      const { clientX, clientY } = e;
      updateCursorPosition(clientX, clientY, true);
    };
    // 이벤트 함수 호출
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 및 애니메이션 정리
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <CursorContainer
      className={isMainMouse ? '' : 'visible'}
      isMouseHover={isMouseHover}
      ref={circleCursor}
    />
  );
};

export default CursorPointer;
