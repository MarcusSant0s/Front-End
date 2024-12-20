
interface PersonSvgProps extends React.SVGProps<SVGSVGElement> {}

const PersonSvg:React.FC<PersonSvgProps> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg" 
      fill="currentColor"
      viewBox="0 0 485 485"
      className="bi bi-person-fill text-4xl"
      {...props}
    >
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
    </svg>
  )
  export default  PersonSvg
