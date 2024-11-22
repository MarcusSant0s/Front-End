interface StockSvgProps extends React.SVGProps<SVGSVGElement> {}

const StockSvg:React.FC<StockSvgProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 485 485"
    
    {...props}
  >
    <path d="M435 315V45H290v90h-50v110h-20V140H55v105H0v195h485V315h-50zM70 155h135v20H70v-20zm0 35h135v55H70v-55zm80 70v70h-45v-70h45zm90 165H15V260h75v85h75v-85h75v165zm65-365h115v75H305V60zm50 90v75h-35v-75h35zm-35 275h-65V150h50v90h65v-90h50v165H320v110zm150 0H335v-95h135v95z" />
    <path d="M167.5 210h20v15h-20zM137.5 210h20v15h-20zM407.5 355h40v15h-40zM377.5 385h70v15h-70zM377.5 100h20v15h-20zM347.5 100h20v15h-20z" />
  </svg>
)
export default StockSvg
