/* eslint-disable @typescript-eslint/no-unused-vars */
const mapInitialState = {
  setCenter(_latlng: kakao.maps.LatLng | kakao.maps.Coords): void {
    throw new Error('Function not implemented.');
  },
  getCenter(): kakao.maps.LatLng {
    throw new Error('Function not implemented.');
  },
  setLevel(
    _level: number,
    _options?:
      | {
          animate?: boolean | { duration: number } | undefined;
          anchor?: kakao.maps.LatLng | undefined;
        }
      | undefined
  ): void {
    throw new Error('Function not implemented.');
  },
  getLevel(): number {
    throw new Error('Function not implemented.');
  },
  setMapTypeId(_mapTypeId: kakao.maps.MapTypeId): void {
    throw new Error('Function not implemented.');
  },
  getMapTypeId(): kakao.maps.MapTypeId {
    throw new Error('Function not implemented.');
  },
  setBounds(
    _bounds: kakao.maps.LatLngBounds,
    _paddingTop?: number | undefined,
    _paddingRight?: number | undefined,
    _paddingBottom?: number | undefined,
    _paddingLeft?: number | undefined
  ): void {
    throw new Error('Function not implemented.');
  },
  getBounds(): kakao.maps.LatLngBounds {
    throw new Error('Function not implemented.');
  },
  setMinLevel(_minLevel: number): void {
    throw new Error('Function not implemented.');
  },
  setMaxLevel(_maxLevel: number): void {
    throw new Error('Function not implemented.');
  },
  panBy(_dx: number, _dy: number): void {
    throw new Error('Function not implemented.');
  },
  panTo(
    _latlng_or_bounds:
      | kakao.maps.LatLngBounds
      | kakao.maps.LatLng
      | kakao.maps.Coords,
    _padding?: number | undefined
  ): void {
    throw new Error('Function not implemented.');
  },
  addControl(
    _control:
      | kakao.maps.MapTypeControl
      | kakao.maps.ZoomControl
      | kakao.maps.drawing.ToolboxElement,
    _position: kakao.maps.ControlPosition
  ): void {
    throw new Error('Function not implemented.');
  },
  removeControl(
    _control:
      | kakao.maps.MapTypeControl
      | kakao.maps.ZoomControl
      | kakao.maps.drawing.ToolboxElement
  ): void {
    throw new Error('Function not implemented.');
  },
  setDraggable(_draggable: boolean): void {
    throw new Error('Function not implemented.');
  },
  getDraggable(): boolean {
    throw new Error('Function not implemented.');
  },
  setZoomable(_zoomable: boolean): void {
    throw new Error('Function not implemented.');
  },
  getZoomable(): boolean {
    throw new Error('Function not implemented.');
  },
  setProjectionId(_projectionId: kakao.maps.ProjectionId): void {
    throw new Error('Function not implemented.');
  },
  getProjectionId(): kakao.maps.ProjectionId {
    throw new Error('Function not implemented.');
  },
  relayout(): void {
    throw new Error('Function not implemented.');
  },
  addOverlayMapTypeId(_mapTypeId: kakao.maps.MapTypeId): void {
    throw new Error('Function not implemented.');
  },
  removeOverlayMapTypeId(_mapTypeId: kakao.maps.MapTypeId): void {
    throw new Error('Function not implemented.');
  },
  setKeyboardShortcuts(_active: boolean): void {
    throw new Error('Function not implemented.');
  },
  getKeyboardShortcuts(): boolean {
    throw new Error('Function not implemented.');
  },
  setCopyrightPosition(
    _copyrightPosition: kakao.maps.CopyrightPosition,
    _reversed?: boolean | undefined
  ): void {
    throw new Error('Function not implemented.');
  },
  getProjection(): kakao.maps.MapProjection {
    throw new Error('Function not implemented.');
  },
  setCursor(_style: string): void {
    throw new Error('Function not implemented.');
  },
  getNode(): HTMLElement {
    throw new Error('Function not implemented.');
  },
};

export default mapInitialState;
