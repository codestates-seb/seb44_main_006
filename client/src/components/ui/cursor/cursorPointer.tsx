import { useRef, useEffect } from 'react';
import { styled } from 'styled-components';

import cssToken from '../../../styles/cssToken';
import cursorOn from '../../../assets/cursor_on.svg';
import cursorOff from '../../../assets/cursor_off.svg';

interface CursorInfo {
  isMouseHover?: boolean;
}

const CursorContainer = styled.div<CursorInfo>`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => (props.isMouseHover ? `83px` : `73px`)};
  height: ${(props) => (props.isMouseHover ? `83px` : `73px`)};
  border: 1px solid ${cssToken.COLOR['gray-500']};
  background-color: ${cssToken.COLOR.white};
  border-radius: 50%;
  box-shadow: ${cssToken.SHADOW['shadow-lg']};
  transition: width 0.2s, height 0.2s;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    background-image: ${(props) =>
      props.isMouseHover ? `url(${cursorOff})` : `url(${cursorOn})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: block;
    width: 25px;
    height: 25px;
    transform: translate(-50%, -50%);
    transition: background-image 0.2s;
  }
`;

const CursorPointer = ({ isMouseHover }: CursorInfo) => {
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

  const handleMouseMove = (e: MouseEvent) => {
    cursorEnlarged.current = true;

    const { clientX, clientY } = e;

    endX.current = clientX;
    endY.current = clientY;

    if (circleCursor.current) {
      circleCursor.current.style.top = `${endY.current}px`;
      circleCursor.current.style.left = `${endX.current}px`;
      localStorage.setItem(
        'cursorPosition',
        JSON.stringify({ x: endX.current, y: endY.current })
      );
    }
  };

  useEffect(() => {
    const storedPosition = localStorage.getItem('cursorPosition');

    if (storedPosition) {
      const { x, y } = JSON.parse(storedPosition);

      endX.current = x;
      endY.current = y;

      if (circleCursor.current) {
        circleCursor.current.style.top = `${endY.current}px`;
        circleCursor.current.style.left = `${endX.current}px`;
      }
    }
  }, []);

  useEffect(() => {
    // 이벤트 함수 호출
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);

    // 컴포넌트 언마운트 시 이벤트 리스너 및 애니메이션 정리
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <CursorContainer isMouseHover={isMouseHover} ref={circleCursor} />;
};

export default CursorPointer;
