import { useRef, useEffect } from 'react';
import { styled } from 'styled-components';

import cssToken from '../../../styles/cssToken';
import cursorOn from '../../../assets/cursor_on.svg';
import cursorOff from '../../../assets/cursor_off.svg';

interface CursorInfo {
  isMouseHover?: string | boolean;
}

const CursorContainer = styled.div<CursorInfo>`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 83px;
  height: 83px;
  border: 1px solid ${cssToken.COLOR['gray-500']};
  background-color: ${cssToken.COLOR.white};
  border-radius: 50%;
  opacity: 1;
  transition: opacity 0.2s;
  box-shadow: ${cssToken.SHADOW['shadow-lg']};
  &::after {
    content: '';
    position: absolute;
    background-image: ${(props) =>
      props.isMouseHover ? `url(${cursorOff})` : `url(${cursorOn})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: block;
    width: 25px;
    height: 25px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const CursorPointer = ({ isMouseHover }: CursorInfo) => {
  const dot = useRef<HTMLDivElement>(null);
  const coursorEnlarged = useRef<boolean>(false);
  const endX = useRef<number>(window.innerWidth / 2);
  const endY = useRef<number>(window.innerHeight / 2);

  const handleMouseOver = () => {
    coursorEnlarged.current = true;
  };

  const handleMouseOut = () => {
    coursorEnlarged.current = false;
  };

  const handleMouseEnter = () => {
    coursorEnlarged.current = true;
  };

  const handleMouseLeave = () => {
    coursorEnlarged.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    coursorEnlarged.current = true;

    const { clientX, clientY } = e;

    endX.current = clientX;
    endY.current = clientY;

    if (dot.current) {
      dot.current.style.top = `${endY.current}px`;
      dot.current.style.left = `${endX.current}px`;
    }
  };

  useEffect(() => {
    // 이벤트 함수 호출
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);

    // 컴포넌트 언마운트 시 이벤트 리스너 및 애니메이션 정리
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <CursorContainer isMouseHover={isMouseHover} ref={dot} />;
};

export default CursorPointer;
