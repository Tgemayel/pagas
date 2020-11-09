import React from "react";

function SvgCmpFileType() {
  return (
    <svg width={32} height={33} viewBox="0 0 32 33" fill="none">
      <rect y={0.445} width={32} height={32.384} rx={6} fill="#E2FFEE" />
      <mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={32}
        height={33}
      >
        <rect y={0.445} width={32} height={32.384} rx={6} fill="#fff" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.622 12.682H18.07l1.636-1.648a.729.729 0 00.185-.698.718.718 0 00-.505-.51.708.708 0 00-.69.186l-2.34 2.34-.831-1.44a.712.712 0 00-.618-.362.712.712 0 00-.618.36.73.73 0 00-.002.722l.647 1.05H12.09c-1.178 0-2.133.967-2.133 2.16v5.756c0 1.193.955 2.16 2.133 2.16v.719c0 .397.318.72.711.72a.715.715 0 00.711-.72v-.72H19.2v.72c0 .397.318.72.711.72a.715.715 0 00.711-.72v-.72c1.178 0 2.134-.966 2.134-2.159v-5.757c0-1.192-.956-2.159-2.134-2.159zm.711 7.916c0 .398-.318.72-.71.72h-8.534a.715.715 0 01-.711-.72v-5.757c0-.397.318-.72.71-.72h8.534c.393 0 .711.323.711.72v5.757z"
          fill="#00875A"
        />
      </g>
    </svg>
  );
}

export default SvgCmpFileType;
